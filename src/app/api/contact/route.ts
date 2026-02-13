import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID;
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const HUBSPOT_REGION = process.env.HUBSPOT_REGION || "";

// Use region-specific HubSpot Forms API endpoint
const HUBSPOT_API_BASE = HUBSPOT_REGION && HUBSPOT_REGION !== "na1"
  ? `https://api-${HUBSPOT_REGION}.hsforms.com`
  : "https://api.hsforms.com";

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
  // --- TEMPORARY DEBUG MODE (remove before go-live) ---
  const debug: string[] = [];

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
    debug.push(`origin: ${requestOrigin}`);

    if (requestOrigin && !ALLOWED_ORIGINS.includes(requestOrigin)) {
      debug.push("REJECTED: origin not allowed");
      return NextResponse.json({ success: true, _debug: debug });
    }
    debug.push("origin: OK");

    const body = await req.json();
    const { firstName, lastName, email, phone, topic, message, website, cfTurnstileToken } = body;

    // 3. Turnstile verification — reject if no token provided
    if (!cfTurnstileToken) {
      debug.push("REJECTED: no turnstile token");
      return NextResponse.json(
        { error: "Verification required", _debug: debug },
        { status: 400 }
      );
    }

    // Verify token with Cloudflare
    debug.push(`turnstile secret set: ${!!TURNSTILE_SECRET_KEY}`);
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
    debug.push(`turnstile result: ${JSON.stringify(turnstileResult)}`);

    if (!turnstileResult.success) {
      debug.push("REJECTED: turnstile failed");
      return NextResponse.json({ success: true, _debug: debug });
    }
    debug.push("turnstile: OK");

    // 4. Honeypot check — if filled, it's a bot
    if (website) {
      debug.push("REJECTED: honeypot");
      return NextResponse.json({ success: true, _debug: debug });
    }

    // 5. Validate required fields exist
    if (!firstName || !lastName || !email || !phone || !topic) {
      return NextResponse.json(
        { error: "Missing required fields", _debug: debug },
        { status: 400 }
      );
    }

    // 6. Validate field lengths
    const fields: Record<string, string> = { firstName, lastName, email, phone, topic, message: message || "" };
    for (const [field, value] of Object.entries(fields)) {
      if (typeof value !== "string") {
        return NextResponse.json({ error: "Invalid field type", _debug: debug }, { status: 400 });
      }
      if (value.length > (MAX_LENGTHS[field] || 500)) {
        return NextResponse.json({ error: "Field too long", _debug: debug }, { status: 400 });
      }
    }

    // 7. Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format", _debug: debug }, { status: 400 });
    }

    // 8. Validate topic is an expected value
    const VALID_TOPICS = ["membership", "lessons", "volunteer", "partnerships", "general", "scheduling", "other"];
    if (!VALID_TOPICS.includes(topic)) {
      return NextResponse.json({ error: "Invalid topic", _debug: debug }, { status: 400 });
    }

    debug.push("validation: OK");

    // 9. Submit to HubSpot Forms API
    const hubspotUrl = `${HUBSPOT_API_BASE}/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
    debug.push(`hubspot portal set: ${!!HUBSPOT_PORTAL_ID}`);
    debug.push(`hubspot form set: ${!!HUBSPOT_FORM_ID}`);
    debug.push(`hubspot url: ${hubspotUrl}`);

    const hubspotResponse = await fetch(
      hubspotUrl,
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

    debug.push(`hubspot status: ${hubspotResponse.status}`);
    const hubspotData = await hubspotResponse.json();
    debug.push(`hubspot response: ${JSON.stringify(hubspotData)}`);

    if (!hubspotResponse.ok) {
      console.error("HubSpot API error:", hubspotData);
      return NextResponse.json(
        { error: "Failed to submit form", _debug: debug },
        { status: 500 }
      );
    }

    debug.push("hubspot: OK");
    return NextResponse.json({ success: true, _debug: debug });
  } catch (error) {
    console.error("Contact form error:", error);
    debug.push(`EXCEPTION: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json(
      { error: "Internal server error", _debug: debug },
      { status: 500 }
    );
  }
}
