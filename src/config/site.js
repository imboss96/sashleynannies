export const SITE = {
  url: 'https://sashleynannies.co.ke',
  name: 'Sashley Nannies & Caregivers Agency',
  phone: '+254741448680',
  phoneDisplay: '+254 741 448 680',
  email: 'info@sashleynannies.co.ke',
  address: {
    street: 'The Delta House, 3rd Floor, Room 326, University Way',
    locality: 'Nairobi',
    country: 'KE',
    countryName: 'Kenya',
  },
  geo: { lat: null, lng: null }, // TODO owner: add verified Google Maps coordinates.
  registrationNumber: null,
  priceRange: null, // TODO owner: provide a verified price range, if appropriate.
  openingHoursSpecification: null, // TODO owner: provide verified opening hours, if available.
  sameAs: {
    facebook: 'TODO',
    instagram: 'TODO',
    linkedin: 'TODO',
    tiktok: 'TODO',
  },
}

export const fullAddress = `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.countryName}`
