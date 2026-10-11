import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { SITE } from '../src/config/site.js'
import { routes } from '../src/config/routes.js'

const dist = resolve('dist')
const failures = []
const rows = []
const seenTitles = new Set()
const seenDescriptions = new Set()
const check = (condition, message) => { if (!condition) failures.push(message) }

for (const route of routes) {
  const failureCountBeforeRoute = failures.length
  const file = resolve(dist, route === '/' ? 'index.html' : `${route.slice(1)}/index.html`)
  let html = ''
  try { html = await readFile(file, 'utf8') } catch { failures.push(`${route}: missing prerendered HTML`); rows.push([route, 'FAIL']); continue }
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] || ''
  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?\s*>/i)?.[1] || ''
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?\s*>/i)?.[1]
  const openGraphTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"\s*\/?\s*>/i)?.[1]
  const openGraphDescription = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"\s*\/?\s*>/i)?.[1]
  const openGraphUrl = html.match(/<meta\s+property="og:url"\s+content="([^"]*)"\s*\/?\s*>/i)?.[1]
  const openGraphImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"\s*\/?\s*>/i)?.[1]
  const h1Count = (html.match(/<h1\b/gi) || []).length
  const schema = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i)?.[1]
  let schemaValid = false
  try { JSON.parse(schema); schemaValid = true } catch {}
  const expected = `${SITE.url}${route === '/' ? '/' : route}`
  check(Boolean(title), `${route}: missing title`)
  check((html.match(/<title\b/gi) || []).length === 1, `${route}: expected exactly one title`)
  check(!seenTitles.has(title), `${route}: duplicate title`); seenTitles.add(title)
  check(Boolean(description), `${route}: missing meta description`)
  check((html.match(/<meta\s+name="description"/gi) || []).length === 1, `${route}: expected exactly one meta description`)
  check(!seenDescriptions.has(description), `${route}: duplicate meta description`); seenDescriptions.add(description)
  check((html.match(/<link\s+rel="canonical"/gi) || []).length === 1, `${route}: expected exactly one canonical link`)
  check(canonical === expected, `${route}: canonical is ${canonical || 'missing'}, expected ${expected}`)
  check(openGraphTitle === title, `${route}: Open Graph title is missing or does not match the page title`)
  check(openGraphDescription === description, `${route}: Open Graph description is missing or does not match the page description`)
  check(openGraphUrl === expected, `${route}: Open Graph URL is missing or incorrect`)
  check(Boolean(openGraphImage), `${route}: Open Graph image is missing`)
  check(/<meta\s+name="twitter:card"\s+content="summary_large_image"/i.test(html), `${route}: large Twitter card is missing`)
  check(h1Count === 1, `${route}: expected exactly one H1, found ${h1Count}`)
  check((html.match(/type="application\/ld\+json"/gi) || []).length === 1, `${route}: expected exactly one JSON-LD script`)
  check(schemaValid, `${route}: JSON-LD missing or invalid`)
  check(!/<link\s+rel="canonical"\s+href="https:\/\/sashleynannies\.co\.ke\/"/i.test(html) || route === '/', `${route}: contains homepage canonical`)
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) check(/\balt\s*=/i.test(match[0]), `${route}: image missing alt attribute`)
  rows.push([route, failures.length === failureCountBeforeRoute ? 'PASS' : 'FAIL'])
}

let sitemap = ''
try { sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8') } catch { failures.push('sitemap.xml missing') }
for (const route of routes) check(sitemap.includes(`<loc>${SITE.url}${route}</loc>`), `sitemap missing ${route}`)
for (const file of ['404.html', 'favicon.ico', 'favicon-32.png', 'site.webmanifest', 'apple-touch-icon.png', 'og/default.png']) {
  try { await access(resolve(dist, file)) } catch { failures.push(`dist/${file} missing`) }
}
console.log('Route SEO check')
for (const [route, status] of rows) console.log(`${status.padEnd(5)} ${route}`)
console.log(`${failures.length ? `${failures.length} failure(s)` : 'All SEO checks passed.'}`)
if (failures.length) { for (const failure of failures) console.error(`- ${failure}`); process.exitCode = 1 }
