# SEO implementation notes

## Completed

- Added a shared site configuration for canonical URLs, contact details, full address, social profiles, and optional local-business properties.
- Built static HTML for every indexable route and a not-found page, with route-specific titles, descriptions, canonical links, social metadata, and JSON-LD.
- Added a build check for route titles/descriptions, canonicals, H1 counts, JSON-LD, sitemap coverage, required icons, and image alt text.
- Added legacy WordPress redirects, junk-path 410 rules, canonical-host HTTPS redirects, security headers, HTML revalidation, fingerprinted asset caching in `public/assets/.htaccess`, and the static 404 handler.
- Added visible breadcrumbs, related-service links, route-specific service content data, the homepage FAQ links, and a click-to-load map.
- Added generated favicons, app icons, a web manifest, and the default 1200×630 social card. Team portraits are generated as 192×192 WebP images and displayed at 96×96.
- Added optional GTM and Search Console verification hooks; configure them through the documented environment variables.
- Added a timed contact request, submission state, honeypot handling, WhatsApp/email error fallback, form analytics, and restricted API CORS origins.
- Kept the existing Georgia heading typeface explicitly declared in the stylesheet.

## Owner TODOs

- Add verified office coordinates to `SITE.geo`.
- Provide a registration number if it should be published.
- Provide a verified price range and opening-hours specification, if appropriate.
- Replace `TODO` values in `SITE.sameAs` with the real Facebook, Instagram, LinkedIn, and TikTok profile URLs. Footer icons and schema links appear only for configured URLs.
- Provide a higher-resolution original hero photo. The current Cloudinary photo is retained and served in responsive WebP sizes; the larger rendition is an enlargement, not a higher-resolution original.
- Set `VITE_GTM_ID` and `VITE_GSC_TOKEN` only when the verified IDs are available. Search Console DNS verification remains preferred.
- After deployment, verify redirects, response headers, route status codes, the real 404 response, and that fingerprinted assets receive long-lived caching on the hosting provider.

## Verification limits

`npm run build` and `npm run seo:check` validate the generated files locally. The repository does not include a LiteSpeed/Apache server configuration for end-to-end HTTP testing, so host-specific `.htaccess` behavior must be confirmed after deployment.
