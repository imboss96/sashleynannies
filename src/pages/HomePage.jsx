import LeadForm from '../components/LeadForm'
import { Link } from 'react-router-dom'

const featureList = [
  {
    title: 'Rigorous vetting and screening',
    description: 'Candidates go through interviews, reference checks, and background review, including DCI verification. Ask us which checks have been completed for a profile before proceeding.',
  },
  {
    title: 'Fast 24-48 hour turnaround',
    description: 'After we understand your role, location, and schedule, we aim to share suitable profiles within 24 to 48 hours. Timing depends on the requirements and candidate availability.',
  },
  {
    title: 'Warm, family-first matching',
    description: 'We consider your children’s ages, household routine, duties, schedule, and preferred working arrangement so you can review candidates against your actual needs.',
  },
  {
    title: 'Ongoing client support after placement',
    description: 'We remain available for follow-up as your household settles into the placement. Ask us for the current replacement-support terms and what they cover before you decide.',
  },
]

const processSteps = [
  { step: '01', icon: 'application', title: 'Tell us about your household', text: 'Share the role you need, children or household requirements, Nairobi location, schedule, and preferred start date.' },
  { step: '02', icon: 'phone', title: 'We clarify the role', text: 'Our team discusses the responsibilities, experience, availability, and expectations needed for a suitable match.' },
  { step: '03', icon: 'interview', title: 'Review suitable profiles', text: 'We identify available candidates whose experience and working arrangements align with your request.' },
  { step: '04', icon: 'verification', title: 'Interview before you decide', text: 'Speak with candidates, ask role-specific questions, and review the relevant screening and reference information before agreeing on a placement.' },
]

function ProcessStepIcon({ type }) {
  const shared = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (type === 'application') return <svg {...shared}><path d="M7 3.75h7l4 4V20a.75.75 0 0 1-.75.75h-10.5A.75.75 0 0 1 6 20V4.5a.75.75 0 0 1 .75-.75Z" /><path d="M14 4v4h4M9 12h6M9 15.5h6M9 19l1.5 1.5L14 17" /></svg>
  if (type === 'phone') return <svg {...shared}><path d="M7.2 3.5h2.3l1.2 4.2-1.8 1.5a15 15 0 0 0 5.9 5.9l1.5-1.8 4.2 1.2v2.3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 5.2 5.7a2 2 0 0 1 2-2.2Z" /><path d="M15.5 4.5a5 5 0 0 1 4 4M15.5 1.5a8 8 0 0 1 7 7" /></svg>
  if (type === 'interview') return <svg {...shared}><circle cx="9" cy="8" r="3" /><path d="M3 19a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 5M15.5 2.5h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1l-2 2v-2h-2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" /></svg>
  return <svg {...shared}><path d="M12 2.8 19 5v5.2c0 4.7-2.9 8.5-7 11-4.1-2.5-7-6.3-7-11V5l7-2.2Z" /><path d="m8.8 11.8 2.1 2.1 4.5-4.5M8 6.5c1.2-.4 2.5-.7 4-.7s2.8.3 4 .7" /></svg>
}

const homeServices = [
  {
    title: 'Nanny placement in Nairobi',
    description: 'Get help finding childcare support that fits your children’s ages, daily routine, schedule, and household expectations.',
    to: '/nanny-agency-nairobi',
    linkText: 'Explore nanny placements',
  },
  {
    title: 'Live-in nanny',
    description: 'Discuss an in-home arrangement for families who need consistent childcare support and have agreed on accommodation and working expectations.',
    to: '/live-in-nanny-nairobi',
    linkText: 'Learn about live-in nannies',
  },
  {
    title: 'Live-out nanny',
    description: 'Find daytime childcare for school routines, play, meals, and agreed family tasks without live-in accommodation.',
    to: '/live-out-nanny-nairobi',
    linkText: 'Learn about live-out nannies',
  },
  {
    title: 'Househelp',
    description: 'Arrange household support such as cleaning, laundry, meal preparation, or childcare assistance, with duties agreed before placement.',
    to: '/house-help-nairobi',
    linkText: 'Explore househelp placements',
  },
  {
    title: 'House manager',
    description: 'Consider a household coordination role for routines, schedules, staff communication, and day-to-day home organization.',
    to: '/house-manager-nairobi',
    linkText: 'Explore house manager placements',
  },
  {
    title: 'Caregiver and specialist care enquiries',
    description: 'Tell us about a care need outside standard nanny or househelp duties so we can discuss the role and available options.',
    to: '/services',
    linkText: 'Discuss care service options',
  },
]

