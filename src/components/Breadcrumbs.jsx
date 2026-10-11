import { Link } from 'react-router-dom'
import { breadcrumbItems } from '../config/breadcrumbs'

export default function Breadcrumbs({ pathname }) {
  const items = breadcrumbItems(pathname)
  if (!items.length) return null
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.to}>
            {item.current ? <span aria-current="page">{item.label}</span> : <Link to={item.to}>{item.label}</Link>}
            {index < items.length - 1 && <span className="breadcrumb-separator" aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
