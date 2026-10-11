# Sashley Nannies Website

A single-stack React + Vite + Express application for the Sashley Nannies website.

## Stack

- Frontend: React + Vite
- Backend: Express + Nodemailer
- Form handling: server-side API for custom email delivery

## Run locally

```bash
npm install
npm start
```

## Scripts

- `npm run dev` — Vite frontend dev server
- `npm run server` — Express API server
- `npm run build` — production build
- `npm start` — runs backend and frontend together

## Deploying to LiteSpeed or Apache

- Run `npm run build`, then upload the contents of `dist/` to the web root (for example, `public_html/`), including the hidden `.htaccess` file. Every public route is emitted as static HTML in its own directory; `.htaccess` serves those files and returns `404.html` for unknown paths instead of falling back to the homepage.
- If your hosting file manager hides dotfiles, enable showing hidden files before uploading `.htaccess`.
- The host must support Apache-compatible `mod_rewrite` and `mod_headers` for redirects, the 404 document, security headers, and asset caching. Verify these responses after deployment.

## Search engine setup

- `npm run build` generates optimized team WebP images, app icons, the sitemap, the Vite bundle, static HTML for each route, a `404.html`, and runs `scripts/seo-check.mjs`. Add public routes to `src/config/routes.js` and their metadata to `src/seo.js`.
- Blog articles are maintained in `src/config/blogPosts.js`; add each article route to `src/config/routes.js` so it is prerendered and included in the sitemap. Article metadata and BlogPosting structured data are generated from that shared content.
- The build copies `robots.txt` into `dist/`; the generated sitemap, icons, and `.htaccess` are also published at the domain root.
- Optional analytics hooks use `VITE_GTM_ID` and `VITE_GSC_TOKEN`; leave them empty until the owner supplies verified IDs.
- Add the domain property `sashleynannies.co.ke` in Google Search Console, complete domain verification through DNS, then submit `/sitemap.xml` and inspect the homepage and important service URLs.
- Use Search Console reports and real customer questions to improve page content over time. Sitemap submission, structured data, and metadata help discovery and interpretation, but they do not guarantee rankings; useful original content, reputable links, and a fast, accessible site still matter.
