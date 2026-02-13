import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID;
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

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

// Clean up stale entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 15 * 60 * 1000);

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
  "http://localhost:3005",
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
      // Silent rejection — return fake success so bots think it worked
      return NextResponse.json({ success: true });
    }

    // 2. Origin check
    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");
    const requestOrigin = origin || (referer ? new URL(referer).origin : null);

    if (requestOrigin && !ALLOWED_ORIGINS.includes(requestOrigin)) {
      // Silent rejection
      return NextResponse.json({ success: true });
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, topic, message, website, cfTurnstileToken } = body;

    // 3. Turnstile verification — reject if no token provided
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
      // Silent rejection — fake success so bots don't know they failed
      return NextResponse.json({ success: true });
    }

    // 4. Honeypot check — if filled, it's a bot
    if (website) {
      // Silent rejection
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

    // 9. Submit to HubSpot Forms API
    const hubspotResponse = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submittedAt: Date.now(),
          fields: [
            { objectTypeId: "0-1", name: "firstname", value: firstName.trim() },
            { objectTypeId: "0-1", name: "lastname", value: lastName.trim() },
            { objectTypeId: "0-1", name: "email", value: email.trim() },
            { objectTypeId: "0-1", name: "phone", value: phone.trim() },
            { objectTypeId: "0-1", name: "how_can_we_help_", value: topic },
            { objectTypeId: "0-1", name: "message", value: (message || "").trim() },
          ],
          context: {
            pageUri: referer || "https://traditionsfieldclub.com/contact",
            pageName: "Contact Us",
            ipAddress: ip,
          },
        }),
      }
    );

    if (!hubspotResponse.ok) {
      const errorData = await hubspotResponse.json();
      console.error("HubSpot API error:", errorData);
      return NextResponse.json(
        { error: "Failed to submit form" },
        { status: 500 }
      );
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
