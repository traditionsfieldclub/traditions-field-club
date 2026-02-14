import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Resend } from "resend";

const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const HUBSPOT_MEMBERSHIP_FORM_ID = process.env.HUBSPOT_MEMBERSHIP_FORM_ID;
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
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
  dateOfBirth: 10,
  address: 200,
  city: 100,
  state: 50,
  zip: 20,
  membershipType: 30,
  spouseName: 200,
  childrenInfo: 500,
  experienceLevel: 30,
  previousClubs: 500,
  howHeard: 30,
  emergencyName: 200,
  emergencyPhone: 30,
  emergencyRelationship: 100,
  additionalInfo: 2000,
};

// --- Email Validation ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Whitelist Values ---
const VALID_MEMBERSHIP_TYPES = ["basic", "family", "corporate", "exclusive", "undecided"];
const VALID_EXPERIENCE_LEVELS = ["beginner", "novice", "intermediate", "advanced", "competitive"];
const VALID_HOW_HEARD = ["friend", "member", "social", "search", "event", "signage", "other"];

// --- Display Labels ---
const MEMBERSHIP_LABELS: Record<string, string> = {
  basic: "Basic Membership (Individual)",
  family: "Family Membership (Household)",
  corporate: "Corporate Membership (Business)",
  exclusive: "Exclusive Membership (Premium)",
  undecided: "Undecided — Would like to discuss options",
};

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: "Beginner — New to shooting sports",
  novice: "Novice — Some experience, still learning",
  intermediate: "Intermediate — Comfortable and improving",
  advanced: "Advanced — Experienced shooter",
  competitive: "Competitive — Tournament/competition experience",
};

const HOW_HEARD_LABELS: Record<string, string> = {
  friend: "Friend or Family Referral",
  member: "Current Member Referral",
  social: "Social Media",
  search: "Online Search",
  event: "Event or Show",
  signage: "Drove By / Saw Signage",
  other: "Other",
};

// --- Allowed Origins ---
const ALLOWED_ORIGINS = [
  process.env.ALLOWED_ORIGIN,
  "https://traditionsfieldclub.netlify.app",
  "http://localhost:3005",
  "http://localhost:3003",
].filter(Boolean);

