import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const consultationRoles = [
  {
    title: 'Nanny',
    description: 'Discuss childcare needs such as children’s routines, feeding, school schedules, play, and whether live-in or live-out support suits your household.',
    link: '/nanny-agency-nairobi',
    linkText: 'Explore nanny placement',
  },
  {
    title: 'Househelp',
    description: 'Clarify household duties such as cleaning, laundry, ironing, meal preparation, and how often you need support.',
    link: '/house-help-nairobi',
    linkText: 'Explore househelp placement',
  },
  {
    title: 'Home caregiver',
    description: 'Talk through non-clinical daily assistance, companionship, mobility support, and routines. Medical decisions should be discussed with a qualified health professional.',
    link: '/services',
    linkText: 'Explore care services',
  },
  {
    title: 'House manager',
    description: 'Consider a coordination role for household routines, staff communication, inventory, shopping, and day-to-day organization.',
    link: '/house-manager-nairobi',
    linkText: 'Explore house management',
  },
]

const consultationSteps = [
  {
    number: '01',
    title: 'Share your situation',
    description: 'Tell us which tasks are becoming difficult, who needs support, and what a typical day looks like at home.',
  },
  {
    number: '02',
    title: 'Clarify the role and schedule',
    description: 'Discuss responsibilities, preferred working hours, live-in or live-out arrangements, location, and start date.',
  },
  {
    number: '03',
    title: 'Agree on next steps',
    description: 'We’ll explain the placement options to explore and confirm consultation scope, availability, and any fee before scheduling.',
  },
]

const consultationFaqs = [
  {
    question: 'Do I need to know which service to choose before requesting a consultation?',
    answer: 'No. Select Home-care consultation on the form and describe the tasks or support your household needs. The discussion can help clarify which staff role to explore.',
  },
  {
    question: 'Is this a medical or care-needs assessment?',
    answer: 'No. This consultation provides household placement guidance. It does not diagnose, assess clinical needs, or replace advice from a qualified health professional.',
  },
  {
    question: 'Does a consultation guarantee that a staff member is available?',
    answer: 'No. Availability depends on the role, location, schedule, and candidate availability. The team will confirm suitable options and timing after discussing your request.',
  },
]

export default function HomeCareConsultationPage() {
  return (
    <>
      <section className="section contact-page">
        <div className="container contact-grid">
          <div className="contact-copy">
            <span className="eyebrow">Home-care consultation in Nairobi</span>
            <h1>Find the right support for your home</h1>
            <p>
              When household needs overlap, it can be hard to know whether to look for a nanny, househelp, caregiver,
              or house manager. Talk through your routines and priorities with our placement team before choosing a role.
            </p>
            <ul className="contact-details">
              <li>Compare staff roles and household responsibilities</li>
              <li>Discuss schedules and live-in or live-out arrangements</li>
              <li>Clarify location, timing, and placement next steps</li>
            </ul>
            <p>This is placement guidance, not a medical assessment or emergency service.</p>
          </div>

          <div className="booking-card contact-card" id="consultation-request">
            <h2>Request a home-care consultation</h2>
            <p>Share a few details and we’ll follow up to discuss the request.</p>
            <LeadForm initialService="Home-care consultation" />
          </div>
        </div>
      </section>

      <section className="section consultation-guidance">
        <div className="container">
          <div className="section-head narrow">
            <span className="eyebrow">Choose the kind of support</span>
            <h2>Which home-care role could fit?</h2>
            <p>You don’t need to decide before speaking with us. These role descriptions can help you start thinking about the support your household needs.</p>
          </div>
          <div className="consultation-role-grid">
            {consultationRoles.map((role) => (
              <article className="consultation-role" key={role.title}>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
                <Link to={role.link}>{role.linkText}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section consultation-process">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">What to expect</span>
            <h2>How the consultation works</h2>
          </div>
          <ol className="consultation-steps">
            {consultationSteps.map((step) => (
              <li key={step.number}>
                <span className="consultation-step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section consultation-preparation">
        <div className="container section-grid">
          <div>
            <span className="eyebrow">Before you enquire</span>
            <h2>A few details can make the discussion more useful</h2>
          </div>
          <div>
            <p>Think about the support you need on a typical day. You can share:</p>
            <ul>
              <li>Household tasks and who needs care or assistance</li>
              <li>Preferred workdays, hours, and live-in or live-out arrangement</li>
              <li>Your area, likely start date, and budget range if known</li>
              <li>Any must-have experience or practical requirements for the role</li>
            </ul>
            <p>Only share information needed to discuss the placement. Please don’t include medical records or other sensitive documents in this form.</p>
            <Link to="#consultation-request" className="btn btn-primary">Request a consultation</Link>
          </div>
        </div>
      </section>

      <section className="section light-section consultation-faq">
        <div className="container">
          <div className="section-head narrow">
            <span className="eyebrow">Home-care consultation FAQs</span>
            <h2>Common questions before you enquire</h2>
          </div>
          <div className="consultation-faq-list">
            {consultationFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <p className="consultation-fee-note">Consultation availability, scope, and any fee will be confirmed before scheduling.</p>
        </div>
      </section>
    </>
  )
}
