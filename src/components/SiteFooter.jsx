import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import MapEmbed from './MapEmbed'
import { SITE, fullAddress } from '../config/site'

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
            <li><Link to="/#about">About Us</Link></li>
            <li><Link to="/why-us">Why Choose Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/vetting-process">Vetting Process</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="/#faq">FAQs</a></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/blog">Family Care Guides</Link></li>
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
              <span>{fullAddress}</span>
            </li>
            <li>
              <svg className="footer-contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.8a15 15 0 0 0 5.7 5.7L16 13l5 2v4c0 1.1-.9 2-2 2A17 17 0 0 1 3 5c0-1.1.9-2 2-2Z" /></svg>
              <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
            </li>
            <li>
              <svg className="footer-contact-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          </ul>
          <MapEmbed />
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Sashley Nannies &amp; Caregivers Agency. All rights reserved.</p>
        <a href="https://wa.me/254741448680" aria-label="Contact Sashley Nannies on WhatsApp">WhatsApp</a>
        <div className="footer-socials">
          {Object.entries(SITE.sameAs).filter(([, url]) => url && url !== 'TODO').map(([network, url]) => (
            <a key={network} href={url} target="_blank" rel="noopener noreferrer me" aria-label={`Sashley Nannies on ${network}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {network === 'facebook' && <path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.7v8h3.2Z" />}
                {network === 'instagram' && <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" /></>}
                {network === 'linkedin' && <><path d="M5 8.5a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM3.5 10h3v10h-3zM9 10h2.9v1.4h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.6 2 3.6 4.5V20h-3v-5.1c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V20H9z" /></>}
                {network === 'tiktok' && <path d="M14 3h3c.2 2 1.3 3.4 3.5 3.8v3a8 8 0 0 1-3.5-1v5.8a6 6 0 1 1-6-6h.6v3.1a3 3 0 1 0 2.4 2.9V3Z" />}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
