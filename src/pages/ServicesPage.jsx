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
          <h1>Nanny, Househelp &amp; Caregiver Services in Nairobi</h1>
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

        <section className="expat-staffing" aria-labelledby="expat-staffing-title">
          <div className="expat-staffing-copy">
            <span className="eyebrow">For expatriate households</span>
            <h2 id="expat-staffing-title">Household staffing for expatriate families in Nairobi</h2>
            <p>
              Settling into a new city can mean learning a new rhythm at home, too. We help expatriate and
              international families explore local nanny, caregiver, househelp, and house manager placements
              based on their household routine, schedule, and expectations.
            </p>
            <p>
              Tell us about the role, duties, working arrangement, and communication preferences that matter
              to your family. We can discuss candidate experience and screening information, then confirm
              availability and next steps with you. Families remain involved in interviews and should agree
              on duties and employment terms directly before a placement.
            </p>
            <Link to="/contact" className="btn btn-primary">Discuss your household needs</Link>
          </div>
          <figure className="expat-staffing-image">
            <img
              src="/images/team/susan-house-manager.jpg"
              alt="A Sashley household professional planning home routines"
              width="800"
              height="1200"
              loading="lazy"
            />
            <figcaption>Thoughtful household support, tailored to your family</figcaption>
          </figure>
        </section>
      </div>
    </section>
  )
}
