import path from "node:path";
import nodemailer from "nodemailer";

export function getLogoAttachment() {
  return {
    filename: "georgiekinslogo.png",
    path: path.join(process.cwd(), "public", "images", "Georgiekinslogo.png"),
    cid: "georgiekins-logo",
  };
}

export function renderEmailHtml({ heading, bodyHtml, footerNote }) {
  return `
  <div style="background:#DDECFA; padding:32px 16px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:480px; margin:0 auto; background:#FFF8F0; border:3px dashed #F2AFC2; border-radius:26px; padding:32px 28px;">
      <div style="text-align:center; margin-bottom:8px;">
        <img src="cid:georgiekins-logo" alt="Georgiekins" width="150" style="max-width:150px; height:auto;" />
      </div>
      <h1 style="font-size:22px; color:#6B4632; margin:18px 0 14px; text-align:center;">${heading}</h1>
      <div style="color:#2E4C7E; font-size:15px; line-height:1.65;">
        ${bodyHtml}
      </div>
      ${footerNote ? `<p style="color:#4B679B; font-size:13px; margin-top:22px; text-align:center;">${footerNote}</p>` : ""}
    </div>
    <p style="text-align:center; color:#4B679B; font-size:13px; margin-top:20px; letter-spacing:2px;">
      🐾 💗 🐾<br/>
      <span style="letter-spacing:normal;">Georgiekins · support@georgiekins.com</span>
    </p>
  </div>
  `;
}

export function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.FULFILLMENT_FROM_EMAIL,
  );
}

export function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASSWORD
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
        : undefined,
  });
}

export function getOwnerEmail() {
  return process.env.OWNER_NOTIFICATION_EMAIL || process.env.SMTP_USER;
}

export async function notifyOwner({ subject, html }) {
  const to = getOwnerEmail();
  if (!to) return;

  try {
    await getTransporter().sendMail({
      from: process.env.FULFILLMENT_FROM_EMAIL,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Owner notification email failed:", error.message);
  }
}
