export default function WhyUsPage() {
  return (
    <section className="section why-us-page">
      <div className="container">
        <div className="section-head narrow">
          <span className="eyebrow">Why choose us</span>
          <h1>Why Families Choose Sashley Nannies in Nairobi</h1>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <img
              className="why-us-card-image"
              src="/images/candidate-panel-interview.webp"
              alt="A candidate speaking with a seated interview panel"
              width="1536"
              height="1024"
              loading="lazy"
            />
            <div className="why-us-card-content">
              <h3>Careful Vetting</h3>
              <p>Every candidate is reviewed for reliability, professionalism, references, and household fit before they are recommended.</p>
            </div>
          </article>
          <article className="feature-card">
            <img
              className="why-us-card-image"
              src="/images/team/mary-nanny.jpg"
              alt="A nanny ready to provide attentive childcare"
              width="800"
              height="1200"
              loading="lazy"
            />
            <div className="why-us-card-content">
              <h3>Trusted Guidance</h3>
              <p>We help families choose the right profile based on their home, schedule, child age, and care needs.</p>
            </div>
          </article>
          <article className="feature-card">
            <img
              className="why-us-card-image"
              src="/images/team/grace-caregiver.jpg"
              alt="A caregiver offering warm support to an older adult"
              width="800"
              height="1200"
              loading="lazy"
            />
            <div className="why-us-card-content">
              <h3>Ongoing Support</h3>
              <p>We stay involved after placement to make sure the introduction feels smooth and the household settles well.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
