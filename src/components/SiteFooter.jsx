import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <BrandLogo alt="Sashley Nannies & Caregivers Agency" />
          </Link>
          <p className="footer-about">Nairobi's trusted agency for verified domestic staff, nannies, housekeepers, and specialized caregivers. Dedicated to safety, professionalism, and family peace of mind.</p>
          <div className="footer-badges">
            <span className="badge-pill">100% DCI Vetted</span>
            <span className="badge-pill">Medical Screened</span>
          </div>
        </div>
        <div className="footer-col">
          <h2 className="footer-title">Quick Links</h2>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/why-us">Why Choose Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/vetting-process">Vetting Process</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="/#faq">FAQs</a></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><a href="https://listingster.com/listing/nairobi,nairobi-cbd/nanny-agencies/sashley-nannies/" target="_blank" rel="noreferrer">Verified Listingster profile</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h2 className="footer-title">Care Services</h2>
          <ul className="footer-links">
            <li><Link to="/live-in-nanny-nairobi">Live-in Nannies</Link></li>
            <li><Link to="/live-out-nanny-nairobi">Day / Live-out Staff</Link></li>
            <li><Link to="/house-manager-nairobi">House Managers</Link></li>
            <li><Link to="/house-help-nairobi">Househelp &amp; Cleaning</Link></li>
            <li><Link to="/home-care-consultation">Home-care consultation</Link></li>
            <li><Link to="/services">Elderly Caregivers</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h2 className="footer-title">Contact &amp; Location</h2>
          <ul className="footer-contact">
            <li>
              <svg className="footer-contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
              <span>The Delta House, 3rd Floor, Room 326, University Way, Nairobi</span>
            </li>
            <li>
              <svg className="footer-contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.8a15 15 0 0 0 5.7 5.7L16 13l5 2v4c0 1.1-.9 2-2 2A17 17 0 0 1 3 5c0-1.1.9-2 2-2Z" /></svg>
              <a href="tel:+254741448680">+254 741 448 680</a>
            </li>
            <li>
              <svg className="footer-contact-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
              <a href="mailto:info@sashleynannies.co.ke">info@sashleynannies.co.ke</a>
            </li>
          </ul>
          <div className="footer-map">
            <iframe
              title="Sashley Nannies office location on University Way, Nairobi"
              src="https://maps.google.com/maps?q=The%20Delta%20House%2C%20University%20Way%2C%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="160"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Sashley Nannies &amp; Caregivers Agency. All rights reserved.</p>
        <a href="https://wa.me/254741448680" aria-label="Contact Sashley Nannies on WhatsApp">WhatsApp</a>
      </div>
    </footer>
  )
}
