/**
 * Оптимизация hero-изображения главной страницы.
 * Источник: public/Собака на первую страницу.png
 * Запуск: npm run hero:optimize
 */
import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'public', 'Собака на первую страницу.png')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'hero')

const CREAM = { r: 255, g: 248, b: 237 }

async function writeDesktopAndTablet(meta) {
  const desktopW = Math.min(1920, meta.width ?? 1920)
  await sharp(SRC)
    .rotate()
    .resize({ width: desktopW, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join(OUT_DIR, 'yumi-hero-dog.webp'))

  const tabletW = Math.min(1280, meta.width ?? 1280)
  await sharp(SRC)
    .rotate()
    .resize({ width: tabletW, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join(OUT_DIR, 'yumi-hero-dog-tablet.webp'))
}

/** Mobile: landscape 900w без лишнего кремового холста — собака сразу под текстом. */
async function writeMobileCompact() {
  const mobileW = 900
  await sharp(SRC)
    .rotate()
    .resize({ width: mobileW, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join(OUT_DIR, 'yumi-hero-dog-mobile.webp'))
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`❌ Не найден исходник: ${SRC}`)
    process.exit(1)
  }

  mkdirSync(OUT_DIR, { recursive: true })

  const meta = await sharp(SRC).metadata()
  console.log(`📷 Исходник: ${SRC}`)
  console.log(`   Размер: ${meta.width}×${meta.height}`)

  await writeDesktopAndTablet(meta)
  await writeMobileCompact()

  for (const name of ['yumi-hero-dog.webp', 'yumi-hero-dog-tablet.webp', 'yumi-hero-dog-mobile.webp']) {
    const info = await sharp(path.join(OUT_DIR, name)).metadata()
    console.log(`   ✅ ${name} → ${info.width}×${info.height}`)
  }

  console.log('\nГотово. Файлы в public/images/hero/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
