import { readdir } from 'node:fs/promises'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const directory = resolve(dirname(fileURLToPath(import.meta.url)), '../public/images/team')
const names = (await readdir(directory)).filter((name) => extname(name).toLowerCase() === '.jpg')

await Promise.all(names.map(async (name) => {
  await sharp(join(directory, name))
    .resize(192, 192, { fit: 'cover' })
    .webp({ quality: 65, effort: 6 })
    .toFile(join(directory, `${name.slice(0, -extname(name).length)}.webp`))
}))

console.log(`Generated ${names.length} optimized team portraits.`)