const staffPreviews = [
  {
    alias: 'Mary N.',
    initials: 'MN',
    role: 'Professional Nanny',
    experience: 'Newborn and infant care, school routines, feeding, and play-based learning.',
    image: '/images/team/mary-nanny.jpg',
  },
  {
    alias: 'Kevin W.',
    initials: 'JW',
    role: 'Professional Housekeeper',
    experience: 'Deep cleaning, laundry and ironing, kitchen hygiene, and home organization.',
    image: '/images/team/jane-housekeeper.jpg',
  },
  {
    alias: 'Grace A.',
    initials: 'GA',
    role: 'Home Caregiver',
    experience: 'Elderly care, companionship, meal preparation, mobility support, and medication reminders.',
    image: '/images/team/grace-caregiver.jpg',
  },
  {
    alias: 'Susan K.',
    initials: 'SK',
    role: 'Professional House Manager',
    experience: 'Household organization, staff coordination, inventory, and shopping management.',
    image: '/images/team/susan-house-manager.jpg',
  },
]

const testimonials = [
  {
    quote: 'The process felt organized from day one. The team listened carefully and introduced us to a caregiver who fit naturally into our routine.',
    name: 'Karen, Nairobi',
  },
  {
    quote: 'We appreciated the screening and the follow-up. We had time to ask questions and make a confident, informed choice for our home.',
    name: 'Westlands, Nairobi',
  },
  {
    quote: 'Communication was prompt and professional, and the profiles presented were relevant to our needs and family schedule.',
    name: 'Lavington, Nairobi',
  },
]

