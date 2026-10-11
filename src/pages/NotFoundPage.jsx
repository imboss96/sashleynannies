import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className="container section-head narrow">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page may have moved or the address may be incorrect. You can continue from one of these pages.</p>
        <p className="not-found-links">
          <Link to="/">Home</Link> · <Link to="/services">Services</Link> · <Link to="/contact">Contact</Link> · <Link to="/home-care-consultation">Consultation</Link>
        </p>
      </div>
    </section>
  )
}
