import { Link } from 'react-router-dom'
import { servicePages } from '../config/services'
import RelatedServices from '../components/RelatedServices'

export default function ServiceDetailPage({ slug }) {
  const service = servicePages[slug] || servicePages['nanny-agency-nairobi']

  return (
    <section className="page-shell service-detail">
      <div className="page-content">
        <div className="policy-meta">{service.eyebrow}</div>
        <h1>{service.h1}</h1>
        <p>{service.intro}</p>

        {service.sections.map((section) => (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            {section.text && <p>{section.text}</p>}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {slug === 'nanny-agency-nairobi' && (
          <section className="placement-cost-summary">
            <h2>Understanding nanny placement costs in Nairobi</h2>
            <p>
              A nanny’s agreed pay and an agency placement fee are separate costs. Your quote may depend on
              experience, duties, working hours, location, and whether you need a live-in or live-out arrangement.
              Ask what services the agency fee covers and confirm payment and replacement terms in writing.
            </p>
            <Link to="/blog/nanny-placement-costs-nairobi">Read our guide to nanny placement costs</Link>
            <p>Contact us with your household needs for a current quote; fees and terms should be confirmed for each enquiry.</p>
          </section>
        )}

        <div className="cta-box">
          <h3>Talk to us today</h3>
          <p>Let us help you match with the right support for your home and family needs.</p>
          <Link to="/contact" className="btn btn-primary">Request a consultation</Link>
        </div>
        <RelatedServices current={`/${slug}`} />
      </div>
    </section>
  )
}
