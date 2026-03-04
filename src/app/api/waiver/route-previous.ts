import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Resend } from "resend";

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const HUBSPOT_WAIVER_FORM_ID = process.env.HUBSPOT_WAIVER_FORM_ID;
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const HUBSPOT_REGION = process.env.HUBSPOT_REGION || "";

// Use region-specific HubSpot Forms API endpoint
const HUBSPOT_API_BASE = HUBSPOT_REGION && HUBSPOT_REGION !== "na1"
  ? `https://api-${HUBSPOT_REGION}.hsforms.com`
  : "https://api.hsforms.com";

// --- Rate Limiting (in-memory, per-IP) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3; // stricter - waivers are one-time
const RATE_LIMIT_WINDOW = 30 * 60 * 1000; // 30 minutes

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
  participantName: 200,
  email: 254,
  phone: 30,
  address: 200,
  city: 100,
  state: 50,
  zip: 20,
  emergencyContactName: 200,
  emergencyContactPhone: 30,
  dateOfBirth: 10,
  parentName: 200,
  parentRelationship: 100,
};

// --- Email Validation ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Allowed Origins ---
const ALLOWED_ORIGINS = [
  process.env.ALLOWED_ORIGIN,
  "https://traditionsfieldclub.netlify.app",
  "http://localhost:3003",
].filter(Boolean);

