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

- Upload the contents of `dist/` to the web root (for example, `public_html/`), including the hidden `.htaccess` file. It rewrites requests for client-side routes to `index.html` while leaving existing files, directories, and `/api` requests untouched.
- If your hosting file manager hides dotfiles, enable showing hidden files before uploading `.htaccess`.

## Search engine setup

- `npm run build` generates `public/sitemap.xml` from the indexable routes in `src/seo.js` before building the site. Add metadata there when adding a public route; mark duplicate aliases with `sitemap: false` and pages that should not appear in results with `index: false`.
- The build copies the root `robots.txt` into Vite's public assets, and generates the sitemap at `public/sitemap.xml`; both are published at the domain root from `dist/`. Vite also copies `public/.htaccess` into `dist/`.
- Add the domain property `sashleynannies.co.ke` in Google Search Console, complete domain verification through DNS, then submit `/sitemap.xml` and inspect the homepage and important service URLs.
- Use Search Console reports and real customer questions to improve page content over time. Sitemap submission, structured data, and metadata help discovery and interpretation, but they do not guarantee rankings; useful original content, reputable links, and a fast, accessible site still matter.
