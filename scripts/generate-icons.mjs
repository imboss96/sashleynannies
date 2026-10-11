import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const source = await readFile(new URL('../public/logo.png', import.meta.url))
const makeSquare = async (size, background) => {
  const logo = await sharp(source)
    .resize(Math.round(size * 0.72), Math.round(size * 0.72), { fit: 'contain' })
    .png()
    .toBuffer()
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
    .toBuffer()
}

const icon32 = await makeSquare(32, { r: 0, g: 0, b: 0, alpha: 0 })
await mkdir(new URL('../public/og/', import.meta.url), { recursive: true })
await writeFile(new URL('../public/favicon-32.png', import.meta.url), icon32)
await writeFile(new URL('../public/apple-touch-icon.png', import.meta.url), await makeSquare(180, '#ffffff'))
await writeFile(new URL('../public/icon-192.png', import.meta.url), await makeSquare(192, '#ffffff'))
await writeFile(new URL('../public/icon-512.png', import.meta.url), await makeSquare(512, '#ffffff'))

const socialLogo = await sharp(source)
  .resize(780, 450, { fit: 'contain' })
  .png()
  .toBuffer()
const socialCard = await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: '#29245f',
  },
})
  .composite([{ input: socialLogo, gravity: 'centre' }])
  .png()
  .toBuffer()
await writeFile(new URL('../public/og/default.png', import.meta.url), socialCard)

const ico = Buffer.alloc(22 + icon32.length)
ico.writeUInt16LE(0, 0)
ico.writeUInt16LE(1, 2)
ico.writeUInt16LE(1, 4)
ico[6] = 32
ico[7] = 32
ico.writeUInt16LE(1, 10)
ico.writeUInt16LE(32, 12)
ico.writeUInt32LE(icon32.length, 14)
ico.writeUInt32LE(22, 18)
icon32.copy(ico, 22)
await writeFile(new URL('../public/favicon.ico', import.meta.url), ico)

const logoMetadata = await sharp(source).metadata()
if (logoMetadata.width < 112 || logoMetadata.height < 112) {
  throw new Error(`public/logo.png must be at least 112x112 for structured data (got ${logoMetadata.width}x${logoMetadata.height}).`)
}
console.log(`Generated favicon, app icons, and default social image from ${fileURLToPath(new URL('../public/logo.png', import.meta.url))}.`)
