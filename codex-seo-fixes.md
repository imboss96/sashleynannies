# Task: Implement SEO fixes for sashleynannies.co.ke

You are working on the codebase of **sashleynannies.co.ke**, a Vite + React single-page app deployed as static files to a LiteSpeed (Apache-compatible `.htaccess`) server. An SEO audit found that the site is invisible to search engines. Your job is to implement the developer-side fixes below.

## Ground rules

1. **Inspect first.** Before changing anything, read `package.json`, `vite.config.*`, the router setup, `index.html`, `public/`, and the page components. Summarise the stack (router library, head manager, how SEO tags are currently injected) in 5 lines, then proceed.
2. **Do not change the visual design.** Only change markup where explicitly told (H1 fixes, images, breadcrumbs, related-links blocks).
3. **Work in the order below**, one commit per task (`seo: <task id> <short description>`). Run `npm run build` after each task and fix any errors before moving on.
4. **Never invent facts.** Where a value is unknown (coordinates, registration number, social URLs), leave a clearly marked `TODO` constant in `src/config/site.(ts|js)` and keep going.
5. At the end, produce `SEO-CHANGES.md` listing what was done, what was skipped, and every `TODO` the owner must fill in.

## Single source of truth

Create `src/config/site.(ts|js)` and use it everywhere (footer, contact page, schema, meta):

```js
export const SITE = {
  url: "https://sashleynannies.co.ke",          // non-www, https, no trailing slash
  name: "Sashley Nannies & Caregivers Agency",
  phone: "+254741448680",
  phoneDisplay: "+254 741 448 680",
  email: "info@sashleynannies.co.ke",
  address: {
    street: "The Delta House, 3rd Floor, Room 326, University Way",
    locality: "Nairobi",
    country: "KE",
  },
  geo: { lat: null, lng: null },                 // TODO owner: fill from Google Maps
  registrationNumber: null,                      // TODO owner
  sameAs: {
    facebook: "TODO",
    instagram: "TODO",
    linkedin: "TODO",
    tiktok: "TODO",
  },
};
```

Also make the footer and `/contact` page show the full address string from this config (currently `/contact` shows only "Nairobi, Kenya").

---

## Task 1 (CRITICAL, C1): Pre-render every route to static HTML

**Problem:** Every URL returns the same 1.7 KB shell. Title, meta description, H1, body, canonical and JSON-LD are all injected by JavaScript. The raw HTML of every page has `<link rel="canonical" href="https://sashleynannies.co.ke/">`.

**Do:**

1. Immediately remove the hard-coded `<link rel="canonical">` (and any hard-coded title/description/OG tags that apply to the homepage only) from `index.html`. Per-page values must come from the per-route SEO component.
2. Pre-render every real route at build time so `dist/<route>/index.html` contains the fully rendered content, per-page `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph and Twitter tags, and JSON-LD, all in the raw HTML.
3. Pick the approach based on what the repo already uses:
   - If using `react-router` data/browser router: prefer **`vite-react-ssg`**.
   - Otherwise: write a post-build script (`scripts/prerender.mjs`) that serves `dist/` locally, visits each route with Puppeteer/Playwright, waits for the app to settle, and writes the serialized HTML to `dist/<route>/index.html`.
   - Note: `vite-ssg` is Vue-only. Do not use it.
4. Keep client-side hydration working (no hydration mismatch warnings in the console).
5. Routes to pre-render:
   `/`, `/why-us`, `/services`, `/nanny-agency-nairobi`, `/house-help-nairobi`, `/live-in-nanny-nairobi`, `/live-out-nanny-nairobi`, `/house-manager-nairobi`, `/vetting-process`, `/careers`, `/contact`, `/home-care-consultation`, `/terms`, `/privacy` (plus the new routes added in later tasks). Drive the list from one `routes` array that is also used for the sitemap (Task 8).
6. Create a per-route SEO helper (e.g. `<Seo title description path jsonLd noindex />`) that is the **only** place that sets head tags. Canonical = `SITE.url + path` (no trailing slash except for the homepage).

**Acceptance (must pass without JavaScript):**

```bash
npm run build && npx serve dist -l 4173 &
for p in "" why-us services nanny-agency-nairobi contact; do
  echo "== /$p"; curl -s "http://localhost:4173/$p" | grep -Eo '<title>[^<]*</title>|<link rel="canonical"[^>]*>|<h1[^>]*>[^<]*' 
