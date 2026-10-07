import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, household, location, startDate, budget, message } = req.body || {}

  if (!name || !email || !phone || !service || !household || !location || !startDate || !budget) {
    return res.status(400).json({ message: 'Please fill in all required fields.' })
  }

  const apiKey = process.env.BREVO_API_KEY
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'app.sashley@connectfy.tech'
  if (!apiKey || !senderEmail) {
    return res.status(503).json({
      message: 'Email delivery is not configured. Add your Brevo API key and verified sender email to the server environment.',
    })
  }

  const bookingDetails = [
    ['Client name', name],
    ['Email address', email],
    ['Phone number', phone],
    ['Service requested', service],
    ['Household setup', household],
    ['Location', location],
    ['Preferred start date', startDate],
    ['Monthly budget', budget],
  ]
  const detailsRows = bookingDetails.map(([label, value], index) => `
    <tr>
      <td style="padding:12px 14px;border-bottom:1px solid #eee8ed;color:#687386;font-size:14px;${index % 2 ? 'background:#fff;' : 'background:#fbf8fa;'}">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #eee8ed;color:#222b4b;font-size:14px;font-weight:600;${index % 2 ? 'background:#fff;' : 'background:#fbf8fa;'}">${escapeHtml(value)}</td>
    </tr>
  `).join('')
  const messageHtml = escapeHtml(message || 'No additional message').replace(/\n/g, '<br>')

  const emailHtml = `
    <!doctype html>
    <html lang="en">
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;padding:0;background-color:#f5f3f5;font-family:Arial,Helvetica,sans-serif;color:#222b4b;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f5f3f5;padding:28px 12px;">
          <tr><td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border:1px solid #ebe5ea;border-radius:14px;overflow:hidden;">
              <tr><td style="height:7px;background:#c52c68;font-size:0;line-height:0;">&nbsp;</td></tr>
              <tr><td align="center" style="padding:24px 28px 20px;background:#29245f;">
                <img src="https://www.sashleynannies.co.ke/logo.png" width="90" alt="Sashley Nannies" style="display:block;width:90px;height:auto;max-height:90px;object-fit:contain;border:0;margin:0 auto 10px;background:#ffffff;border-radius:10px;">
                <div style="color:#ffffff;font-size:21px;font-weight:700;letter-spacing:.2px;">Sashley Nannies</div>
                <div style="padding-top:4px;color:#f6b5cf;font-size:13px;">Your Trusted Go-To Nanny</div>
              </td></tr>
              <tr><td style="padding:28px 30px 12px;">
                <div style="color:#c52c68;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">New booking request</div>
                <h1 style="margin:8px 0 8px;color:#29245f;font-size:25px;line-height:1.25;">A family has requested a match</h1>
                <p style="margin:0;color:#687386;font-size:14px;line-height:1.6;">Review the details below to contact the client directly.</p>
              </td></tr>
              <tr><td style="padding:16px 30px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #eee8ed;border-collapse:collapse;">
                  ${detailsRows}
                </table>
              </td></tr>
              <tr><td style="padding:18px 30px 28px;">
                <div style="margin-bottom:8px;color:#29245f;font-size:14px;font-weight:700;">Additional details from the client</div>
                <div style="padding:14px 16px;border-left:3px solid #f26136;border-radius:5px;background:#fff7f2;color:#414b61;font-size:14px;line-height:1.65;">${messageHtml}</div>
              </td></tr>
              <tr><td style="padding:18px 28px;background:#f8f5f7;text-align:center;border-top:1px solid #eee8ed;">
                <div style="color:#29245f;font-size:13px;font-weight:700;">Sashley Nannies &amp; Caregivers Agency</div>
                <div style="padding-top:5px;color:#687386;font-size:12px;line-height:1.6;">The Delta House, 3rd Floor, Room 326, University Way, Nairobi<br><a href="mailto:info@sashleynannies.co.ke" style="color:#a51e55;text-decoration:none;">info@sashleynannies.co.ke</a> &nbsp;|&nbsp; <a href="tel:+254741448680" style="color:#a51e55;text-decoration:none;">+254 741 448 680</a></div>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>
  `

  const emailText = [
    'New Domestic Staff Enquiry',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Household: ${household}`,
    `Location: ${location}`,
    `Preferred start date: ${startDate}`,
    `Monthly budget: ${budget}`,
    `Message: ${message || 'No additional message'}`,
  ].join('\n')

  try {
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: process.env.BREVO_SENDER_NAME || 'Sashley Nannies',
          email: senderEmail,
        },
        to: [{ email: process.env.CONTACT_EMAIL || 'info@sashleynannies.co.ke' }],
        subject: `New enquiry: ${service} request`,
        htmlContent: emailHtml,
        textContent: emailText,
      }),
    })

    const brevoResult = await brevoResponse.json().catch(() => ({}))
    if (!brevoResponse.ok) {
      throw new Error(brevoResult.message || `Brevo returned HTTP ${brevoResponse.status}`)
    }

    return res.json({
      message: 'Your request has been submitted successfully. We will contact you soon.',
    })
  } catch (error) {
    console.error('Email send failed:', error)
    return res.status(502).json({
      message: 'We could not send your request right now. Please try again or contact us on WhatsApp.',
    })
  }
})

app.listen(port, () => {
  console.log(`Express API running on http://localhost:${port}`)
})
