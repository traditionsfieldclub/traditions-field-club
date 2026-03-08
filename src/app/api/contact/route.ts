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
  firstName: 100,
  lastName: 100,
  email: 254,
  phone: 30,
  topic: 50,
  message: 2000,
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
    const { firstName, lastName, email, phone, topic, message, companyFax, cfTurnstileToken, formLoadedAt } = body;

    // 3. Turnstile verification (skip in development — localhost not in allowed hostnames)
    const isDev = process.env.NODE_ENV === "development";

    if (!isDev) {
      if (!cfTurnstileToken) {
        return NextResponse.json(
          { error: "Verification required" },
          { status: 400 }
        );
      }

      // Verify token with Cloudflare
      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: TURNSTILE_SECRET_KEY,
            response: cfTurnstileToken,
            remoteip: ip,
          }),
        }
      );
      const turnstileResult = await turnstileResponse.json();

      if (!turnstileResult.success) {
        return NextResponse.json({ success: true });
      }
    }

    // 4. Timing-based bot detection (< 3 seconds = bot)
    if (formLoadedAt && Date.now() - formLoadedAt < 3000) {
      return NextResponse.json({ success: true }); // Silent rejection
    }

    // 5. Honeypot check — if filled, it's a bot
    if (companyFax) {
      return NextResponse.json({ success: true });
    }

    // 5. Validate required fields exist
    if (!firstName || !lastName || !email || !phone || !topic) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 6. Validate field lengths
    const fields: Record<string, string> = { firstName, lastName, email, phone, topic, message: message || "" };
    for (const [field, value] of Object.entries(fields)) {
      if (typeof value !== "string") {
        return NextResponse.json({ error: "Invalid field type" }, { status: 400 });
      }
      if (value.length > (MAX_LENGTHS[field] || 500)) {
        return NextResponse.json({ error: "Field too long" }, { status: 400 });
      }
    }

    // 7. Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // 8. Validate topic is an expected value
    const VALID_TOPICS = ["membership", "lessons", "volunteer", "partnerships", "general", "scheduling", "other"];
    if (!VALID_TOPICS.includes(topic)) {
      return NextResponse.json({ error: "Invalid topic" }, { status: 400 });
    }

    // 9. Push to Google Sheets (Contact Form Submissions tab) — fire and forget
    const sheetsWebhook = process.env.GOOGLE_SHEETS_CONTACT_WEBHOOK;
    if (sheetsWebhook) fetch(
      `https://script.google.com/macros/s/${sheetsWebhook}/exec`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tab: "Contact Form Submissions",
          values: [
            new Date().toLocaleDateString("en-US"),
            firstName.trim(),
            lastName.trim(),
            email.trim(),
            phone.trim(),
            topic,
            (message || "").trim(),
          ],
        }),
      }
    ).catch((err) => console.error("Google Sheets push failed:", err));

    // 10. Email notification via Resend
    try {
      if (RESEND_API_KEY && RESEND_API_KEY !== "REPLACE_WITH_REAL_API_KEY") {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: "Traditions Field Club <noreply@traditionsfieldclub.com>",
          to: ["admin@traditionsfieldclub.com"],
          subject: `New Contact Form: ${topic} — ${firstName} ${lastName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${esc(firstName.trim())} ${esc(lastName.trim())}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${esc(email.trim())}">${esc(email.trim())}</a></td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${esc(phone.trim())}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Topic</td><td style="padding:8px;border:1px solid #ddd;">${esc(topic)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;">${esc((message || "N/A").trim())}</td></tr>
            </table>
            <p style="color:#999;font-size:12px;margin-top:20px;">Submitted from the Traditions Field Club website contact form.</p>
          `,
        });
      }
    } catch (emailError) {
      console.error("Resend email failed:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
