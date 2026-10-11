import { useState } from 'react'

const mapUrl = 'https://maps.google.com/maps?q=The%20Delta%20House%2C%20University%20Way%2C%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed'
const directionsUrl = 'https://maps.google.com/?q=The%20Delta%20House%2C%20University%20Way%2C%20Nairobi'

export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="footer-map">
      {loaded ? <iframe title="Sashley Nannies office location on University Way, Nairobi" src={mapUrl} width="100%" height="160" style={{ border: 0, display: 'block' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : (
        <div className="map-facade">
          <p>The Delta House, University Way, Nairobi</p>
          <button className="btn btn-secondary" type="button" onClick={() => setLoaded(true)}>View map</button>
        </div>
      )}
      <a href={directionsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
    </div>
  )
}
