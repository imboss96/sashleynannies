import { SITE } from './config/site.js'
import { routes } from './config/routes.js'
import { breadcrumbItems } from './config/breadcrumbs.js'
import { homeFaqs, consultationFaqs } from './config/faqs.js'
import { blogPosts } from './config/blogPosts.js'

export const siteUrl = SITE.url

export const seoPages = {
  '/': { title: 'Vetted Nannies & Caregivers in Nairobi | Sashley Nannies', description: 'Find vetted nannies, househelps, and caregivers in Nairobi. Sashley Nannies helps families hire trusted domestic staff with careful screening and support.' },
  '/why-us': { title: 'Why Choose Sashley Nannies | Trusted Care in Nairobi', description: 'See how Sashley Nannies supports families with careful candidate vetting, thoughtful matching, and follow-up after placement.' },
  '/services': { title: 'Nanny, Househelp & Caregiver Services in Nairobi', description: 'Explore live-in and live-out nanny placements, househelp, and house manager services for families in Nairobi.' },
  '/nanny-agency-nairobi': { title: 'Nanny Agency in Nairobi | Sashley Nannies', description: 'Connect with a nanny agency in Nairobi for vetted live-in and live-out nannies, newborn care, and childcare support matched to your family.' },
  '/house-help-nairobi': { title: 'Househelp in Nairobi | Vetted Domestic Staff', description: 'Find househelp in Nairobi for cleaning, laundry, meal preparation, and household support, matched to your home and routine.' },
  '/live-in-nanny-nairobi': { title: 'Live-in Nanny in Nairobi | Sashley Nannies', description: 'Find a vetted live-in nanny in Nairobi for consistent in-home childcare and support with your family’s daily routines.' },
  '/live-out-nanny-nairobi': { title: 'Live-out Nanny in Nairobi | Daytime Childcare', description: 'Hire a vetted live-out nanny in Nairobi for daytime childcare, school routines, and household support without live-in accommodation.' },
  '/house-manager-nairobi': { title: 'House Manager in Nairobi | Household Support', description: 'Find a house manager in Nairobi to help coordinate household routines, staff, meal planning, and day-to-day home operations.' },
  '/vetting-process': { title: 'Caregiver Vetting Process | Sashley Nannies Nairobi', description: 'Learn how Sashley Nannies reviews caregiver experience, references, conduct, and readiness before introducing candidates to families.' },
  '/careers': { title: 'Careers for Nannies & Caregivers in Nairobi | Sashley', description: 'Explore caregiver and domestic staff opportunities with Sashley Nannies in Nairobi and learn how to apply.' },
  '/contact': { title: 'Contact Sashley Nannies | Nairobi, Kenya', description: 'Contact Sashley Nannies in Nairobi to discuss nanny placement, househelp, caregiver services, or a household staffing request.' },
  '/home-care-consultation': { title: 'Home-care Consultation in Nairobi | Sashley Nannies', description: 'Get guidance choosing home-care support in Nairobi. Discuss household needs, staff roles, schedules, and placement next steps with Sashley Nannies.' },
  '/privacy': { title: 'Privacy Policy | Sashley Nannies', description: 'Read how Sashley Nannies collects, uses, and protects personal information.' },
  '/terms': { title: 'Terms and Conditions | Sashley Nannies', description: 'Read the terms and conditions for using the Sashley Nannies website and services.' },
  '/blog': { title: 'Nanny & Childcare Advice for Nairobi Families | Sashley Nannies', description: 'Read practical guides for hiring a nanny in Nairobi, comparing live-in and live-out care, and interviewing childcare candidates.' },
  ...Object.fromEntries(blogPosts.map((post) => [
    `/blog/${post.slug}`,
    { title: `${post.title} | Sashley Nannies`, description: post.description },
  ])),
}

export const sitemapPaths = routes.filter((path) => seoPages[path]?.index !== false)

export function canonicalUrl(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return `${siteUrl}${path === '/' ? '/' : path}`
}

export function structuredDataFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const page = seoPages[path] || { title: 'Page not found | Sashley Nannies', description: 'The page you requested could not be found.' }
  const agencyId = `${siteUrl}/#agency`
  const logo = `${siteUrl}/logo.png`
  const graph = [
    {
      '@type': ['EmploymentAgency', 'LocalBusiness'], '@id': agencyId,
      name: SITE.name, url: SITE.url, logo, image: logo, telephone: SITE.phone, email: SITE.email,
      address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.locality, addressCountry: SITE.address.country },
      areaServed: { '@type': 'City', name: SITE.address.locality },
      ...(SITE.geo.lat != null && SITE.geo.lng != null ? { geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng } } : {}),
      ...(Object.values(SITE.sameAs).some((url) => url && url !== 'TODO') ? { sameAs: Object.values(SITE.sameAs).filter((url) => url && url !== 'TODO') } : {}),
      ...(SITE.priceRange ? { priceRange: SITE.priceRange } : {}),
      ...(SITE.openingHoursSpecification ? { openingHoursSpecification: SITE.openingHoursSpecification } : {}),
    },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: SITE.name, inLanguage: 'en-KE' },
    { '@type': 'WebPage', '@id': `${canonicalUrl(path)}#webpage`, url: canonicalUrl(path), name: page.title, description: page.description, isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': agencyId } },
  ]
  if (path !== '/') {
    graph.push({ '@type': 'BreadcrumbList', itemListElement: breadcrumbItems(path).map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: item.current ? canonicalUrl(path) : `${siteUrl}${item.to}` })) })
  }
  if (['/nanny-agency-nairobi', '/house-help-nairobi', '/live-in-nanny-nairobi', '/live-out-nanny-nairobi', '/house-manager-nairobi'].includes(path)) {
    graph.push({ '@type': 'Service', name: page.title.split('|')[0].trim(), description: page.description, provider: { '@id': agencyId }, areaServed: { '@type': 'City', name: 'Nairobi' }, serviceType: page.title.split('|')[0].trim() })
  }
  if (path === '/blog') {
    graph.push({
      '@type': 'CollectionPage',
      name: page.title,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: blogPosts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: canonicalUrl(`/blog/${post.slug}`),
          name: post.title,
        })),
      },
    })
  }
  const blogPost = blogPosts.find((post) => `/blog/${post.slug}` === path)
  if (blogPost) {
    graph.push({
      '@type': 'BlogPosting',
      headline: blogPost.title,
      description: blogPost.description,
      datePublished: blogPost.publishedAt,
      dateModified: blogPost.publishedAt,
      mainEntityOfPage: canonicalUrl(path),
      author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url, logo: { '@type': 'ImageObject', url: logo } },
      image: `${siteUrl}/og/default.png`,
    })
  }
  if (path === '/' || path === '/home-care-consultation') {
    const questions = path === '/' ? homeFaqs.map(({ q, a }) => ({ question: q, answer: a })) : consultationFaqs.map(({ question, answer }) => ({ question, answer }))
    graph.push({ '@type': 'FAQPage', mainEntity: questions.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function metadataFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const page = seoPages[path] || { title: 'Page not found | Sashley Nannies', description: 'The page you requested could not be found.', index: false }
  return { ...page, path, canonical: canonicalUrl(path), robots: page.index === false ? 'noindex,follow' : 'index,follow,max-image-preview:large', image: page.ogImage || `${siteUrl}/og/default.png` }
}
