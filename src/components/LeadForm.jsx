import { useRef, useState } from 'react'

const initialForm = {
  service: '',
  household: '',
  location: '',
  startDate: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  message: '',
  isEmployer: false,
  privacyConsent: false,
}

const stepTitles = ['Service details', 'Location & budget', 'Contact details']

const nairobiLocations = [
  'Adams Arcade', 'Airbase', 'Bahati', 'Buru Buru', 'CBD / City Centre', 'Clay City',
  'Dagoretti', 'Dagoretti Corner', 'Dandora', 'Donholm', 'Eastleigh', 'Embakasi', 'Fedha',
  'Garden Estate', 'Githogoro', 'Githurai', 'Gigiri', 'Golf Course', 'Hardy', 'Highridge',
  'Hurlingham', 'Huruma', 'Imara Daima', 'Industrial Area', 'Jamhuri', 'Kahawa', 'Kahawa West',
  'Kangemi', 'Karen', 'Kariobangi', 'Kasarani', 'Kawangware', 'Kayole', 'Kiambu Road', 'Kibera',
  'Kileleshwa', 'Kilimani', 'Kitisuru', 'Komarock', 'Kyuna', 'Langata', 'Lavington', 'Loresho', 'Lower Kabete',
  'Madaraka', 'Mathare', 'Mbagathi', 'Mihango', 'Mirema', 'Mountain View', 'Muthaiga',
  'Muthaiga North', 'Mwiki', 'Nairobi West', 'Ngara', 'Ngong Road', 'Njiru', 'Nyayo Estate',
  'Nyari', 'Parklands', 'Pangani', 'Peponi', 'Pipeline', 'Ridgeways', 'Riruta', 'Riverside', 'Rosslyn', 'Roysambu',
  'Runda', 'Runda Mumwe', 'South B', 'South C', 'Spring Valley', 'Tassia', 'Thigiri', 'Thome',
  'Umoja', 'Upper Hill', 'Utawala', 'Waithaka', 'Westlands', 'Zimmerman',
]

const nearbyLocations = [
  { area: 'Athi River', county: 'Machakos County' },
  { area: 'Katani', county: 'Machakos County' },
  { area: 'Mavoko', county: 'Machakos County' },
  { area: 'Mlolongo', county: 'Machakos County' },
  { area: 'Syokimau', county: 'Machakos County' },
  { area: 'Banana Hill', county: 'Kiambu County' },
  { area: 'Gachie', county: 'Kiambu County' },
  { area: 'Gitaru', county: 'Kiambu County' },
  { area: 'Juja', county: 'Kiambu County' },
  { area: 'Kabete', county: 'Kiambu County' },
  { area: 'Kahawa Sukari', county: 'Kiambu County' },
  { area: 'Kiamumbi', county: 'Kiambu County' },
  { area: 'Kiambu Town', county: 'Kiambu County' },
  { area: 'Kikuyu', county: 'Kiambu County' },
  { area: 'Kinoo', county: 'Kiambu County' },
  { area: 'Limuru', county: 'Kiambu County' },
  { area: 'Migaa', county: 'Kiambu County' },
  { area: 'Ruiru / Membley', county: 'Kiambu County' },
  { area: 'Kamakis', county: 'Kiambu County' },
  { area: 'Muchatha', county: 'Kiambu County' },
  { area: 'Ndenderu', county: 'Kiambu County' },
  { area: 'Northlands City, Ruiru', county: 'Kiambu County' },
  { area: 'Ruiru', county: 'Kiambu County' },
  { area: 'Ruaka', county: 'Kiambu County' },
  { area: 'Tatu City, Ruiru', county: 'Kiambu County' },
  { area: 'Thika', county: 'Kiambu County' },
  { area: 'Thindigua', county: 'Kiambu County' },
  { area: 'Uthiru', county: 'Kiambu County' },
  { area: 'Wangige', county: 'Kiambu County' },
  { area: 'Rironi', county: 'Kiambu County' },
  { area: 'Kandisi', county: 'Kajiado County' },
  { area: 'Kiserian', county: 'Kajiado County' },
  { area: 'Kitengela', county: 'Kajiado County' },
  { area: 'Kisaju', county: 'Kajiado County' },
  { area: 'Matasia', county: 'Kajiado County' },
  { area: 'Ngong', county: 'Kajiado County' },
  { area: 'Nkaimurunya', county: 'Kajiado County' },
  { area: 'Ongata Rongai', county: 'Kajiado County' },
  { area: 'Oloolua', county: 'Kajiado County' },
  { area: 'Olooloitikosh', county: 'Kajiado County' },
  { area: 'Olkeri', county: 'Kajiado County' },
  { area: 'Olekasasi', county: 'Kajiado County' },
  { area: 'Embulbul', county: 'Kajiado County' },
  { area: 'Champagne Ridge', county: 'Kajiado County' },
  { area: 'Rimpa', county: 'Kajiado County' },
  { area: 'Tuala', county: 'Kajiado County' },
  { area: 'Greenpark Estate, Athi River', county: 'Machakos County' },
  { area: 'Lukenya', county: 'Machakos County' },
]

function loadServiceLocations() {
  return [
    ...nairobiLocations,
    ...nearbyLocations.map(({ area, county }) => `${area}, ${county}`),
  ]
}