done
```

Each route must show its **own** title, its **own** canonical, and exactly one `<h1>`.

---

## Task 2 (CRITICAL, C2): Redirect old WordPress URLs

Create/extend `public/.htaccess` (Vite copies `public/` into `dist/` root). Put these rules **before** any other rewrite rules, after the https/host rule from Task 4.

**301 redirects:**

| Old URL | New URL |
|---|---|
| `/about-us/` , `/about-us` , `/about` | `/` (see decision note below) |
| `/our-services/` , `/our-services` | `/services` |
| `/contacts/` , `/contacts` | `/contact` |
| `/faq/` , `/faq` | `/#faq` |
| `/application-form/` | `/careers` |
| `/news/` , `/news-list/` | `/` |

Example syntax (use `[NE,R=301,L]` so the `#` fragment is not escaped):

```apache
RewriteRule ^about-us/?$       /          [R=301,L]
RewriteRule ^our-services/?$   /services  [R=301,L]
RewriteRule ^contacts/?$       /contact   [R=301,L]
RewriteRule ^faq/?$            /#faq      [NE,R=301,L]
RewriteRule ^application-form/?$ /careers [R=301,L]
RewriteRule ^(news|news-list)/?$ /        [R=301,L]
```

**410 Gone** for old WordPress junk:

```apache
RewriteRule ^(tag|category|author|feed|wp-content|wp-includes|wp-json|wp-admin)(/|$) - [G,L]
RewriteRule ^wp-login\.php$ - [G,L]
RewriteRule ^xmlrpc\.php$   - [G,L]
```

Add a comment block at the top of the redirect section: `# Old WordPress URLs. Full map supplied by dmoons will be appended here.` and leave room for more rules.

**Decision note on `/about`:** Default = delete the `/about` route (it is a homepage clone with a canonical back to `/`), remove "About Us" from the nav or point it to `/#about` (add an `id="about"` anchor on the relevant homepage section), and 301 `/about` to `/`. If a real About page already has content in the repo, keep it instead and redirect `/about-us` to `/about`.

---

## Task 3 (CRITICAL, C3): Real 404 handling

1. Add a catch-all `NotFound` route/component: clear "Page not found" message, links to Home, Services, Contact, Consultation, and `<meta name="robots" content="noindex">`.
2. At build time, emit `dist/404.html` from that component (pre-rendered).
3. In `.htaccess`:

```apache
ErrorDocument 404 /404.html

# Serve pre-rendered route folders without a trailing slash, keep real files working
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.+?)/?$ /$1/index.html [L]
```

4. There must be **no** SPA fallback rewriting unknown URLs to `index.html`. Unknown paths must return a real HTTP 404 with the 404 page.

**Acceptance:**

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://sashleynannies.co.ke/this-page-does-not-exist-xyz   # 404
curl -s -o /dev/null -w "%{http_code}\n" https://sashleynannies.co.ke/services                      # 200
curl -s -o /dev/null -w "%{http_code}\n" https://sashleynannies.co.ke/favicon.ico                   # 200 after Task 8
```

(Test locally with a LiteSpeed/Apache container if available; otherwise state clearly that server-level verification must be done after deploy.)

---

## Task 4 (HIGH, C4 + T5 + T2): One canonical host, HSTS, security headers, caching

At the very top of `public/.htaccess`:

```apache
RewriteEngine On

# Force https + non-www (single 301 hop)
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://sashleynannies.co.ke%{REQUEST_URI} [L,R=301]

