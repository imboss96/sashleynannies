export const siteUrl = 'https://sashleynannies.co.ke'

export const seoPages = {
  '/': {
    title: 'Vetted Nannies & Caregivers in Nairobi | Sashley Nannies',
    description: 'Find vetted nannies, househelps, and caregivers in Nairobi. Sashley Nannies helps families hire trusted domestic staff with careful screening and support.',
  },
  '/about': {
    title: 'About Sashley Nannies | Nairobi Caregiver Agency',
    description: 'Learn how Sashley Nannies helps Nairobi families find experienced, carefully screened caregivers and household support.',
    canonicalPath: '/',
    sitemap: false,
  },
  '/why-us': {
    title: 'Why Choose Sashley Nannies | Trusted Care in Nairobi',
    description: 'See how Sashley Nannies supports families with careful candidate vetting, thoughtful matching, and follow-up after placement.',
  },
  '/services': {
    title: 'Nanny, Househelp & Caregiver Services in Nairobi',
    description: 'Explore live-in and live-out nanny placements, househelp, and house manager services for families in Nairobi.',
  },
  '/nanny-agency-nairobi': {
    title: 'Nanny Agency in Nairobi | Sashley Nannies',
    description: 'Connect with a nanny agency in Nairobi for vetted live-in and live-out nannies, newborn care, and childcare support matched to your family.',
  },
  '/house-help-nairobi': {
    title: 'Househelp in Nairobi | Vetted Domestic Staff',
    description: 'Find househelp in Nairobi for cleaning, laundry, meal preparation, and household support, matched to your home and routine.',
  },
  '/live-in-nanny-nairobi': {
    title: 'Live-in Nanny in Nairobi | Sashley Nannies',
    description: 'Find a vetted live-in nanny in Nairobi for consistent in-home childcare and support with your family’s daily routines.',
  },
  '/live-out-nanny-nairobi': {
    title: 'Live-out Nanny in Nairobi | Daytime Childcare',
    description: 'Hire a vetted live-out nanny in Nairobi for daytime childcare, school routines, and household support without live-in accommodation.',
  },
  '/house-manager-nairobi': {
    title: 'House Manager in Nairobi | Household Support',
    description: 'Find a house manager in Nairobi to help coordinate household routines, staff, meal planning, and day-to-day home operations.',
  },
  '/vetting-process': {
    title: 'Caregiver Vetting Process | Sashley Nannies Nairobi',
    description: 'Learn how Sashley Nannies reviews caregiver experience, references, conduct, and readiness before introducing candidates to families.',
  },
  '/careers': {
    title: 'Careers for Nannies & Caregivers in Nairobi | Sashley',
    description: 'Explore caregiver and domestic staff opportunities with Sashley Nannies in Nairobi and learn how to apply.',
  },
  '/contact': {
    title: 'Contact Sashley Nannies | Nairobi, Kenya',
    description: 'Contact Sashley Nannies in Nairobi to discuss nanny placement, househelp, caregiver services, or a household staffing request.',
  },
  '/home-care-consultation': {
    title: 'Home-care Consultation in Nairobi | Sashley Nannies',
    description: 'Get guidance choosing home-care support in Nairobi. Discuss household needs, staff roles, schedules, and placement next steps with Sashley Nannies.',
  },
  '/privacy': {
    title: 'Privacy Policy | Sashley Nannies',
    description: 'Read how Sashley Nannies collects, uses, and protects personal information.',
    index: false,
  },
  '/terms': {
    title: 'Terms and Conditions | Sashley Nannies',
    description: 'Read the terms and conditions for using the Sashley Nannies website and services.',
    index: false,
  },
}

export const sitemapPaths = Object.entries(seoPages)
  .filter(([, page]) => page.sitemap !== false && page.index !== false)
  .map(([path]) => path)

export function canonicalUrl(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const page = seoPages[path]
  return `${siteUrl}${page?.canonicalPath || path}`
}