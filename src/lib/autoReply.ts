import { Resend } from "resend";

// Automatic reply emails to visitors. Sent separately from owner notices;
// failures are logged and never block a form submission.

const FROM = "Traditions Field Club <admin@traditionsfieldclub.com>";
const REPLY_TO = "admin@traditionsfieldclub.com";
const TOUR_URL = "https://traditionsfieldclub.com/tour#book";
const DAY_URL = "https://traditionsfieldclub.com/member-for-a-day#book";
const SITE_URL = "https://traditionsfieldclub.com";
const PHONE = "(843) 321-8152";
const FOOTER_ADDRESS = "Traditions Field Club, 13197 Lowcountry Highway, Ruffin, SC 29475";
const OPT_OUT = "Prefer not to hear from us? Reply STOP or email admin@traditionsfieldclub.com.";

export type AutoReply = { subject: string; html: string; text: string };

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

type Button = { label: string; note: string; href: string; primary?: boolean };

const TOUR_BTN: Button = { label: "Book a Tour", note: "Complimentary, about an hour. No cost, no commitment.", href: TOUR_URL };
const DAY_BTN: Button = { label: "Book Your Day", note: "$100 per shooter, everything included.", href: DAY_URL, primary: true };

function buttonHtml(b: Button) {
  const bg = b.primary ? "#a75235" : "#4d5c47";
  return `
  <tr><td style="padding:6px 0 14px 0;">
    <a href="${b.href}" style="display:block;background:${bg};color:#f5f2ec;text-decoration:none;text-align:center;font-family:Georgia,'Times New Roman',serif;font-size:17px;letter-spacing:0.5px;padding:14px 20px;border-radius:8px;">${esc(b.label)}</a>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#666666;text-align:center;padding-top:6px;">${esc(b.note)}</div>
  </td></tr>`;
}

function layout(paragraphs: string[], buttons: Button[]): { html: string; text: string } {
  const pHtml = paragraphs
    .map((p) => `<p style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:#333333;">${esc(p)}</p>`)
    .join("");
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Traditions Field Club</title></head>
<body style="margin:0;padding:0;background:#f5f2ec;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f2ec;"><tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:10px;overflow:hidden;">
    <tr><td style="background:#162838;padding:22px 24px;text-align:center;">
      <div style="font-family:Georgia,'Times New Roman',serif;color:#f5f2ec;font-size:24px;letter-spacing:3px;">TRADITIONS</div>
      <div style="font-family:Georgia,'Times New Roman',serif;color:#f5f2ec;font-size:13px;letter-spacing:4px;opacity:0.85;">FIELD CLUB</div>
    </td></tr>
    <tr><td style="padding:28px 24px 8px 24px;">
      ${pHtml}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${buttons.map(buttonHtml).join("")}</table>
      <p style="margin:6px 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:#333333;">Call or text <a href="tel:+18433218152" style="color:#a75235;font-weight:bold;text-decoration:none;">${PHONE}</a>.</p>
      <p style="margin:0 0 24px 0;font-family:Georgia,'Times New Roman',serif;font-size:17px;color:#162838;">Jim and Brian<br><span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#666666;">Traditions Field Club</span></p>
    </td></tr>
    <tr><td style="background:#f5f2ec;padding:16px 24px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#777777;">
      <a href="${SITE_URL}" style="color:#4d5c47;text-decoration:none;">traditionsfieldclub.com</a><br>
      ${esc(FOOTER_ADDRESS)}<br>
      ${esc(OPT_OUT)}
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
  const text = [
    ...paragraphs,
    "",
    ...buttons.map((b) => `${b.label}: ${b.href}\n${b.note}`),
    "",
    `Call or text ${PHONE}.`,
    "",
    "Jim and Brian",
    "Traditions Field Club",
    "",
    "--",
    SITE_URL,
    FOOTER_ADDRESS,
    OPT_OUT,
  ].join("\n");
  return { html, text };
}

export function contactReply(firstName: string, topic: string): AutoReply {
  const paras = [
    `Thanks, ${firstName}. We got your message and we'll be in touch within one business day.`,
  ];
  if (topic === "membership") paras.push("We're building our founding class of 100 members, and we'd love to show you around first.");
  paras.push("Want to see the place in the meantime?");
  return { subject: "Thanks for reaching out to Traditions Field Club", ...layout(paras, [TOUR_BTN, DAY_BTN]) };
}

export function newsletterReply(): AutoReply {
  return {
    subject: "Welcome to Traditions Field Club",
    ...layout(
      [
        "Welcome, and thanks for signing up.",
        "We're Jim and Brian. We've lived in Bluffton and Hilton Head for 14 years, and sporting clays has long been part of our lives. Traditions is the private sporting clays and outdoor club we always wanted, a scenic drive through the Lowcountry.",
        "We'll share club news and openings now and then. When you're ready, come see it for yourself.",
      ],
      [TOUR_BTN, DAY_BTN]
    ),
  };
}

export function membershipReply(firstName: string): AutoReply {
  return {
    subject: "We received your Traditions membership application",
    ...layout(
      [
        `Thank you, ${firstName}. Jim and Brian will reach out personally within two business days to talk next steps.`,
        "If you haven't visited yet, we'd love to show you around first.",
      ],
      [TOUR_BTN]
    ),
  };
}

export async function sendAutoReply(resend: Resend, to: string, reply: AutoReply) {
  try {
    await resend.emails.send({
      from: FROM,
      to: [to],
      replyTo: REPLY_TO,
      subject: reply.subject,
      html: reply.html,
      text: reply.text,
    });
  } catch (err) {
    console.error("Auto-reply failed:", err);
  }
}
