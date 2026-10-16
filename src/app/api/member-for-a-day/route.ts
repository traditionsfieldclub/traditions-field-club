import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const OPENING_DATE = "2026-10-20";

// --- Rate Limiting (in-memory, per-IP) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // max submissions
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}


// --- Field Limits ---
const MAX_LENGTHS: Record<string, number> = {
  name: 200,
  email: 254,
  phone: 30,
  preferredDate: 10,
  alternateDate: 10,
  partySize: 2,
  experience: 20,
  heardFrom: 200,
  notes: 2000,
};

// --- Email Validation ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Allowed Origins ---
const ALLOWED_ORIGINS = [
  process.env.ALLOWED_ORIGIN,
  "https://traditionsfieldclub.netlify.app",
  "http://localhost:3003",
].filter(Boolean);

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ success: true });
    }

    // 2. Origin check
    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");
    const requestOrigin = origin || (referer ? new URL(referer).origin : null);

    if (requestOrigin && !ALLOWED_ORIGINS.includes(requestOrigin)) {
      return NextResponse.json({ success: true });
    }

    const body = await req.json();
    const { name, email, phone, preferredDate, alternateDate, partySize, experience, heardFrom, notes, companyFax, cfTurnstileToken, formLoadedAt } = body;

    const isDev = process.env.NODE_ENV === "development";
    if (!isDev) {
      if (!cfTurnstileToken) {
        return NextResponse.json({ error: "Verification required" }, { status: 400 });
      }
      const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: cfTurnstileToken, remoteip: ip }),
      });
      const turnstileResult = await turnstileResponse.json();
      if (!turnstileResult.success) return NextResponse.json({ success: true });
    }

    if (formLoadedAt && Date.now() - formLoadedAt < 3000) return NextResponse.json({ success: true });
    if (companyFax) return NextResponse.json({ success: true });

    if (!name || !email || !phone || !preferredDate || !partySize || !experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fields: Record<string, string> = {
      name, email, phone, preferredDate, alternateDate: alternateDate || "", partySize: String(partySize),
      experience, heardFrom: heardFrom || "", notes: notes || "",
    };
    for (const [field, value] of Object.entries(fields)) {
      if (typeof value !== "string") return NextResponse.json({ error: "Invalid field type" }, { status: 400 });
      if (value.length > (MAX_LENGTHS[field] || 500)) return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) return NextResponse.json({ error: "Invalid email format" }, { status: 400 });

    const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
    if (!DATE_RE.test(preferredDate) || preferredDate < OPENING_DATE) {
      return NextResponse.json({ error: "Preferred date must be on or after October 20, 2026" }, { status: 400 });
    }
    if (fields.alternateDate && (!DATE_RE.test(fields.alternateDate) || fields.alternateDate < OPENING_DATE)) {
      return NextResponse.json({ error: "Alternate date must be on or after October 20, 2026" }, { status: 400 });
    }
    const size = parseInt(fields.partySize, 10);
    if (!(size >= 1 && size <= 10)) return NextResponse.json({ error: "Invalid party size" }, { status: 400 });
    if (!["never", "some", "regular"].includes(experience)) return NextResponse.json({ error: "Invalid experience" }, { status: 400 });
    const EXP_LABEL: Record<string, string> = { never: "Never shot", some: "Some experience", regular: "Shoot regularly" };

    // Push to Google Sheets (Member for a Day Bookings tab), fire and forget
    const sheetsWebhook = process.env.GOOGLE_SHEETS_CONTACT_WEBHOOK;
    if (sheetsWebhook) fetch(`https://script.google.com/macros/s/${sheetsWebhook}/exec`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tab: "Member for a Day Bookings",
        values: [
          new Date().toLocaleDateString("en-US"), name.trim(), email.trim(), phone.trim(),
          preferredDate, fields.alternateDate, String(size), EXP_LABEL[experience], fields.heardFrom.trim(), fields.notes.trim(),
        ],
      }),
    }).catch((err) => console.error("Google Sheets push failed:", err));

    const row = (k: string, v: string) => `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">${k}</td><td style="padding:8px;border:1px solid #ddd;">${esc(v)}</td></tr>`;

    // 10. Email notification via Resend
    try {
      if (RESEND_API_KEY && RESEND_API_KEY !== "REPLACE_WITH_REAL_API_KEY") {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: "Traditions Field Club <noreply@traditionsfieldclub.com>",
          to: ["admin@traditionsfieldclub.com", "brian@traditionsfieldclub.com", "jim@traditionsfieldclub.com"],
          replyTo: email.trim(),
          subject: `Member for a Day request: ${preferredDate}, party of ${size}, ${name.trim()}`,
          html: `
            <h2>New Member for a Day Booking Request</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              ${row("Name", name.trim())}${row("Email", email.trim())}${row("Phone", phone.trim())}
              ${row("Preferred date", preferredDate)}${row("Alternate date", fields.alternateDate || "N/A")}
              ${row("Party size", String(size))}${row("Experience", EXP_LABEL[experience])}
              ${row("Heard about us", fields.heardFrom.trim() || "N/A")}${row("Notes", fields.notes.trim() || "N/A")}
            </table>
            <p style="color:#999;font-size:12px;margin-top:20px;">Submitted from the Member for a Day booking form. Please confirm the date within one business day.</p>
          `,
        });
      }
    } catch (emailError) {
      console.error("Resend email failed:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Member for a Day form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
