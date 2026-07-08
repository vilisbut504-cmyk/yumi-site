/**
 * Генерация QR-кода для офлайн-материалов ЮМИ.
 * Запуск: npm run qr:generate
 */
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'qr')

// Punycode надёжнее для библиотек QR; оба URL ведут на один и тот же /qr.
const QR_URL = 'https://xn----otbhfdlo0i.xn--p1ai/qr'
const QR_URL_CYRILLIC = 'https://юми-корм.рф/qr'

const OPTIONS = {
  errorCorrectionLevel: 'H',
  margin: 2,
  color: { dark: '#000000', light: '#FFFFFF' },
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  const svgPath = path.join(OUT_DIR, 'yumi-main.svg')
  const pngPath = path.join(OUT_DIR, 'yumi-main.png')

  await QRCode.toFile(svgPath, QR_URL, { ...OPTIONS, type: 'svg' })
  await QRCode.toFile(pngPath, QR_URL, { ...OPTIONS, type: 'png', width: 2048 })

  console.log('✅ QR сгенерирован')
  console.log(`   URL (punycode): ${QR_URL}`)
  console.log(`   URL (кириллица): ${QR_URL_CYRILLIC}`)
  console.log(`   SVG: ${svgPath}`)
  console.log(`   PNG: ${pngPath} (2048×2048, ECC H)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
