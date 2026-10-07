import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

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
