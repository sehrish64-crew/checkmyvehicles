import nodemailer from 'nodemailer';
import { z } from 'zod';

export const runtime = 'nodejs';

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  phoneNumber: z
    .string()
    .trim()
    .min(8)
    .max(20),
  vehicleType: z.enum([
    'Car',
    'SUV',
    'Van',
    'Truck',
    'Caravan',
    'Campervan',
    'Boat',
    'ATV',
    'Motorcycle',
    'Other',
  ]),
  vinOrPlate: z.string().trim().min(4).max(18),
  city: z.string().trim().min(2).max(40),
  packageId: z.enum(['standard', 'premium']),
});

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, 'utf8') > 16_384) {
    return Response.json({ error: 'Request body is too large' }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ error: 'Please provide valid checkout details' }, { status: 422 });
  }

  const smtpPassword = process.env.SMTP_PASSWORD;
  if (!smtpPassword) {
    console.error('Checkout email delivery failed: SMTP_PASSWORD is not configured.');
    return Response.json(
      { error: 'Email is not configured. Please try again later.' },
      { status: 503 },
    );
  }

  const { fullName, phoneNumber, vehicleType, vinOrPlate, city, packageId } = parsed.data;
  const packageName = packageId === 'standard' ? 'Standard Package' : 'Premium Package';
  const safeFullName = escapeHtml(fullName);
  const safePhoneNumber = escapeHtml(phoneNumber);
  const safeVehicleType = escapeHtml(vehicleType);
  const safeVinOrPlate = escapeHtml(vinOrPlate);
  const safeCity = escapeHtml(city);
  const smtpUsername = process.env.SMTP_USERNAME || 'autoscanora@gmail.com';
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: { user: smtpUsername, pass: smtpPassword },
  });

  try {
    await transporter.sendMail({
      from: `"Website Checkout" <${smtpUsername}>`,
      to: process.env.CONTACT_TO_EMAIL || 'autoscanora@gmail.com',
      subject: `New checkout entry - ${fullName}`,
      text: [
        'NEW VEHICLE REPORT REQUEST',
        'CheckMyVehicles website checkout',
        '',
        'CUSTOMER DETAILS',
        `Full name: ${fullName}`,
        `Mobile number: ${phoneNumber}`,
        `City: ${city}`,
        `Vehicle type: ${vehicleType}`,
        '',
        'VEHICLE DETAILS',
        `VIN / number plate: ${vinOrPlate}`,
        '',
        'SELECTED PACKAGE',
        packageName,
        '',
        'Submitted via checkmyvehicles.com',
      ].join('\n'),
      html: `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>New vehicle report request</title>
            <style>
              @media only screen and (max-width: 480px) {
                .vehicle-section { padding-right: 20px !important; padding-left: 20px !important; }
              }
            </style>
          </head>
          <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
            <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
              New vehicle report request from ${safeFullName}.
            </div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f1f5f9;">
              <tr>
                <td align="center" style="padding:32px 16px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
                    <tr>
                      <td style="padding:28px 32px;background-color:#0f172a;">
                        <p style="margin:0 0 8px;color:#7dd3fc;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">CheckMyVehicles</p>
                        <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.3;">New vehicle report request</h1>
                        <p style="margin:10px 0 0;color:#cbd5e1;font-size:14px;line-height:1.5;">A customer has submitted their details for a vehicle check.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:28px 32px 12px;">
                        <p style="margin:0 0 14px;color:#64748b;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Customer details</p>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                          <tr>
                            <td style="padding:13px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;width:38%;">Full name</td>
                            <td style="padding:13px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;font-weight:bold;">${safeFullName}</td>
                          </tr>
                          <tr>
                            <td style="padding:13px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Mobile number</td>
                            <td style="padding:13px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;">${safePhoneNumber}</td>
                          </tr>
                          <tr>
                            <td style="padding:13px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Vehicle type</td>
                            <td style="padding:13px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;">${safeVehicleType}</td>
                          </tr>
                          <tr>
                            <td style="padding:13px 0;color:#64748b;font-size:14px;">City</td>
                            <td style="padding:13px 0;color:#0f172a;font-size:14px;">${safeCity}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td class="vehicle-section" style="padding:12px 32px 24px;">
                        <p class="vehicle-heading" style="margin:0 0 14px;color:#64748b;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Vehicle details</p>
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                          <tr>
                            <td style="padding:12px 14px;">
                              <p style="margin:0 0 5px;color:#64748b;font-size:11px;line-height:1.4;">VIN / Number Plate</p>
                              <p style="margin:0;color:#0f172a;font-size:13px;line-height:1.4;font-weight:bold;letter-spacing:0.3px;white-space:nowrap;">${safeVinOrPlate}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 32px 28px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#eff6ff;border:1px solid #dbeafe;border-radius:10px;">
                          <tr>
                            <td style="padding:16px;">
                              <p style="margin:0 0 5px;color:#1d4ed8;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Selected package</p>
                              <p style="margin:0;color:#0f172a;font-size:16px;font-weight:bold;">${packageName}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:18px 24px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
                        <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.5;">Automated notification from <span style="color:#64748b;">checkmyvehicles.com</span></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error(
      'Checkout email delivery failed:',
      error instanceof Error ? error.message : 'Unknown email error',
    );
    return Response.json(
      { error: 'Your details could not be emailed. Please try again.' },
      { status: 503 },
    );
  }

  return Response.json({ success: true });
}
