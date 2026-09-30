export default function VettingPage() {
  return (
    <>
      <section className="page-hero vetting-hero">
        <div className="container">
          <span className="eyebrow accent">Safety before placement</span>
          <h1>How We Vet Every Caregiver</h1>
          <p>
            Families deserve confidence before inviting someone into their home. Our screening process checks experience,
            conduct, references, and readiness so we can introduce candidates with greater care.
          </p>
          <div className="hero-actions">
            <a href="/#contact" className="btn btn-primary large">Find a Vetted Helper</a>
            <a href="/contact" className="btn btn-secondary large light">Ask a Question</a>
          </div>
        </div>
      </section>

      <section className="vetting-process">
        <div className="vetting-intro">
          <span className="eyebrow">Our screening standards</span>
          <h2>Screening Process</h2>
          <p>Your child’s safety is our highest priority. Every nanny, househelp, and caregiver is rigorously vetted through in-person interviews, reference checks, and comprehensive background reviews before we recommend them to your family.</p>
        </div>
        <div className="vetting-steps-wrap">
          <div className="vetting-steps">
            <article className="vetting-step">
              <span className="vetting-check" aria-hidden="true">✓</span>
              <h3>Application Submission</h3>
              <p>Candidates submit a confidential application and basic profile details for review.</p>
            </article>
            <article className="vetting-step">
              <span className="vetting-check" aria-hidden="true">✓</span>
              <h3>Phone Interview</h3>
              <p>We conduct a structured phone screening to assess experience, communication, and professional readiness.</p>
            </article>
            <article className="vetting-step">
              <span className="vetting-check" aria-hidden="true">✓</span>
              <h3>Face-to-Face Interview</h3>
              <p>In-depth interviews evaluate personality, problem-solving, English proficiency, and overall role suitability.</p>
            </article>
            <article className="vetting-step">
              <span className="vetting-check" aria-hidden="true">✓</span>
              <h3>References Verification</h3>
              <p>We thoroughly review references to confirm reliability, professionalism, punctuality, and past performance.</p>
            </article>
            <article className="vetting-step">
              <span className="vetting-check" aria-hidden="true">✓</span>
              <h3>Social Media Review</h3>
              <p>Digital presence is assessed to ensure responsible behavior, professionalism, and consistent character representation.</p>
            </article>
            <article className="vetting-step">
              <span className="vetting-check" aria-hidden="true">✓</span>
              <h3>Background Check</h3>
              <p>Comprehensive screenings verify criminal history, driving records, warrants, and overall safety compliance.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