const faqs = [
  {
    q: 'How does your nanny and caregiver screening work?',
    a: 'The process includes candidate interviews, reference checks, and background review, including DCI verification. Ask our team which checks have been completed for a candidate before you proceed.',
  },
  {
    q: 'How soon can I find a nanny or househelp in Nairobi?',
    a: 'We aim to share suitable profiles within 24 to 48 hours after understanding your request. Timing depends on the role, schedule, location, and candidate availability, so confirm the expected timeline with our team.',
  },
  {
    q: 'Which areas of Nairobi do you serve?',
    a: 'We welcome enquiries from across Nairobi, including Kilimani, Westlands, Karen, Lavington, and Nairobi CBD. Share your estate and schedule so we can confirm availability for your request.',
  },
  {
    q: 'What is the difference between a live-in and live-out nanny?',
    a: 'A live-in nanny stays in the employer’s home under agreed accommodation and working arrangements. A live-out nanny travels to work for agreed hours and does not live in the home. Discuss schedules, duties, time off, and expectations before hiring.',
  },
  {
    q: 'How much does it cost to hire a nanny or househelp?',
    a: 'Placement and employment costs depend on the role, schedule, experience, and household requirements. Contact us for a current quote and confirm which agency and employment costs apply before making a decision.',
  },
  {
    q: 'Do you offer replacement support after placement?',
    a: 'The agency advertises a 30-day replacement support period. Ask for the current written terms, including eligibility and what the replacement covers, before confirming a placement.',
  },
  {
    q: 'How do I apply for a nanny or caregiver job?',
    a: 'Visit our Careers page for current candidate application information. The homepage booking form is for families and employers looking to hire staff.',
  },
  {
    q: 'Where is the Sashley Nannies office?',
    a: 'The office is at The Delta House, 3rd Floor, Room 326, University Way, Nairobi. Contact the team before visiting to confirm availability.',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="badge">Nairobi&apos;s Most Trusted Agency</span>
            <h1>Vetted Nannies, Househelps &amp; Caregivers in Nairobi</h1>
            <p>
              Looking for a reliable nanny agency in Nairobi? Sashley Nannies helps families hire trusted,
              safety-focused domestic staff with fast matching, DCI screening, and thoughtful guidance.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary large">Find a Helper Today</a>
              <a href="/vetting-process" className="btn btn-secondary large">See How We Vet</a>
            </div>

            <div className="proof-row">
              <div><strong>1,200+</strong> Placements</div>
              <div><strong>100%</strong> DCI Checked</div>
              <div><strong>30-Day</strong> Replacement</div>
            </div>
          </div>

          <aside className="booking-card" id="contact">
            <h3>Book a Vetted Service Provider</h3>
            <p>For families and employers hiring domestic staff.</p>
            <LeadForm />
          </aside>
        </div>
      </section>

      <section className="section light-section" id="about">
        <div className="container section-grid">
          <div>
            <span className="eyebrow">About Us</span>
            <h2>About Sashley Nannies &amp; Caregivers</h2>
          </div>
          <div>
            <p>
              Choosing the right caregiver is one of the most personal and important decisions a family can make.
              At Sashley Nannies, we match busy households with professionals who are not only experienced, but also
              calm, trustworthy, and genuinely aligned with your home routines.
            </p>
            <p>
              From live-in childcare to executive home support, every placement is built around your family&apos;s values,
              household flow, and daily rhythm so you feel confident from the first consultation onward.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="why-us">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Why Families Choose Sashley</span>
            <h2>Thoughtful matching, safety, and peace of mind</h2>
          </div>
          <div className="feature-grid feature-grid-4">
            {featureList.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">✓</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section" id="vetting">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Screening Process</span>
            <h2>Our 4-step vetting guarantee</h2>
          </div>
          <div className="steps-grid">
            {processSteps.map((item) => (
              <article className="step-card" key={item.step}>
                <div className="step-card-heading">
                  <span className="step-card-icon"><ProcessStepIcon type={item.icon} /></span>
                  <span className="step-card-number">STEP {item.step}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Nanny and Household Staffing</span>
            <h2>Find the right home support in Nairobi</h2>
            <p>Choose a role to see what the placement involves, then tell us about your household and preferred schedule.</p>
          </div>
          <div className="service-grid">
            {homeServices.map((service) => (
              <article className="service-card" key={service.to}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service.to} className="service-link">{service.linkText}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section" id="meet-our-team">
        <div className="container">
          <div className="section-head center team-section-head">
            <span className="eyebrow">Care professionals</span>
            <h2>Meet Our Team</h2>
            <p>These profile details and portraits are shared with each person’s permission. Availability and role fit are confirmed when you enquire.</p>
          </div>
          <div className="team-grid">
            {staffPreviews.map((person) => (
              <article className="team-card" key={person.alias}>
                <div className="team-portrait">
                  <span className="team-initials" aria-hidden="true">{person.initials}</span>
                  <img
                    src={person.image}
                    alt={`Portrait for ${person.role}, shared with permission`}
                    loading="lazy"
                    onError={(event) => { event.currentTarget.hidden = true }}
                  />
                  <span className="team-screening-label">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="m5 10.2 3.2 3.1L15.3 6" />
                    </svg>
                    Good Conduct issued
                  </span>
                  <div className="team-person-overlay">
                    <span className="team-role-overlay">{person.role}</span>
                    <span className="team-profile-name">
                      {person.alias}
                      <span className="team-verified-check" role="img" aria-label="Verified profile">
                        <svg viewBox="0 0 20 20" aria-hidden="true">
                          <path d="m5 10.2 3.2 3.1L15.3 6" />
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="team-card-content">
                  <p className="team-experience">{person.experience}</p>
                  <ul className="team-check-list" aria-label="Completed screening checks">
                    {['DCI', 'References', 'Training'].map((check) => (
                      <li key={check}><span aria-hidden="true">✓</span>{check}</li>
                    ))}
                  </ul>
                  <div className="team-actions">
                    <Link to="/vetting-process" className="team-secondary-link">View screening process</Link>
                    <a
                      className="btn btn-primary team-contact-button"
                      href={`https://wa.me/254741448680?text=${encodeURIComponent(`Hello, I would like to ask about ${person.alias} and current availability.`)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ask about profile
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section" id="service-areas">
        <div className="container section-grid">
          <div>
            <span className="eyebrow">Nairobi, Kenya</span>
            <h2>Local household staffing, matched to your area</h2>
          </div>
          <div>
            <p>
              Sashley Nannies receives enquiries from families across Nairobi, including Kilimani, Westlands, Karen,
              Lavington, and Nairobi CBD. Candidate availability can vary by location, role, and working hours.
            </p>
            <p>
              When you enquire, include your estate, the type of support you need, your preferred start date, and the
              schedule you have in mind. This helps the team discuss suitable candidates and practical expectations
              before interviews.
            </p>
            <Link to="/contact" className="btn btn-secondary">Ask about your location</Link>
          </div>
        </div>
      </section>

      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Trusted by Nairobi Families</span>
            <h2>Families choose us for clarity, quality, and care</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.name}>
                <div className="stars">★★★★★</div>
                <p>“{item.quote}”</p>
                <strong>{item.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section" id="faq">
        <div className="container faq-container">
          <div className="section-head">
            <span className="eyebrow">Frequently Asked Questions</span>
            <h2>Everything you need to know</h2>
            <div className="faq-consultation">
              <span className="eyebrow">Home-care consultation</span>
              <h3>Not sure which support your household needs?</h3>
              <p>Talk through your day-to-day needs with our team. We can help you compare nanny, househelp, caregiver, and house manager roles.</p>
              <ul>
                <li>Household tasks and level of support</li>
                <li>Live-in or live-out arrangements and schedule</li>
                <li>Nairobi location and preferred start date</li>
              </ul>
              <p className="faq-consultation-note">This is placement guidance, not a medical assessment. We’ll confirm consultation availability, scope, and any fee before scheduling.</p>
              <Link to="/home-care-consultation" className="btn btn-primary">Request a consultation</Link>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item" open={item.q === faqs[0].q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
