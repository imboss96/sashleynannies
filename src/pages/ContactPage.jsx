import LeadForm from '../components/LeadForm'

export default function ContactPage() {
  return (
    <section className="section contact-page">
      <div className="container contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">Contact us</span>
          <h1>Talk to Sashley Nannies</h1>
          <p>
            Whether you want to hire a nanny, discuss a household requirement, or ask about our vetting process,
            we are ready to help you find the right fit.
          </p>
          <ul className="contact-details">
            <li><strong>Phone:</strong> +254 741 448 680</li>
            <li><strong>Email:</strong> info@sashleynannies.co.ke</li>
            <li><strong>Location:</strong> Nairobi, Kenya</li>
          </ul>
        </div>

        <div className="booking-card contact-card">
          <h3>Request a consultation</h3>
          <LeadForm />
        </div>
      </div>
    </section>
  )
}
