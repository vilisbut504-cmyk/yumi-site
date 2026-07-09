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

const VARIANTS = [
  { name: 'yumi-hero-dog.webp', width: 1920, quality: 85 },
  { name: 'yumi-hero-dog-tablet.webp', width: 1400, quality: 85 },
  { name: 'yumi-hero-dog-mobile.webp', width: 900, quality: 85 },
]

async function main() {
  if (!existsSync(SRC)) {
    console.error(`❌ Не найден исходник: ${SRC}`)
    process.exit(1)
  }

  mkdirSync(OUT_DIR, { recursive: true })

  const meta = await sharp(SRC).metadata()
  console.log(`📷 Исходник: ${SRC}`)
  console.log(`   Размер: ${meta.width}×${meta.height}`)

  for (const v of VARIANTS) {
    const out = path.join(OUT_DIR, v.name)
    const targetWidth = Math.min(v.width, meta.width ?? v.width)
    await sharp(SRC)
      .rotate()
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: v.quality })
      .toFile(out)
    const info = await sharp(out).metadata()
    console.log(`   ✅ ${v.name} → ${info.width}×${info.height}`)
  }

  console.log('\nГотово. Файлы в public/images/hero/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
