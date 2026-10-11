import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE } from '../src/config/site.js'
import { routes as sitemapPaths } from '../src/config/routes.js'

const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sitemapPath = resolve(projectDirectory, 'public/sitemap.xml')
const robotsSourcePath = resolve(projectDirectory, 'robots.txt')
const robotsOutputPath = resolve(projectDirectory, 'public/robots.txt')
const buildDate = new Date().toISOString().slice(0, 10)
const urls = sitemapPaths
  .map((path) => `  <url><loc>${SITE.url}${path}</loc><lastmod>${buildDate}</lastmod></url>`)
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

await mkdir(dirname(sitemapPath), { recursive: true })
await writeFile(sitemapPath, sitemap, 'utf8')
await copyFile(robotsSourcePath, robotsOutputPath)
console.log(`Generated sitemap.xml with ${sitemapPaths.length} URLs.`)
