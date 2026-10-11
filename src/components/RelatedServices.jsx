import { Link } from 'react-router-dom'

const related = [
  ['/nanny-agency-nairobi', 'Nanny placement'], ['/house-help-nairobi', 'Househelp'],
  ['/live-in-nanny-nairobi', 'Live-in nanny'], ['/live-out-nanny-nairobi', 'Live-out nanny'],
  ['/house-manager-nairobi', 'House manager'], ['/vetting-process', 'Our vetting process'],
  ['/home-care-consultation', 'Home-care consultation'],
]

export default function RelatedServices({ current }) {
  return (
    <nav className="related-services" aria-label="Related services">
      <h2>Explore related services</h2>
      <ul>{related.filter(([path]) => path !== current).map(([path, label]) => <li key={path}><Link to={path}>{label}</Link></li>)}</ul>
    </nav>
  )
}
