import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import SiteFooter from './SiteFooter'
import WhatsAppFloat from './WhatsAppFloat'
import SeoMetadata from './SeoMetadata'

const navItems = [
  { label: 'About Us', to: '/about' },
  { label: 'Why Choose Us', to: '/why-us' },
  { label: 'Services', to: '/services' },
  { label: 'Vetting Process', to: '/vetting-process' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    document.body.classList.add('react-site')
    return () => document.body.classList.remove('react-site')
  }, [])

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
      })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!mobileMenuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnOutsideTap = (event) => {
      if (!headerRef.current?.contains(event.target)) setMobileMenuOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideTap)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideTap)
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  return (
    <>
      <SeoMetadata pathname={location.pathname} />
      {mobileMenuOpen && (
        <button
          className="mobile-menu-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <header ref={headerRef} className={`topbar${mobileMenuOpen ? ' menu-open' : ''}`}>
        <div className="container nav-wrap">
          <Link to="/" className="brand" aria-label="Sashley Nannies home">
            <BrandLogo className="brand-logo" alt="Sashley Nannies & Caregivers Agency" />
            <span className="brand-copy">
              <span className="brand-name">Sashley Nannies</span>
              <span className="brand-tagline">Your Trusted Go-To Nanny</span>
            </span>
          </Link>

          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="site-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span></span><span></span><span></span>
          </button>

          <nav id="site-navigation" className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <a href="/#contact" className="btn btn-primary">Hire a Nanny</a>
            <a href="https://wa.me/254741448680" target="_blank" rel="noreferrer" className="btn btn-secondary">Apply for a Job</a>
          </div>
        </div>
      </header>

      <main>{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  )
}
