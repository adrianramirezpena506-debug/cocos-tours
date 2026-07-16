import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const inputRoot = path.join(root, 'public', 'assets')
const outputRoot = path.join(inputRoot, 'responsive')
const sourceFolders = ['hero', 'tours', 'gallery', 'journal']
const widths = [640, 960, 1440]

for (const folder of sourceFolders) {
  const inputDir = path.join(inputRoot, folder)
  const outputDir = path.join(outputRoot, folder)
  await mkdir(outputDir, { recursive: true })
  const files = await readdir(inputDir)
  for (const file of files.filter((name) => /\.(jpe?g|png)$/i.test(name))) {
    const source = path.join(inputDir, file)
    const base = file.replace(/\.(jpe?g|png)$/i, '')
    for (const width of widths) {
      await sharp(source).resize({ width, withoutEnlargement: true }).avif({ quality: 62 }).toFile(path.join(outputDir, `${base}-${width}.avif`))
      await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(outputDir, `${base}-${width}.webp`))
    }
  }
}

console.log('Responsive AVIF and WebP images generated.')
