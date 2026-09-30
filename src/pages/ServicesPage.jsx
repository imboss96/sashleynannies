import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Nanny Agency Nairobi',
    description: 'Vetted childcare professionals for families looking for trusted, safe support in Nairobi.',
    to: '/nanny-agency-nairobi',
  },
  {
    title: 'House Help Nairobi',
    description: 'Reliable cleaning, laundry, meal prep, and household support for busy homes.',
    to: '/house-help-nairobi',
  },
  {
    title: 'Live-in Nanny Nairobi',
    description: 'Full-time in-home childcare support for families needing continuous care.',
    to: '/live-in-nanny-nairobi',
  },
  {
    title: 'Live-out Nanny Nairobi',
    description: 'Daytime childcare and household support without a live-in arrangement.',
    to: '/live-out-nanny-nairobi',
  },
  {
    title: 'House Manager Nairobi',
    description: 'Experienced domestic coordination for smooth-running homes and large households.',
    to: '/house-manager-nairobi',
  },
]

export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head narrow">
          <span className="eyebrow">Our Services</span>
          <h2>Domestic staffing for every household need</h2>
        </div>

        <div className="card-grid">
          {services.map((service) => (
            <article className="info-card" key={service.to}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to={service.to} className="btn btn-secondary">Learn more</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