<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

  # Hashed Vite assets: cache for a year
  <FilesMatch "^/?assets/.*\.(js|css|woff2|webp|avif|png|jpg|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  # HTML: always revalidate
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
```

If the `<FilesMatch>` path match does not work on this server (it matches filenames, not paths), use `<LocationMatch>` or a nested `public/assets/.htaccess` instead. Do not add a Content-Security-Policy in this task (it risks breaking the Maps embed and form).

Also fix the Terms page, which refers to `www.sashleynannies.co.ke`: change to the non-www host (use `SITE.url`).

---

## Task 5 (HIGH, P1): Heading fixes

- `/why-us`: promote the main heading to **H1**: `Why Families Choose Sashley Nannies in Nairobi`.
- `/services`: promote the main heading to **H1**: `Nanny, Househelp & Caregiver Services in Nairobi`.
- `/vetting-process`: the "SCREENING PROCESS" label is currently an H2. Make it a `<p>`/`<span>` eyebrow; keep "How We Vet Every Caregiver" as the single H1.
- Every page must have exactly one H1. Add a build-time check (script or test) that fails the build if any pre-rendered page has 0 or more than 1 `<h1>`.
- Keep visual styling identical (change the tag, keep the classes).

---

## Task 6 (MEDIUM, P4): Per-page structured data

Generate JSON-LD per route inside the `<Seo>` helper so it appears in the pre-rendered HTML.

**Global (every page):** one `@graph` containing:
- `Organization`/`EmploymentAgency` + `LocalBusiness` node: `"@type": ["EmploymentAgency","LocalBusiness"]`, `name`, `url`, `logo` (use the largest logo available, at least 112×112), `telephone`, `email`, `address` (PostalAddress from `SITE`), `areaServed` (Nairobi), `priceRange` (TODO if unknown), `openingHoursSpecification` (TODO if unknown), `geo` only if `SITE.geo` is set, `sameAs` only for non-TODO entries.
- `WebSite` node.
- `WebPage` node whose `url`, `name` and `description` are those of **the current page**, not the homepage.

**Per page additions:**
- Each service page (`/nanny-agency-nairobi`, `/house-help-nairobi`, `/live-in-nanny-nairobi`, `/live-out-nanny-nairobi`, `/house-manager-nairobi`): a `Service` node (`name`, `description`, `provider` → the agency node, `areaServed` Nairobi, `serviceType`).
- Pages with an FAQ block (`/home-care-consultation`, and the homepage FAQ with seven questions): `FAQPage` generated from the same data array that renders the visible FAQ so they never drift.
- Every page except the homepage: `BreadcrumbList` matching the visible breadcrumbs (Task 7).

Validate that all JSON-LD parses (`JSON.parse`) in the build check.

---

## Task 7 (HIGH, P3): Breadcrumbs and internal linking

1. Add a `Breadcrumbs` component (visible, accessible `<nav aria-label="Breadcrumb">`) on all non-home pages, e.g. `Home › Services › Live-in Nanny in Nairobi`. Match existing styling.
2. Add a `RelatedServices` block at the bottom of every service page linking to the other four service pages, plus links to `/vetting-process` and `/home-care-consultation`.
3. In the homepage body copy, add contextual links to the service pages where the services are mentioned (not only the cards).
4. Use real `<a href>` links (router `<Link>`), never `onClick` navigation, so crawlers can follow them.

---

## Task 8 (MEDIUM, P5): Metadata, sitemap, favicon set

1. **Sitemap:** generate `sitemap.xml` at build time from the same `routes` array (all indexable routes including `/terms`, `/privacy`; exclude the 404 page), each with `<lastmod>` set to the build date (ISO `YYYY-MM-DD`). Keep `robots.txt` pointing to it.
2. **Favicons:** create in `public/`: `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` (180×180), `site.webmanifest` (name, short_name, icons 192/512, theme_color, background_color, `display: standalone`). Generate from the existing logo (use `sharp` or similar in a one-off script). Link them in the head.
3. **Social cards:** switch `twitter:card` to `summary_large_image`. Add a default 1200×630 OG image (`public/og/default.png`, generated from the logo on the brand background colour). Allow a per-page `ogImage` override in `<Seo>`; fall back to the default.
4. Ensure `og:url`, `og:title`, `og:description`, `og:type`, `og:image` are set per page in the pre-rendered HTML.

---

## Task 9 (MEDIUM, P6): Images

1. The four team portraits are 96×96 px but weigh 119–156 KB. Re-export as 192×192 **WebP** (target under 10 KB each), reference at `width`/`height` attributes of 96.
2. The hero image is a 678×452 JPEG used as a CSS background from Cloudinary. Replace it with a real `<img>` (`fetchpriority="high"`, `decoding="async"`, explicit `width`/`height`, `alt` describing the image), with `srcset` for 800 px and 1600 px WebP. If a larger source is not in the repo, keep the current source, still switch to `<img>`, and add a `TODO` in `SEO-CHANGES.md` asking the owner for a higher-resolution photo.
3. Add `loading="lazy"` to all below-the-fold images.
4. Every `<img>` needs an `alt` (empty `alt=""` only for decorative images).
5. Do not add stock photos to service pages yourself; add an optional `heroImage` field to the service page data so photos can be dropped in later.

---

## Task 10 (MEDIUM, T3 + T4): Performance

1. **Google Maps iframe:** replace the always-loading iframe with a click-to-load facade (static placeholder + "View map" button) or load it only when scrolled into view (`IntersectionObserver`). Keep a plain "Open in Google Maps" link as a fallback.
2. **Route splitting:** after pre-rendering works, apply `React.lazy` + `Suspense` per route (or the router's lazy route option) so the booking form, terms and privacy text are not in the first bundle. Verify pre-rendered output is unaffected.
3. **Heading font:** headings currently fall back to Georgia. Check the CSS. If a web font was intended, self-host it (woff2, `font-display: swap`, `<link rel="preload" as="font" crossorigin>`). If not, declare `Georgia, "Times New Roman", serif` explicitly in the design tokens so it is deliberate.
4. **Tap targets:** make footer links and booking-step indicators at least 44×44 px hit area on touch devices (padding or `min-height`, not visual resize).

---

## Task 11 (HIGH, T6): Contact form resilience

The form posts to `https://api.sashleynannies.co.ke` (a free Render service that sleeps for 20–50 s, with CORS open to any origin). In this repo only:

