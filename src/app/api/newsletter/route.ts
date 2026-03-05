import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const HUBSPOT_NEWSLETTER_FORM_ID = process.env.HUBSPOT_NEWSLETTER_FORM_ID;
const HUBSPOT_REGION = process.env.HUBSPOT_REGION || "";
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const HUBSPOT_API_BASE = HUBSPOT_REGION && HUBSPOT_REGION !== "na1"
  ? `https://api-${HUBSPOT_REGION}.hsforms.com`
  : "https://api.hsforms.com";

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

// Clean up stale entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 15 * 60 * 1000);

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
    fetch(
      "https://script.google.com/macros/s/AKfycby5yqVfqC3c1mo3QVa4WNsIl8Wh_FYw2rEfpi0Ji20Oql4EIiHOtng9amVQqLYkMX7Mnw/exec",
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
            <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
            <p style="color:#999;font-size:12px;margin-top:20px;">Submitted from the Traditions Field Club website.</p>
          `,
        });
      }
    } catch (emailError) {
      console.error("Resend email failed:", emailError);
    }

    // 8. Submit to HubSpot
    const hubspotResponse = await fetch(
      `${HUBSPOT_API_BASE}/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_NEWSLETTER_FORM_ID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submittedAt: Date.now(),
          fields: [
            { objectTypeId: "0-1", name: "email", value: email.trim() },
          ],
          context: {
            pageUri: referer || "https://traditionsfieldclub.com",
            pageName: "Newsletter Signup",
            ipAddress: ip,
          },
        }),
      }
    );

    if (!hubspotResponse.ok) {
      const errorData = await hubspotResponse.json();
      console.error("HubSpot newsletter error:", errorData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
