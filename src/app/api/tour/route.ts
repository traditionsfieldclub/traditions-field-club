import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

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
  groupSize: 1,
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
    const { name, email, phone, preferredDate, alternateDate, groupSize, notes, companyFax, cfTurnstileToken, formLoadedAt } = body;

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

    if (!name || !email || !phone || !preferredDate || !groupSize) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fields: Record<string, string> = {
      name, email, phone, preferredDate, alternateDate: alternateDate || "", groupSize: String(groupSize), notes: notes || "",
    };
    for (const [field, value] of Object.entries(fields)) {
      if (typeof value !== "string") return NextResponse.json({ error: "Invalid field type" }, { status: 400 });
      if (value.length > (MAX_LENGTHS[field] || 500)) return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) return NextResponse.json({ error: "Invalid email format" }, { status: 400 });

    const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
    if (!DATE_RE.test(preferredDate) || preferredDate < today) {
      return NextResponse.json({ error: "Please choose an upcoming preferred date" }, { status: 400 });
    }
    if (fields.alternateDate && (!DATE_RE.test(fields.alternateDate) || fields.alternateDate < today)) {
      return NextResponse.json({ error: "Please choose an upcoming alternate date" }, { status: 400 });
    }
    const size = parseInt(fields.groupSize, 10);
    if (!(size >= 1 && size <= 4)) return NextResponse.json({ error: "Group size must be 1 to 4" }, { status: 400 });

    // Push to Google Sheets (Tour Requests tab), fire and forget
    const sheetsWebhook = process.env.GOOGLE_SHEETS_CONTACT_WEBHOOK;
    if (sheetsWebhook) fetch(`https://script.google.com/macros/s/${sheetsWebhook}/exec`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tab: "Tour Requests",
        values: [
          new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" }), name.trim(), email.trim(), phone.trim(),
          preferredDate, fields.alternateDate, String(size), fields.notes.trim(),
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
          subject: `Tour request: ${preferredDate}, group of ${size}, ${name.trim()}`,
          html: `
            <h2>New Tour Traditions Request</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              ${row("Name", name.trim())}${row("Email", email.trim())}${row("Phone", phone.trim())}
              ${row("Preferred date", preferredDate)}${row("Alternate date", fields.alternateDate || "N/A")}
              ${row("Group size", String(size))}${row("Notes", fields.notes.trim() || "N/A")}
            </table>
            <p style="color:#999;font-size:12px;margin-top:20px;">Submitted from the Tour Traditions request form. Please confirm the date within one business day.</p>
          `,
        });
      }
    } catch (emailError) {
      console.error("Resend email failed:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tour form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