1. Add a client-side timeout (15 s) with `AbortController`. On timeout or error, show a clear message with a **WhatsApp fallback link** (`https://wa.me/254741448680`) and the email address.
2. Add a hidden honeypot field; discard submissions that fill it (client-side flag sent to the API as `website`).
3. Show a loading state and prevent double submit.
4. Fire `dataLayer.push({ event: "form_submit", form: "<name>" })` on success and `dataLayer.push({ event: "whatsapp_click" })` on any WhatsApp link click (Task 12 consumes these).
5. If the API source is in this repo or a sibling folder, restrict CORS to `https://sashleynannies.co.ke` and `https://www.sashleynannies.co.ke`. If not, add a `TODO` to `SEO-CHANGES.md`.

---

## Task 12 (HIGH, C5): Analytics and Search Console hooks

Do **not** invent IDs. Read them from environment variables.

1. Add a Google Tag Manager snippet that loads only if `VITE_GTM_ID` is set (no-op otherwise). Include the `<noscript>` iframe in the pre-rendered body.
2. Add a Search Console verification `<meta name="google-site-verification" content={import.meta.env.VITE_GSC_TOKEN}>` rendered only when the variable is set. (DNS TXT verification is preferred and is handled by the owner; this is a fallback.)
3. Document the two env vars in `.env.example` and in `SEO-CHANGES.md`.

---

## Task 13 (MEDIUM, O5): Social links

Add Facebook, Instagram, LinkedIn and TikTok icons to the footer **only for entries in `SITE.sameAs` that are not `"TODO"`**. Feed the same non-TODO URLs into the schema `sameAs` (Task 6). Add `rel="noopener noreferrer me"` and `target="_blank"`.

---

## Task 14: Final verification script

Add `scripts/seo-check.mjs`, wired to `npm run seo:check`, which runs against `dist/` and fails with a non-zero exit code if any of the following is true:

- A route's HTML has no unique `<title>`, or two routes share a title or meta description.
- A route's canonical is not `SITE.url + its own path`.
- A route has 0 or more than 1 `<h1>`.
- A route has no JSON-LD, or JSON-LD fails to parse.
- `sitemap.xml` is missing any route in the `routes` array.
- `dist/404.html`, `dist/favicon.ico`, `dist/site.webmanifest`, `dist/apple-touch-icon.png` do not exist.
- Any `<img>` lacks an `alt` attribute.
- Any pre-rendered HTML still contains `<link rel="canonical" href="https://sashleynannies.co.ke/">` on a non-home route.

Print a pass/fail table per route.

---

## Out of scope (do not attempt)

These are handled by the owner or the SEO agency (dmoons):
- Rewriting or expanding page copy (service pages to 700–1,000 words, new service pages, blog).
- Google Business Profile, citation clean-up, backlinks, reviews, Facebook replies.
- DNS changes (DMARC TXT record, Search Console DNS verification) and Cloudflare setup.
- The full old-URL redirect map (will be appended to `.htaccess` later).

Build the components so that copy can be dropped in later: service pages should read their body content from a data file (Markdown or JSON) with fields for `title`, `description`, `h1`, `intro`, `sections[]`, `faqs[]`, `testimonial`, `heroImage`, so dmoons' content can be added without touching components. Do this only if it can be done without changing the current rendered output.

## Definition of done

- `npm run build` and `npm run seo:check` both pass.
- `curl` against the built output (no JS) shows unique title, canonical, one H1 and JSON-LD for every route.
- `public/.htaccess` contains the https/non-www rule, HSTS and security headers, caching rules, the 301 map, the 410 rules, the 404 handler.
- `SEO-CHANGES.md` is written, with all `TODO`s for the owner listed.
