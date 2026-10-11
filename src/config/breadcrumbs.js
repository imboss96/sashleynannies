import { blogPosts } from './blogPosts'

const labels = {
  '/why-us': 'Why Choose Us', '/services': 'Services', '/nanny-agency-nairobi': 'Nanny Agency in Nairobi',
  '/house-help-nairobi': 'Househelp in Nairobi', '/live-in-nanny-nairobi': 'Live-in Nanny in Nairobi',
  '/live-out-nanny-nairobi': 'Live-out Nanny in Nairobi', '/house-manager-nairobi': 'House Manager in Nairobi',
  '/vetting-process': 'Vetting Process', '/careers': 'Careers', '/contact': 'Contact',
  '/home-care-consultation': 'Home-care Consultation', '/privacy': 'Privacy Policy', '/terms': 'Terms and Conditions',
  '/blog': 'Blog',
}
const serviceRoutes = new Set(['/nanny-agency-nairobi', '/house-help-nairobi', '/live-in-nanny-nairobi', '/live-out-nanny-nairobi', '/house-manager-nairobi'])

export function breadcrumbItems(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const post = blogPosts.find((item) => `/blog/${item.slug}` === path)
  const label = post?.title || labels[path]
  if (!label || path === '/') return []
  return [
    { label: 'Home', to: '/' },
    ...(path.startsWith('/blog/') ? [{ label: 'Blog', to: '/blog' }] : []),
    ...(serviceRoutes.has(path) ? [{ label: 'Services', to: '/services' }] : []),
    { label, to: path, current: true },
  ]
}
