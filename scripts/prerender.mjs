import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { PassThrough } from 'node:stream'
import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { createServer, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE } from '../src/config/site.js'
import { routes } from '../src/config/routes.js'

const root = process.cwd()
const output = resolve(root, 'dist')
const env = { ...loadEnv('production', root, ''), ...process.env }
const vite = await createServer({
  configFile: false,
  plugins: [react()],
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
  const { metadataFor, structuredDataFor, seoPages } = await vite.ssrLoadModule('/src/seo.js')
  const shell = await readFile(resolve(output, 'index.html'), 'utf8')
  const escapeAttribute = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
  const metadataTags = (path) => {
    const page = metadataFor(path)
    const structuredData = JSON.stringify(structuredDataFor(path)).replaceAll('<', '\\u003c')
    return [
      `<title>${escapeAttribute(page.title)}</title>`,
      `<meta name="description" content="${escapeAttribute(page.description)}" />`,
      `<meta name="robots" content="${page.robots}" />`,
      `<link rel="canonical" href="${page.canonical}" />`,
      '<meta property="og:locale" content="en_KE" />',
      '<meta property="og:type" content="website" />',
      `<meta property="og:site_name" content="${escapeAttribute(SITE.name)}" />`,
      `<meta property="og:title" content="${escapeAttribute(page.title)}" />`,
      `<meta property="og:description" content="${escapeAttribute(page.description)}" />`,
      `<meta property="og:url" content="${page.canonical}" />`,
      `<meta property="og:image" content="${page.image}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`,
      `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`,
      `<meta name="twitter:image" content="${page.image}" />`,
      env.VITE_GSC_TOKEN ? `<meta name="google-site-verification" content="${escapeAttribute(env.VITE_GSC_TOKEN)}" />` : '',
      `<script id="sashley-structured-data" type="application/ld+json">${structuredData}</script>`,
    ].filter(Boolean).join('\n    ')
  }
  const gtm = env.VITE_GTM_ID
    ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${escapeAttribute(env.VITE_GTM_ID)}');</script>`
    : ''
  const gtmNoScript = env.VITE_GTM_ID
    ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${escapeAttribute(env.VITE_GTM_ID)}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
    : ''
  const render = (path) => new Promise((resolveHtml, rejectHtml) => {
    let stream
    stream = renderToPipeableStream(
      React.createElement(StaticRouter, { location: path }, React.createElement(App)),
      {
        onAllReady() {
          const output = new PassThrough()
          const chunks = []
          output.on('data', (chunk) => chunks.push(chunk))
          output.on('end', () => resolveHtml(Buffer.concat(chunks).toString('utf8')))
          stream.pipe(output)
        },
        onShellError: rejectHtml,
        onError: rejectHtml,
      },
    )
  })
  for (const path of routes) {
    const body = await render(path)
    const html = shell
      .replace(/<title>[^<]*<\/title>/, metadataTags(path))
      .replace('<body>', `<body>${gtm}${gtmNoScript}`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    const target = path === '/' ? resolve(output, 'index.html') : resolve(output, path.slice(1), 'index.html')
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html, 'utf8')
  }
  const notFoundPage = await render('/__seo_missing_page__')
  const notFoundHtml = shell
    .replace(/<title>[^<]*<\/title>/, '<title>Page not found | Sashley Nannies</title><meta name="robots" content="noindex,follow" />')
    .replace('<body>', `<body>${gtm}${gtmNoScript}`)
    .replace('<div id="root"></div>', `<div id="root">${notFoundPage}</div>`)
  await writeFile(resolve(output, '404.html'), notFoundHtml, 'utf8')
  console.log(`Pre-rendered ${routes.length} routes and 404.html.`)
} finally {
  await vite.close()
}
