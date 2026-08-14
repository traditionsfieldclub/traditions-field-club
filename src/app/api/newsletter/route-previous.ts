import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// --- Rate Limiting (in-memory, per-IP) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
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


// --- HTML Escaping (XSS Prevention) ---
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

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
    // 1. Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ success: true }); // Silent rejection
    }

    // 2. Origin check
    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");
    const requestOrigin = origin || (referer ? new URL(referer).origin : null);

    if (requestOrigin && !ALLOWED_ORIGINS.includes(requestOrigin)) {
      return NextResponse.json({ success: true }); // Silent rejection
    }

    const body = await req.json();
    const { email, formLoadedAt, cfTurnstileToken } = body;

    // 3. Turnstile verification
    if (TURNSTILE_SECRET_KEY && cfTurnstileToken) {
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
        return NextResponse.json({ success: true }); // Silent rejection
      }
    }

    // 4. Timing-based bot detection (< 3 seconds = bot)
    if (formLoadedAt && Date.now() - formLoadedAt < 3000) {
      return NextResponse.json({ success: true }); // Silent rejection
    }

    // 5. Validate email
    if (!email || typeof email !== "string" || email.length > 254) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // 6. Push to Google Sheets (Newsletter Submissions tab) — fire and forget
    const sheetsWebhook = process.env.GOOGLE_SHEETS_CONTACT_WEBHOOK;
    if (sheetsWebhook) fetch(
      `https://script.google.com/macros/s/${sheetsWebhook}/exec`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tab: "Newsletter Submissions",
          values: [
            new Date().toLocaleDateString("en-US"),
            email.trim(),
          ],
        }),
      }
    ).catch((err) => console.error("Google Sheets push failed:", err));

    // 7. Email notification via Resend
    try {
      if (RESEND_API_KEY && RESEND_API_KEY !== "REPLACE_WITH_REAL_API_KEY") {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: "Traditions Field Club <noreply@traditionsfieldclub.com>",
          to: ["admin@traditionsfieldclub.com"],
          subject: "New Newsletter Subscriber",
          html: `
            <h2>New Newsletter Signup</h2>
            <p><strong>Email:</strong> <a href="mailto:${esc(email.trim())}">${esc(email.trim())}</a></p>
            <p style="color:#999;font-size:12px;margin-top:20px;">Submitted from the Traditions Field Club website.</p>
          `,
        });
      }
    } catch (emailError) {
      console.error("Resend email failed:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
