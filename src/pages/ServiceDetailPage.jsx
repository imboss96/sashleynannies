import { Link } from 'react-router-dom'

const servicePages = {
  'nanny-agency-nairobi': {
    title: 'Nanny Agency Nairobi – Trusted Childcare & Family Support',
    eyebrow: 'Nairobi, Kenya • Trusted Domestic Staffing Agency',
    intro:
      'If you are searching for a nanny agency in Nairobi, Sashley Nannies helps families find trustworthy childcare professionals who are experienced, background-checked, and ready to support their homes. From newborn care to school-age child support, we match you with the right person for your household.',
    sections: [
      {
        heading: 'Why families choose Sashley Nannies',
        text:
          'We understand that finding the right nanny is one of the biggest decisions for any family. That is why we work with vetted professionals who are evaluated for experience, reliability, and household compatibility. Whether you need a full-time live-in nanny or a daily caregiver, we help you find a safe and professional match.',
      },
      {
        heading: 'Our nanny services in Nairobi',
        list: ['Live-in nannies', 'Live-out nannies', 'Infant and toddler care', 'School-run support', 'Light housekeeping and family routines', 'Flexible support for busy working parents'],
      },
      {
        heading: 'How we match your family',
        text:
          'We pride ourselves on a careful matching process built around your family’s needs. We consider your children’s age, household setup, timing, and expectations before recommending suitable candidates. This helps ensure a smoother and safer hire for your home.',
      },
    ],
  },
  'house-help-nairobi': {
    title: 'House Help in Nairobi',
    eyebrow: 'Nairobi, Kenya • Domestic Staff',
    intro:
      'Looking for a house help in Nairobi? We connect families with vetted domestic staff who are experienced in cleaning, laundry, cooking, childcare assistance, and home management. Whether you need daily help or regular support, we help you find people who fit your home and routines.',
    sections: [
      {
        heading: 'Support for everyday home life',
        text:
          'A house help plays a critical role in maintaining order, cleanliness, and comfort in the home. We work with reliable domestic workers who are prepared to support families with general household tasks and daily care responsibilities.',
      },
      {
        heading: 'We match based on your home',
        list: ['Cleaning and laundry', 'Meal preparation', 'Childcare support', 'Home organization', 'Daily household routines', 'Family support and general care'],
      },
    ],
  },
  'live-in-nanny-nairobi': {
    title: 'Live-in Nanny in Nairobi',
    eyebrow: 'Nairobi, Kenya • Live-in Support',
    intro:
      'A live-in nanny in Nairobi can give your family dependable, around-the-clock support in the home. Whether you need help with newborn care, meal preparation, school routines, or daily household management, a live-in nanny can make family life more structured and less stressful.',
    sections: [
      {
        heading: 'When a live-in nanny is the right fit',
        text:
          'Our live-in nanny placement service is designed for families who want in-home support with consistency and reliability. We match families with vetted professionals who understand childcare routines, hygiene standards, and family responsibilities.',
      },
      {
        heading: 'What to expect',
        list: ['Families with infants or young children', 'Busy parents working long hours', 'Households needing daily childcare support', 'Families wanting help with routines and household continuity'],
      },
    ],
  },
  'live-out-nanny-nairobi': {
    title: 'Live-out Nanny in Nairobi',
    eyebrow: 'Nairobi, Kenya • Day Support',
    intro:
      'A live-out nanny in Nairobi is a practical option for families who need reliable childcare and support during the day without full-time in-house accommodation. These professionals help with infant care, routines, school pickups, household tasks, and daily family support.',
    sections: [
      {
        heading: 'Ideal for working families',
        text:
          'Our live-out nanny service is ideal for households that need dependable daily support without the commitment of a live-in arrangement. We provide vetted professionals who can help maintain structure at home while supporting your children and household activities.',
      },
      {
        heading: 'Why families choose live-out care',
        list: ['Working parents', 'Families needing school-run support', 'Homes requiring daily childcare assistance', 'Households needing light housekeeping and caregiving support'],
      },
    ],
  },
  'house-manager-nairobi': {
    title: 'House Manager in Nairobi',
    eyebrow: 'Nairobi, Kenya • Home Management',
    intro:
      'If you need organized and dependable support in your home, a house manager in Nairobi can help manage the day-to-day running of your household. From supervising staff to managing routines, meals, and household logistics, a house manager brings structure and professionalism to your home.',
    sections: [
      {
        heading: 'Who benefits from a house manager?',
        text:
          'A house manager is ideal for households that need stronger coordination and oversight. This role often includes planning meals, managing cleaning schedules, supervising house help, coordinating errands, and ensuring that your home runs smoothly.',
      },
      {
        heading: 'Professional household support',
        list: ['Busy professionals', 'Larger households', 'Families who need supervision and coordination', 'Homes with multiple staff members', 'Households requiring structured domestic operations'],
      },
    ],
  },
}

export default function ServiceDetailPage({ slug: slugOverride }) {
  const slug = slugOverride || window.location.pathname.replace(/^\/+|\/+$/g, '').split('/').pop()
  const service = servicePages[slug] || servicePages['nanny-agency-nairobi']

  return (
    <section className="page-shell service-detail">
      <div className="page-content">
        <div className="policy-meta">{service.eyebrow}</div>
        <h1>{service.title}</h1>
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

        <div className="cta-box">
          <h3>Talk to us today</h3>
          <p>Let us help you match with the right support for your home and family needs.</p>
          <Link to="/contact" className="btn btn-primary">Request a consultation</Link>
        </div>
      </div>
    </section>
  )
}