// --- PDF Generation ---
async function generateWaiverPDF(data: {
  participantName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  dateOfBirth: string;
  isMinor: boolean;
  parentName: string;
  parentRelationship: string;
  signedDate: string;
  signatureDataUrl: string;
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
    const page = pdfDoc.addPage([612, 792]); // Letter size
    return page;
  }

  // Helper to wrap text into lines that fit within maxWidth
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

  // Track current Y position and page
  let currentPage = addPage();
  let y = 742; // start near top
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

  function drawBullet(text: string) {
    ensureSpace(lineHeight);
    currentPage.drawText("\u2022", {
      x: margin + 10,
      y,
      size: fontSize,
      font,
      color: black,
    });
    // Draw wrapped text for the bullet content
    const bulletLines = wrapText(text, contentWidth - 30, font, fontSize);
    for (let i = 0; i < bulletLines.length; i++) {
      if (i > 0) {
        ensureSpace(lineHeight);
      }
      currentPage.drawText(bulletLines[i], {
        x: margin + 22,
        y,
        size: fontSize,
        font,
        color: black,
      });
      y -= lineHeight;
    }
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

  const title2 = "RELEASE AND WAIVER OF LIABILITY, ASSUMPTION OF RISK,";
  const title2Width = fontBold.widthOfTextAtSize(title2, 11);
  currentPage.drawText(title2, {
    x: (pageWidth - title2Width) / 2,
    y,
    size: 11,
    font: fontBold,
    color: darkBlue,
  });
  y -= 14;

  const title3 = "AND INDEMNITY AGREEMENT";
  const title3Width = fontBold.widthOfTextAtSize(title3, 11);
  currentPage.drawText(title3, {
    x: (pageWidth - title3Width) / 2,
    y,
    size: 11,
    font: fontBold,
    color: darkBlue,
  });
  y -= 20;

  // === Warning ===
  drawText(
    "PLEASE READ CAREFULLY BEFORE SIGNING. THIS IS A LEGAL DOCUMENT THAT AFFECTS YOUR RIGHTS.",
    { usedFont: fontBold, size: fontSize }
  );
  y -= 6;

  // === Intro paragraph ===
  drawText(
    'In consideration of being permitted to participate in shooting sports activities, use facilities, equipment, and services at Traditions Field Club, located on Lowcountry Hwy, Ruffin, SC 29475 ("the Club"), I, for myself and on behalf of my heirs, personal representatives, and assigns, agree as follows:'
  );
  y -= 4;

  // === Section 1 ===
  drawHeading("1. ACKNOWLEDGMENT OF RISKS");
  drawText(
    "I understand and acknowledge that participation in shooting sports activities, including but not limited to sporting clays, 5-stand, trap, skeet, and archery, involves inherent risks that cannot be eliminated regardless of the care taken to avoid injuries. These risks include, but are not limited to:"
  );
  y -= 2;
  const risks = [
    "Accidental discharge of firearms",
    "Ricochet or fragmentation of ammunition, shot, or clay targets",
    "Equipment malfunction or failure",
    "Hearing damage from firearm discharge",
    "Eye injury from debris or discharge",
    "Falls, trips, or slips on varied terrain",
    "Exposure to weather conditions including heat, cold, and lightning",
    "Actions of other participants or third parties",
    "Negligence of other participants, the Club, its employees, or agents",
    "Serious bodily injury or death",
  ];
  for (const risk of risks) {
    drawBullet(risk);
  }

  // === Section 2 ===
  drawHeading("2. ASSUMPTION OF RISK");
  drawText(
    "I voluntarily assume full responsibility for any and all risks of injury, illness, death, or property damage arising from my participation in activities at the Club, whether or not caused by the negligence of the Club, its owners, officers, directors, employees, agents, volunteers, or other participants. I acknowledge that I am participating voluntarily and have chosen to do so despite the risks."
  );

  // === Section 3 ===
  drawHeading("3. RELEASE AND WAIVER OF LIABILITY");
  drawText(
    'I hereby release, waive, discharge, and covenant not to sue Traditions Field Club, its owners, officers, directors, employees, agents, volunteers, sponsors, and affiliates (collectively "Releasees") from any and all liability, claims, demands, actions, or causes of action whatsoever arising out of or related to any loss, damage, or injury, including death, that may be sustained by me or my property, while participating in activities at or traveling to or from the Club, whether caused by the negligence of the Releasees or otherwise.'
  );

  // === Section 4 ===
  drawHeading("4. INDEMNIFICATION");
  drawText(
    "I agree to indemnify, defend, and hold harmless the Releasees from any and all claims, actions, suits, procedures, costs, expenses, damages, and liabilities, including attorney's fees, brought as a result of my involvement in activities at the Club and to reimburse them for any such expenses incurred."
  );

  // === Section 5 ===
  drawHeading("5. SAFETY RULES AND CONDUCT");
  drawText("I agree to abide by all safety rules and regulations of the Club, including but not limited to:");
  y -= 2;
  const rules = [
    "Treating all firearms as if they are loaded at all times",
    "Never pointing a firearm at anything I do not intend to shoot",
    "Keeping my finger off the trigger until ready to shoot",
    "Being sure of my target and what is beyond it",
    "Wearing eye and ear protection at all times on the range",
    "Keeping firearms unloaded and actions open when not in use",
    "Not possessing or consuming alcohol or drugs anywhere on club property",
    "Following all instructions from Club staff and range officers",
  ];
  for (const rule of rules) {
    drawBullet(rule);
  }
  drawText(
    "I understand that violation of any safety rule may result in immediate removal from the premises and termination of any membership privileges without refund."
  );

  // === Section 6 ===
  drawHeading("6. MEDICAL TREATMENT AUTHORIZATION");
  drawText(
    "I authorize the Club and its staff to obtain emergency medical treatment for me if I am unable to provide consent at the time of emergency. I understand that I am responsible for any costs associated with such medical treatment."
  );

  // === Section 7 ===
  drawHeading("7. PHOTO AND VIDEO RELEASE");
  drawText(
    "I grant the Club permission to use photographs, video recordings, and other media of my participation in activities for promotional, educational, and marketing purposes without compensation."
  );

  // === Section 8 ===
  drawHeading("8. GOVERNING LAW AND DISPUTE RESOLUTION");
  drawText(
    "This Agreement shall be governed by the laws of the State of South Carolina. Any dispute arising from this Agreement shall be resolved exclusively in the courts of Colleton County, South Carolina. If any portion of this Agreement is found to be unenforceable, the remaining portions shall remain in full force and effect."
  );

  // === Section 9 ===
  drawHeading("9. ACKNOWLEDGMENT OF UNDERSTANDING");
  drawText(
    "I have read this Release and Waiver of Liability, Assumption of Risk, and Indemnity Agreement, fully understand its terms, understand that I have given up substantial rights by signing it, and sign it freely and voluntarily without any inducement."
  );

  // === Participant Info Section ===
  y -= 10;
  ensureSpace(200);
  drawHeading("PARTICIPANT INFORMATION");

  const infoLines = [
    `Name: ${data.participantName}`,
    `Date of Birth: ${data.dateOfBirth}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Address: ${data.address}, ${data.city}, ${data.state} ${data.zip}`,
    `Emergency Contact: ${data.emergencyContactName} — ${data.emergencyContactPhone}`,
  ];

  if (data.isMinor) {
    infoLines.push(`Minor Participant — Parent/Guardian: ${data.parentName} (${data.parentRelationship})`);
  }

  for (const line of infoLines) {
    drawText(line);
  }

  // === Signature Section ===
  y -= 16;
  ensureSpace(120);

  drawText(`Date Signed: ${data.signedDate}`, { usedFont: fontBold });
  y -= 6;
  drawText("Signature:", { usedFont: fontBold });
  y -= 4;

  // Embed the signature image
  try {
    // The signatureDataUrl is a base64 PNG data URL
    const signatureBase64 = data.signatureDataUrl.split(",")[1];
    if (signatureBase64) {
      const signatureBytes = Uint8Array.from(atob(signatureBase64), (c) => c.charCodeAt(0));
      const signatureImage = await pdfDoc.embedPng(signatureBytes);
      const sigDims = signatureImage.scale(0.5);
      // Cap signature dimensions
      const maxSigWidth = 250;
      const maxSigHeight = 80;
      let sigWidth = sigDims.width;
      let sigHeight = sigDims.height;
      if (sigWidth > maxSigWidth) {
        const ratio = maxSigWidth / sigWidth;
        sigWidth = maxSigWidth;
        sigHeight = sigHeight * ratio;
      }
      if (sigHeight > maxSigHeight) {
        const ratio = maxSigHeight / sigHeight;
        sigHeight = maxSigHeight;
        sigWidth = sigWidth * ratio;
      }

      ensureSpace(sigHeight + 20);
      currentPage.drawImage(signatureImage, {
        x: margin,
        y: y - sigHeight,
        width: sigWidth,
        height: sigHeight,
      });
      y -= sigHeight + 10;
    }
  } catch (err) {
    console.error("Failed to embed signature image:", err);
    drawText("[Signature image could not be embedded]");
  }

  // Draw a line under signature
  currentPage.drawLine({
    start: { x: margin, y },
    end: { x: margin + 250, y },
    thickness: 1,
    color: black,
  });
  y -= 14;
  drawText(data.isMinor ? `${data.parentName} (Parent/Guardian)` : data.participantName);

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
      participantName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      emergencyContactName,
      emergencyContactPhone,
      dateOfBirth,
      isMinor,
      parentName,
      parentRelationship,
      signedDate,
      signatureDataUrl,
      companyFax, // honeypot
      cfTurnstileToken,
      formLoadedAt, // timing bot detection
    } = body;

    // 3. Turnstile verification (skip in development — localhost not in allowed hostnames)
    const isDev = process.env.NODE_ENV === "development";

    if (!isDev) {
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
    }

    // 4. Honeypot check
    if (companyFax) {
      return NextResponse.json({ success: true }); // Silent rejection
    }

    // 5. Timing-based bot detection (form filled in < 5 seconds = bot)
    if (formLoadedAt && Date.now() - formLoadedAt < 5000) {
      return NextResponse.json({ success: true }); // Silent rejection
    }

    // 6. Validate required fields
    if (
      !participantName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !emergencyContactName ||
      !emergencyContactPhone ||
      !dateOfBirth ||
      !signedDate ||
      !signatureDataUrl
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 7. Validate minor fields if applicable
    if (isMinor && (!parentName || !parentRelationship)) {
      return NextResponse.json(
        { error: "Parent/guardian information required for minors" },
        { status: 400 }
      );
    }

    // 8. Validate field lengths
    const textFields: Record<string, string> = {
      participantName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      emergencyContactName,
      emergencyContactPhone,
      dateOfBirth,
    };
    if (isMinor) {
      textFields.parentName = parentName;
      textFields.parentRelationship = parentRelationship;
    }

    for (const [field, value] of Object.entries(textFields)) {
      if (typeof value !== "string") {
        return NextResponse.json({ error: "Invalid field type" }, { status: 400 });
      }
      if (value.length > (MAX_LENGTHS[field] || 500)) {
        return NextResponse.json({ error: "Field too long" }, { status: 400 });
      }
    }

    // 9. Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // 10. Validate signature data URL size (max ~500KB base64)
    if (signatureDataUrl.length > 700000) {
      return NextResponse.json({ error: "Signature data too large" }, { status: 400 });
    }

    // 11. Validate signature is a PNG data URL
    if (!signatureDataUrl.startsWith("data:image/png;base64,")) {
      return NextResponse.json({ error: "Invalid signature format" }, { status: 400 });
    }

    // === Generate PDF ===
    const pdfBytes = await generateWaiverPDF({
      participantName: participantName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      emergencyContactName: emergencyContactName.trim(),
      emergencyContactPhone: emergencyContactPhone.trim(),
      dateOfBirth,
      isMinor: !!isMinor,
      parentName: (parentName || "").trim(),
      parentRelationship: (parentRelationship || "").trim(),
      signedDate,
      signatureDataUrl,
    });

    // Convert PDF to base64 for response
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    // === Submit to HubSpot ===
    try {
      const hubspotFields = [
        { objectTypeId: "0-1", name: "firstname", value: participantName.trim().split(" ")[0] },
        { objectTypeId: "0-1", name: "lastname", value: participantName.trim().split(" ").slice(1).join(" ") },
        { objectTypeId: "0-1", name: "email", value: email.trim() },
        { objectTypeId: "0-1", name: "phone", value: phone.trim() },
        { objectTypeId: "0-1", name: "address", value: address.trim() },
        { objectTypeId: "0-1", name: "city", value: city.trim() },
        { objectTypeId: "0-1", name: "state", value: state.trim() },
        { objectTypeId: "0-1", name: "zip", value: zip.trim() },
        { objectTypeId: "0-1", name: "date_of_birth", value: dateOfBirth },
        { objectTypeId: "0-1", name: "emergency_contact_name", value: emergencyContactName.trim() },
        { objectTypeId: "0-1", name: "emergency_contact_phone", value: emergencyContactPhone.trim() },
        { objectTypeId: "0-1", name: "waiver_signed_date", value: signedDate },
      ];

      if (isMinor) {
        hubspotFields.push(
          { objectTypeId: "0-1", name: "parent_guardian_name", value: parentName.trim() },
          { objectTypeId: "0-1", name: "parent_guardian_relationship", value: parentRelationship.trim() }
        );
      }

      const hubspotResponse = await fetch(
        `${HUBSPOT_API_BASE}/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_WAIVER_FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submittedAt: Date.now(),
            fields: hubspotFields,
            context: {
              pageUri: referer || "https://traditionsfieldclub.com/waiver",
              pageName: "Liability Waiver",
              ipAddress: ip,
            },
          }),
        }
      );

      if (!hubspotResponse.ok) {
        const errorData = await hubspotResponse.json();
        console.error("HubSpot waiver submission error:", errorData);
      }
    } catch (hubspotError) {
      console.error("HubSpot submission failed:", hubspotError);
      // Don't block the response — waiver PDF is more important
    }

    // === Email PDF to owners via Resend ===
    try {
      if (RESEND_API_KEY && RESEND_API_KEY !== "REPLACE_WITH_REAL_API_KEY") {
        const resend = new Resend(RESEND_API_KEY);

        await resend.emails.send({
          from: "Traditions Field Club <noreply@traditionsfieldclub.com>",
          to: ["admin@traditionsfieldclub.com"],
          subject: `Signed Waiver — ${participantName.trim()}`,
          html: `
            <h2>New Waiver Submission</h2>
            <p><strong>Participant:</strong> ${esc(participantName.trim())}</p>
            <p><strong>Email:</strong> ${esc(email.trim())}</p>
            <p><strong>Phone:</strong> ${esc(phone.trim())}</p>
            <p><strong>Date of Birth:</strong> ${esc(dateOfBirth)}</p>
            <p><strong>Emergency Contact:</strong> ${esc(emergencyContactName.trim())} — ${esc(emergencyContactPhone.trim())}</p>
            ${isMinor ? `<p><strong>Minor — Parent/Guardian:</strong> ${esc(parentName.trim())} (${esc(parentRelationship.trim())})</p>` : ""}
            <p><strong>Signed:</strong> ${esc(signedDate)}</p>
            <p>The signed waiver PDF is attached.</p>
          `,
          attachments: [
            {
              filename: `waiver-${participantName.trim().replace(/\s+/g, "-").toLowerCase()}-${signedDate}.pdf`,
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

    // === Return success with PDF ===
    return NextResponse.json({
      success: true,
      pdf: pdfBase64,
    });
  } catch (error) {
    console.error("Waiver form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
