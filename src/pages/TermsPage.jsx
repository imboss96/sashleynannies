import { Link } from 'react-router-dom'

const termsSections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using www.sashleynannies.co.ke, you agree to these Terms & Conditions and any additional terms or notices displayed on the Website. If you do not agree, please do not use the Website or submit information through its forms.',
  },
  {
    title: '2. Website Purpose',
    body: 'The Website provides information about Sashley Nannies and may allow users to submit enquiries, candidate applications, employer requests and other information relating to domestic staffing and recruitment services.',
  },
  {
    title: '3. Accuracy of Information',
    body: 'You agree to provide information that is accurate, current and complete to the best of your knowledge. You should promptly notify us if information relevant to an application or engagement changes.',
  },
  {
    title: '4. Candidate Applications',
    body: 'Submitting a candidate application does not guarantee employment, placement, interview, visa approval, travel, a particular employer, salary or any other outcome. Recruitment and placement decisions may depend on client requirements, verification, availability, suitability, contractual arrangements and applicable law.',
  },
  {
    title: '5. Employer and Client Enquiries',
    body: 'Submitting an employer or client enquiry does not create an employment, recruitment, agency or other contractual relationship unless and until the relevant parties enter into a separate agreement.',
  },
  {
    title: '6. User Responsibilities',
    body: 'You must not use the Website to submit fraudulent, misleading, unlawful, defamatory, abusive or malicious information; impersonate another person; attempt to gain unauthorised access; interfere with the Website; or use information obtained through the Website for unlawful purposes.',
  },
  {
    title: '7. Intellectual Property',
    body: 'Unless otherwise stated, Website content, branding, text, graphics and other materials are owned by or licensed to Sashley Nannies and may not be copied, reproduced, modified or commercially exploited without permission, except where permitted by law.',
  },
  {
    title: '8. Third-Party Services and Links',
    body: 'The Website may contain links to third-party websites, services or platforms. Sashley Nannies is not responsible for the content, availability, security or privacy practices of third-party websites. Users should review applicable third-party terms and privacy notices.',
  },
  {
    title: '9. Disclaimer',
    body: 'We aim to keep Website information accurate and up to date, but information may change and may contain errors or omissions. To the extent permitted by law, the Website and its content are provided without a guarantee that the Website will always be available, uninterrupted or error-free.',
  },
  {
    title: '10. Limitation of Liability',
    body: 'To the maximum extent permitted by applicable law, Sashley Nannies will not be liable for indirect, incidental, consequential or other losses arising from use of the Website or reliance on information published on it, except where liability cannot lawfully be excluded or limited.',
  },
  {
    title: '11. Privacy',
    body: 'Information submitted through the Website is handled in accordance with the Sashley Nannies Privacy Policy. Users should review the Privacy Policy before submitting personal information through Website forms.',
    privacyLink: true,
  },
  {
    title: '12. Changes to These Terms',
    body: 'We may update these Terms & Conditions from time to time. Changes will become effective when published on the Website unless otherwise stated.',
  },
  {
    title: '13. Governing Law',
    body: 'These Terms & Conditions shall be interpreted in accordance with the laws of Kenya, subject to any mandatory rights or remedies available to users under applicable law.',
  },
]

export default function TermsPage() {
  return (
    <div className="privacy-page terms-page">
      <section className="privacy-hero">
        <div className="container">
          <span className="eyebrow">Sashley Nannies</span>
          <h1>Terms &amp; Conditions</h1>
          <p>For <a href="https://www.sashleynannies.co.ke">www.sashleynannies.co.ke</a></p>
          <p className="legal-updated">Effective date: 29 September 2026</p>
        </div>
      </section>
      <section className="container privacy-content">
        {termsSections.map((section) => (
          <article className="privacy-section" key={section.title}>
            <h2>{section.title}</h2>
            <p>
              {section.privacyLink
                ? <>Information submitted through the Website is handled in accordance with the Sashley Nannies <Link to="/privacy">Privacy Policy</Link>. Users should review the <Link to="/privacy">Privacy Policy</Link> before submitting personal information through Website forms.</>
                : section.body}
            </p>
          </article>
        ))}
        <article className="privacy-section">
          <h2>14. Contact</h2>
          <p><strong>Sashley Nannies</strong><br />Website: <a href="https://www.sashleynannies.co.ke">www.sashleynannies.co.ke</a><br />Email: <a href="mailto:info@sashleynannies.co.ke">info@sashleynannies.co.ke</a><br />Phone: <a href="tel:+254741448680">+254 741 448 680</a><br />Address: The Delta House, 3rd Floor, Room 326, University Way, Nairobi</p>
        </article>
      </section>
    </div>
  )
}
