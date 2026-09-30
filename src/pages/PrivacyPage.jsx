const policySections = [
  {
    title: '1. Information We Collect',
    paragraphs: [
      'Depending on how you use the Website, we may collect your name, phone number, email address, location or address, employment history, skills, qualifications, references, availability, preferences and other information you choose to submit through application, registration, contact or recruitment forms.',
      'Where necessary for recruitment or placement services, we may also process information contained in documents you voluntarily provide, such as CVs, certificates, references, identification documents, passport information, medical or other suitability information. Sensitive information will be handled with appropriate safeguards and only where there is a lawful basis and legitimate need to process it.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    intro: 'We may use personal information to:',
    bullets: [
      'Respond to enquiries and requests.',
      'Assess candidates for nanny, domestic staffing or related opportunities.',
      'Communicate with candidates, clients and prospective clients.',
      'Match candidates with suitable employment or placement opportunities.',
      'Verify information and conduct recruitment-related checks where appropriate.',
      'Provide, administer and improve our services and Website.',
      'Maintain records and manage our business operations.',
      'Comply with legal, regulatory, contractual and security requirements.',
      'Send service-related or promotional communications where permitted and, where required, with your consent.',
    ],
  },
  {
    title: '3. Lawful Basis and Consent',
    paragraphs: [
      'We process personal data only where there is an applicable lawful basis under Kenyan data protection law. Where consent is required, we will seek consent appropriately. Where processing is based on another lawful ground, we may process information without relying on consent while respecting applicable data-protection rights.',
      'Submitting information through a Website form does not automatically authorize every possible use of the information. We will use information for specified and legitimate purposes and limit processing to what is reasonably necessary.',
    ],
  },
  {
    title: '4. Sharing of Information',
    paragraphs: [
      'We may share relevant information with prospective employers, clients, recruitment partners, service providers, professional advisers, technology providers and competent authorities where necessary for the purposes described in this Policy or where required by law.',
      'Where a third party processes personal data on our behalf, we expect appropriate confidentiality and data-protection safeguards to apply.',
    ],
  },
  { title: '5. International Transfers', paragraphs: ['Where personal information is transferred outside Kenya or accessed through service providers located outside Kenya, we will take steps required by applicable Kenyan data-protection law to ensure appropriate safeguards and lawful transfer mechanisms.'] },
  { title: '6. Data Retention', paragraphs: ['We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including recruitment, placement, contractual, legal, regulatory, dispute-resolution and record-keeping purposes. Retention periods may vary depending on the type of information and the reason for processing.'] },
  { title: '7. Security', paragraphs: ['We use reasonable technical and organisational measures designed to protect personal information against unauthorised access, loss, misuse, alteration or disclosure. However, no online system can be guaranteed to be completely secure.'] },
  {
    title: '8. Your Data Protection Rights',
    paragraphs: [
      'Subject to applicable law, you may have rights to be informed about the processing of your personal data, access your personal data, request correction of inaccurate or misleading information, object to certain processing, request deletion where legally applicable, and exercise other rights provided by Kenyan data-protection law.',
      'Requests concerning your personal data may be made using the contact details below. We may need to verify your identity before acting on a request. You may also have the right to lodge a complaint with the Office of the Data Protection Commissioner (ODPC) in Kenya.',
    ],
    link: { text: 'Learn about data subject rights at the ODPC', href: 'https://www.odpc.go.ke/rights-of-a-data-subject/' },
  },
  { title: '9. Cookies and Website Technologies', paragraphs: ['The Website may use cookies and similar technologies for necessary website functionality, security, analytics, preferences and other permitted purposes. Where consent is legally required for non-essential cookies, appropriate controls should be provided on the Website.'] },
  { title: '10. Children', paragraphs: ['Our recruitment and employment services are intended for adults. We do not knowingly request or collect personal information from children except where legally permitted and necessary, with appropriate safeguards.'] },
  { title: '11. Changes to This Privacy Policy', paragraphs: ['We may update this Privacy Policy from time to time as our services, Website or legal requirements change. The updated version will be published on this page with a revised effective date.'] },
]

export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      <section className="privacy-hero">
        <div className="container">
          <span className="eyebrow">Your information</span>
          <h1>Privacy Policy</h1>
          <p>Sashley Nannies (“Sashley Nannies”, “we”, “us” or “our”) respects your privacy and is committed to protecting personal information submitted through www.sashleynannies.co.ke (the “Website”). This Privacy Policy explains what information we collect, why we collect it, how we use and protect it, when we may share it, and the rights available to you.</p>
        </div>
      </section>
      <section className="container privacy-content">
        {policySections.map((section) => (
          <article className="privacy-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.intro && <p>{section.intro}</p>}
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            {section.link && <a href={section.link.href} target="_blank" rel="noreferrer">{section.link.text}</a>}
          </article>
        ))}
        <article className="privacy-section">
          <h2>12. Contact Us</h2>
          <p><strong>Sashley Nannies</strong><br />Website: <a href="https://www.sashleynannies.co.ke">www.sashleynannies.co.ke</a><br />Email: <a href="mailto:info@sashleynannies.co.ke">info@sashleynannies.co.ke</a><br />Phone: <a href="tel:+254741448680">+254 741 448 680</a><br />Postal/physical address: The Delta House, 3rd Floor, Room 326, University Way, Nairobi</p>
        </article>
      </section>
    </div>
  )
}