// --- PDF Generation ---
async function generateApplicationPDF(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  membershipType: string;
  spouseName: string;
  childrenInfo: string;
  experienceLevel: string;
  previousClubs: string;
  howHeard: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
  additionalInfo: string;
  submittedDate: string;
}): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontSize = 10;
  const titleSize = 14;
  const headingSize = 11;
  const lineHeight = 14;
  const margin = 50;
  const darkBlue = rgb(0.086, 0.157, 0.220); // #162838
  const black = rgb(0, 0, 0);

  function addPage() {
    return pdfDoc.addPage([612, 792]); // Letter size
  }

  function wrapText(text: string, maxWidth: number, usedFont = font, usedSize = fontSize): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = usedFont.widthOfTextAtSize(testLine, usedSize);
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  let currentPage = addPage();
  let y = 742;
  const pageWidth = 612;
  const contentWidth = pageWidth - margin * 2;

  function ensureSpace(needed: number) {
    if (y - needed < 50) {
      currentPage = addPage();
      y = 742;
    }
  }

  function drawText(text: string, options: {
    usedFont?: typeof font;
    size?: number;
    color?: typeof black;
    indent?: number;
    maxWidth?: number;
  } = {}) {
    const {
      usedFont: f = font,
      size = fontSize,
      color = black,
      indent = 0,
      maxWidth = contentWidth - indent,
    } = options;

    const lines = wrapText(text, maxWidth, f, size);
    for (const line of lines) {
      ensureSpace(lineHeight);
      currentPage.drawText(line, {
        x: margin + indent,
        y,
        size,
        font: f,
        color,
      });
      y -= lineHeight;
    }
  }

  function drawHeading(text: string) {
    y -= 6;
    ensureSpace(lineHeight + 6);
    drawText(text, { usedFont: fontBold, size: headingSize, color: darkBlue });
    y -= 2;
  }

  function drawField(label: string, value: string) {
    ensureSpace(lineHeight);
    const labelText = `${label}: `;
    const labelWidth = fontBold.widthOfTextAtSize(labelText, fontSize);

    // Draw label bold
    currentPage.drawText(labelText, {
      x: margin,
      y,
      size: fontSize,
      font: fontBold,
      color: black,
    });

    // Draw value next to it (or wrap if long)
    const valueLines = wrapText(value, contentWidth - labelWidth, font, fontSize);
    for (let i = 0; i < valueLines.length; i++) {
      if (i === 0) {
        currentPage.drawText(valueLines[i], {
          x: margin + labelWidth,
          y,
          size: fontSize,
          font,
          color: black,
        });
      } else {
        y -= lineHeight;
        ensureSpace(lineHeight);
        currentPage.drawText(valueLines[i], {
          x: margin + labelWidth,
          y,
          size: fontSize,
          font,
          color: black,
        });
      }
    }
    y -= lineHeight;
  }

  // === Title ===
  const title1 = "TRADITIONS FIELD CLUB";
  const title1Width = fontBold.widthOfTextAtSize(title1, titleSize);
  currentPage.drawText(title1, {
    x: (pageWidth - title1Width) / 2,
    y,
    size: titleSize,
    font: fontBold,
    color: darkBlue,
  });
  y -= 18;

  const title2 = "MEMBERSHIP APPLICATION";
  const title2Width = fontBold.widthOfTextAtSize(title2, 12);
  currentPage.drawText(title2, {
    x: (pageWidth - title2Width) / 2,
    y,
    size: 12,
    font: fontBold,
    color: darkBlue,
  });
  y -= 20;

  // Submitted date
  drawText(`Submitted: ${data.submittedDate}`, { usedFont: font, size: 9, color: rgb(0.4, 0.4, 0.4) });
  y -= 6;

  // === Personal Information ===
  drawHeading("PERSONAL INFORMATION");
  drawField("Name", `${data.firstName} ${data.lastName}`);
  drawField("Email", data.email);
  drawField("Phone", data.phone);
  drawField("Date of Birth", data.dateOfBirth);
  drawField("Address", `${data.address}, ${data.city}, ${data.state} ${data.zip}`);

  // === Membership Selection ===
  drawHeading("MEMBERSHIP SELECTION");
  drawField("Membership Type", MEMBERSHIP_LABELS[data.membershipType] || data.membershipType);

  if (data.spouseName) {
    drawField("Spouse/Partner", data.spouseName);
  }
  if (data.childrenInfo) {
    drawField("Children", data.childrenInfo);
  }

  // === Shooting Experience ===
  drawHeading("SHOOTING EXPERIENCE");
  drawField("Experience Level", EXPERIENCE_LABELS[data.experienceLevel] || data.experienceLevel);
  if (data.previousClubs) {
    drawField("Previous Clubs", data.previousClubs);
  }
  drawField("How They Heard About Us", HOW_HEARD_LABELS[data.howHeard] || data.howHeard);

  // === Emergency Contact ===
  drawHeading("EMERGENCY CONTACT");
  drawField("Name", data.emergencyName);
  drawField("Phone", data.emergencyPhone);
  drawField("Relationship", data.emergencyRelationship);

  // === Additional Information ===
  if (data.additionalInfo) {
    drawHeading("ADDITIONAL INFORMATION");
    drawText(data.additionalInfo);
  }

  // === Footer line ===
  y -= 16;
  ensureSpace(30);
  currentPage.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });
  y -= 14;
  drawText("This application was submitted electronically via traditionsfieldclub.com", {
    size: 8,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting by IP
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
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      address,
      city,
      state,
      zip,
      membershipType,
      spouseName,
      childrenInfo,
      experienceLevel,
      previousClubs,
      howHeard,
      emergencyName,
      emergencyPhone,
      emergencyRelationship,
      additionalInfo,
      website, // honeypot
      cfTurnstileToken,
      formLoadedAt, // timing bot detection
    } = body;

    // 3. Turnstile verification
    if (!cfTurnstileToken) {
      return NextResponse.json(
        { error: "Verification required" },
        { status: 400 }
      );
    }

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

    // 4. Honeypot check
    if (website) {
      return NextResponse.json({ success: true }); // Silent rejection
    }

    // 5. Timing-based bot detection (form filled in < 5 seconds = bot)
    if (formLoadedAt && Date.now() - formLoadedAt < 5000) {
      return NextResponse.json({ success: true }); // Silent rejection
    }

    // 6. Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !membershipType ||
      !experienceLevel ||
      !howHeard ||
      !emergencyName ||
      !emergencyPhone ||
      !emergencyRelationship
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 7. Validate field lengths
    const textFields: Record<string, string> = {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      address,
      city,
      state,
      zip,
      membershipType,
      experienceLevel,
      howHeard,
      emergencyName,
      emergencyPhone,
      emergencyRelationship,
      spouseName: spouseName || "",
      childrenInfo: childrenInfo || "",
      previousClubs: previousClubs || "",
      additionalInfo: additionalInfo || "",
    };

    for (const [field, value] of Object.entries(textFields)) {
      if (typeof value !== "string") {
        return NextResponse.json({ error: "Invalid field type" }, { status: 400 });
      }
      if (value.length > (MAX_LENGTHS[field] || 500)) {
        return NextResponse.json({ error: "Field too long" }, { status: 400 });
      }
    }

    // 8. Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // 9. Whitelist checks
    if (!VALID_MEMBERSHIP_TYPES.includes(membershipType)) {
      return NextResponse.json({ error: "Invalid membership type" }, { status: 400 });
    }
    if (!VALID_EXPERIENCE_LEVELS.includes(experienceLevel)) {
      return NextResponse.json({ error: "Invalid experience level" }, { status: 400 });
    }
    if (!VALID_HOW_HEARD.includes(howHeard)) {
      return NextResponse.json({ error: "Invalid referral source" }, { status: 400 });
    }

    // 10. Generate PDF
    const submittedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const pdfBytes = await generateApplicationPDF({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dateOfBirth,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      membershipType,
      spouseName: (spouseName || "").trim(),
      childrenInfo: (childrenInfo || "").trim(),
      experienceLevel,
      previousClubs: (previousClubs || "").trim(),
      howHeard,
      emergencyName: emergencyName.trim(),
      emergencyPhone: emergencyPhone.trim(),
      emergencyRelationship: emergencyRelationship.trim(),
      additionalInfo: (additionalInfo || "").trim(),
      submittedDate,
    });

    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    // 11. Build combined message for fields without dedicated properties
    const messageParts: string[] = [];
    if (howHeard?.trim()) {
      messageParts.push(`How They Heard About Us: ${HOW_HEARD_LABELS[howHeard] || howHeard}`);
    }
    if (emergencyRelationship?.trim()) {
      messageParts.push(`Emergency Contact Relationship: ${emergencyRelationship.trim()}`);
    }
    if (previousClubs?.trim()) {
      messageParts.push(`Previous Clubs: ${previousClubs.trim()}`);
    }
    if (additionalInfo?.trim()) {
      messageParts.push(`Additional Info: ${additionalInfo.trim()}`);
    }

    // 12. Submit to HubSpot Forms API
    try {
      const hubspotFields = [
        { objectTypeId: "0-1", name: "firstname", value: firstName.trim() },
        { objectTypeId: "0-1", name: "lastname", value: lastName.trim() },
        { objectTypeId: "0-1", name: "email", value: email.trim() },
        { objectTypeId: "0-1", name: "phone", value: phone.trim() },
        { objectTypeId: "0-1", name: "date_of_birth", value: dateOfBirth },
        { objectTypeId: "0-1", name: "address", value: address.trim() },
        { objectTypeId: "0-1", name: "city", value: city.trim() },
        { objectTypeId: "0-1", name: "state", value: state.trim() },
        { objectTypeId: "0-1", name: "zip", value: zip.trim() },
        { objectTypeId: "0-1", name: "membership_type", value: membershipType },
        { objectTypeId: "0-1", name: "experience_level", value: experienceLevel },
        { objectTypeId: "0-1", name: "emergency_contact_name", value: emergencyName.trim() },
        { objectTypeId: "0-1", name: "emergency_contact_phone", value: emergencyPhone.trim() },
      ];

      if (spouseName?.trim()) {
        hubspotFields.push({ objectTypeId: "0-1", name: "spouse", value: spouseName.trim() });
      }
      if (childrenInfo?.trim()) {
        hubspotFields.push({ objectTypeId: "0-1", name: "children_info", value: childrenInfo.trim() });
      }
      if (messageParts.length > 0) {
        hubspotFields.push({ objectTypeId: "0-1", name: "message", value: messageParts.join("\n") });
      }

      const hubspotResponse = await fetch(
        `${HUBSPOT_API_BASE}/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_MEMBERSHIP_FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submittedAt: Date.now(),
            fields: hubspotFields,
            context: {
              pageUri: referer || "https://traditionsfieldclub.com/join",
              pageName: "Membership Application",
              ipAddress: ip,
            },
          }),
        }
      );

      if (!hubspotResponse.ok) {
        const errorData = await hubspotResponse.json();
        console.error("HubSpot membership submission error:", errorData);
      }
    } catch (hubspotError) {
      console.error("HubSpot submission failed:", hubspotError);
      // Don't block the response — PDF email is more important
    }

    // 13. Email PDF to owner via Resend
    try {
      if (RESEND_API_KEY && RESEND_API_KEY !== "REPLACE_WITH_REAL_API_KEY") {
        const resend = new Resend(RESEND_API_KEY);

        await resend.emails.send({
          from: "Traditions Field Club <onboarding@resend.dev>",
          to: ["admin@traditionsfieldclub.com"],
          subject: `Membership Application — ${firstName.trim()} ${lastName.trim()}`,
          html: `
            <h2>New Membership Application</h2>
            <p><strong>Name:</strong> ${firstName.trim()} ${lastName.trim()}</p>
            <p><strong>Email:</strong> ${email.trim()}</p>
            <p><strong>Phone:</strong> ${phone.trim()}</p>
            <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
            <p><strong>Address:</strong> ${address.trim()}, ${city.trim()}, ${state.trim()} ${zip.trim()}</p>
            <p><strong>Membership Type:</strong> ${MEMBERSHIP_LABELS[membershipType] || membershipType}</p>
            <p><strong>Experience Level:</strong> ${EXPERIENCE_LABELS[experienceLevel] || experienceLevel}</p>
            <p><strong>How They Heard:</strong> ${HOW_HEARD_LABELS[howHeard] || howHeard}</p>
            <p><strong>Emergency Contact:</strong> ${emergencyName.trim()} — ${emergencyPhone.trim()} (${emergencyRelationship.trim()})</p>
            ${spouseName?.trim() ? `<p><strong>Spouse:</strong> ${spouseName.trim()}</p>` : ""}
            ${childrenInfo?.trim() ? `<p><strong>Children:</strong> ${childrenInfo.trim()}</p>` : ""}
            ${previousClubs?.trim() ? `<p><strong>Previous Clubs:</strong> ${previousClubs.trim()}</p>` : ""}
            ${additionalInfo?.trim() ? `<p><strong>Additional Info:</strong> ${additionalInfo.trim()}</p>` : ""}
            <p><strong>Submitted:</strong> ${submittedDate}</p>
            <p>The full membership application PDF is attached.</p>
          `,
          attachments: [
            {
              filename: `membership-application-${firstName.trim().toLowerCase()}-${lastName.trim().toLowerCase()}-${new Date().toISOString().split("T")[0]}.pdf`,
              content: pdfBase64,
              contentType: "application/pdf",
            },
          ],
        });
      }
    } catch (emailError) {
      console.error("Resend email failed:", emailError);
      // Don't block the response
    }

    return NextResponse.json({ success: true, pdf: pdfBase64 });
  } catch (error) {
    console.error("Membership form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
