import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'sashley-cookie-notice-dismissed'

export default function CookieNotice() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === 'true') setVisible(false)
    } catch (error) {
      console.error('Unable to read the cookie notice preference.', error)
    }
  }, [])

  const dismissNotice = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    } catch (error) {
      console.error('Unable to save the cookie notice preference.', error)
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <p>
        This site uses cookies and similar technologies to support website functionality and security.{' '}
        <Link to="/privacy">Read our Privacy Policy</Link>.
      </p>
      <button className="cookie-notice-dismiss" type="button" onClick={dismissNotice}>
        Got it
      </button>
    </aside>
  )
}
