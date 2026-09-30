export const BRAND_LOGO_SRC = '/logo.png'

export default function BrandLogo({ className, alt = '' }) {
  return <img className={className} src={BRAND_LOGO_SRC} alt={alt} />
}