export default function LeadForm({ initialService = '' }) {
  const initialValues = { ...initialForm, service: initialService }
  const [form, setForm] = useState(initialValues)
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const stepRef = useRef(null)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const continueToNextStep = () => {
    const invalidField = stepRef.current?.querySelector(':invalid')
    if (invalidField) {
      invalidField.reportValidity()
      return
    }
    setStatus({ type: '', message: '' })
    setStep((current) => Math.min(current + 1, stepTitles.length - 1))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('https://api.sashleynannies.co.ke/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          household: form.household,
          location: form.location,
          startDate: form.startDate,
          budget: form.budget,
          message: form.message,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to submit your request right now.')

      setStatus({ type: 'success', message: data.message || 'Your request has been submitted successfully.' })
      setForm(initialValues)
      setStep(0)
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong while sending your request.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status.type === 'success') {
    return (
      <div className="booking-success" role="status" aria-live="polite">
        <span className="booking-success-icon" aria-hidden="true">✓</span>
        <h4>Request received</h4>
        <p>{status.message}</p>
        <button className="btn btn-secondary" type="button" onClick={() => setStatus({ type: '', message: '' })}>Send another request</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="lead-form lead-wizard">
      <div className="booking-progress" role="group" aria-label={`Step ${step + 1} of ${stepTitles.length}: ${stepTitles[step]}`}>
        {stepTitles.map((title, index) => (
          <div className={`booking-progress-step${index === step ? ' is-current' : ''}${index < step ? ' is-complete' : ''}`} key={title}>
            <span>{index < step ? '✓' : index + 1}</span>
            <small>{title}</small>
          </div>
        ))}
      </div>

      {step === 0 && (
        <section className="booking-step" ref={stepRef} aria-labelledby="booking-step-1">
          <h4 id="booking-step-1">Step 1 of 3: What support do you need?</h4>
          <label>
            Service Required
            <select name="service" value={form.service} onChange={handleChange} required>
              <option value="">Select service</option>
              <option value="Live-in Nanny">Live-in Nanny</option>
              <option value="Live-out Nanny">Live-out Nanny</option>
              <option value="Babysitter">Babysitter</option>
              <option value="Househelp">Househelp</option>
              <option value="Caregiver">Elderly Caregiver</option>
              <option value="House Manager">House Manager</option>
              <option value="Home-care consultation">Home-care consultation</option>
            </select>
          </label>
          <label>
            Household Setup
            <select name="household" value={form.household} onChange={handleChange} required>
              <option value="">Select household size</option>
              <option value="1 Child">1 Child</option>
              <option value="2 Children">2 Children</option>
              <option value="3+ Children">3+ Children</option>
              <option value="Adults / Elderly Only">Adults / Elderly Only</option>
            </select>
          </label>
          <button className="btn btn-primary wizard-next" type="button" onClick={continueToNextStep}>Next: Location &amp; Budget <span aria-hidden="true">→</span></button>
        </section>
      )}

      {step === 1 && (
        <section className="booking-step" ref={stepRef} aria-labelledby="booking-step-2">
          <h4 id="booking-step-2">Step 2 of 3: Where and when?</h4>
          <label>
            Location (Nairobi &amp; nearby areas)
            <input name="location" list="nairobi-location-options" value={form.location} onChange={handleChange} placeholder="Type or choose an area" autoComplete="address-level2" required />
            <datalist id="nairobi-location-options">
              {loadServiceLocations().map((location) => <option key={location.trim()} value={location.trim()} />)}
            </datalist>
            <span className="location-help">Includes Nairobi, Kiambu, Kajiado, and nearby Machakos areas. You can also type another location.</span>
          </label>
          <label>
            Preferred Start Date
            <select name="startDate" value={form.startDate} onChange={handleChange} required>
              <option value="">Choose a start date</option>
              <option value="Immediately">Immediately</option>
              <option value="Within a week">Within a week</option>
              <option value="This month">This month</option>
              <option value="Flexible">I'm flexible</option>
            </select>
          </label>
          <label>
            Monthly Budget
            <select name="budget" value={form.budget} onChange={handleChange} required>
              <option value="">Choose a budget range</option>
              <option value="KES 12,000 - 15,000">KES 12,000 - 15,000</option>
              <option value="KES 15,000 - 20,000">KES 15,000 - 20,000</option>
              <option value="KES 20,000+">KES 20,000+</option>
              <option value="To be discussed">To be discussed</option>
            </select>
          </label>
          <div className="booking-step-actions">
            <button className="btn btn-secondary" type="button" onClick={() => setStep(0)}>Back</button>
            <button className="btn btn-primary" type="button" onClick={continueToNextStep}>Next: Contact Details <span aria-hidden="true">→</span></button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="booking-step" ref={stepRef} aria-labelledby="booking-step-3">
          <h4 id="booking-step-3">Step 3 of 3: How can we reach you?</h4>
          <label>
            Your Name
            <input autoComplete="name" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
          </label>
          <label>
            Email
            <input autoComplete="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </label>
          <label>
            WhatsApp / Phone Number
            <input autoComplete="tel" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="07XX XXX XXX" required />
          </label>
          <label>
            Additional Details <span className="optional-label">(optional)</span>
            <textarea name="message" value={form.message} onChange={handleChange} rows="3" placeholder="Tell us about your household's needs" />
          </label>
          <label className="booking-check">
            <input type="checkbox" name="isEmployer" checked={form.isEmployer} onChange={handleChange} required />
            <span>I am a client or employer looking to hire a service provider.</span>
          </label>
          <label className="booking-check">
            <input type="checkbox" name="privacyConsent" checked={form.privacyConsent} onChange={handleChange} required />
            <span>I have read and agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</a> and acknowledge the <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.</span>
          </label>
          <div className="booking-step-actions">
            <button className="btn btn-secondary" type="button" onClick={() => setStep(1)} disabled={isSubmitting}>Back</button>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting…' : 'Submit Booking Request'}</button>
          </div>
        </section>
      )}

      {status.type === 'error' && <div className="form-status error" role="alert">{status.message}</div>}
    </form>
  )
}
