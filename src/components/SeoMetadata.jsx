import { useEffect } from 'react'
import { canonicalUrl, seoPages, siteUrl } from '../seo'

const defaultPage = seoPages['/']

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function SeoMetadata({ pathname }) {
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const page = seoPages[path] || defaultPage
    const canonical = canonicalUrl(pathname)
    const robots = page.index === false
      ? 'noindex,follow'
      : 'index,follow,max-image-preview:large'
    const image = `${siteUrl}/logo.png`

    document.title = page.title
    setMeta('name', 'description', page.description)
    setMeta('name', 'robots', robots)
    setMeta('property', 'og:title', page.title)
    setMeta('property', 'og:description', page.description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:title', page.title)
    setMeta('name', 'twitter:description', page.description)
    setMeta('name', 'twitter:image', image)

    let canonicalLink = document.head.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonical

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'EmploymentAgency',
          '@id': `${siteUrl}/#agency`,
          name: 'Sashley Nannies & Caregivers Agency',
          url: siteUrl,
          logo: image,
          image,
          telephone: '+254741448680',
          email: 'info@sashleynannies.co.ke',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'The Delta House, 3rd Floor, Room 326, University Way',
            addressLocality: 'Nairobi',
            addressCountry: 'KE',
          },
          areaServed: { '@type': 'City', name: 'Nairobi' },
        },
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: page.title,
          description: page.description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${siteUrl}/#agency` },
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: siteUrl,
          name: 'Sashley Nannies & Caregivers Agency',
          inLanguage: 'en-KE',
        },
      ],
    }

    let schema = document.getElementById('sashley-structured-data')
    if (!schema) {
      schema = document.createElement('script')
      schema.id = 'sashley-structured-data'
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }
    schema.textContent = JSON.stringify(structuredData)
  }, [pathname])

  return null
}