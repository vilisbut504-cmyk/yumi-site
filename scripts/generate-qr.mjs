/**
 * Генерация QR-кода для офлайн-материалов ЮМИ.
 * Запуск: npm run qr:generate
 *
 * Важно:
 * - Уже напечатанные QR кодируют https://…/qr → редирект с utm_campaign=launch_first_clients.
 *   Страницу /qr и файлы public/qr/yumi-main.* не меняем (аналитика старых материалов).
 * - Новые QR-ссылки / файлы используют нейтральную кампанию yumi_offline
 *   и ведут сразу на главную с UTM (без /qr).
 */
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'qr')

/** Legacy printed QR target — do not change redirect analytics on /qr. */
const LEGACY_QR_PATH = 'https://xn----otbhfdlo0i.xn--p1ai/qr'
const LEGACY_QR_PATH_CYRILLIC = 'https://юми-корм.рф/qr'

/** New offline materials — neutral campaign. */
const NEW_QR_URL =
  'https://xn----otbhfdlo0i.xn--p1ai/?utm_source=offline&utm_medium=qr&utm_campaign=yumi_offline'
const NEW_QR_URL_CYRILLIC =
  'https://юми-корм.рф/?utm_source=offline&utm_medium=qr&utm_campaign=yumi_offline'

const OPTIONS = {
  errorCorrectionLevel: 'H',
  margin: 2,
  color: { dark: '#000000', light: '#FFFFFF' },
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  // Новые материалы — отдельные файлы, не перезаписывают напечатанные yumi-main.*
  const svgPath = path.join(OUT_DIR, 'yumi-offline.svg')
  const pngPath = path.join(OUT_DIR, 'yumi-offline.png')

  await QRCode.toFile(svgPath, NEW_QR_URL, { ...OPTIONS, type: 'svg' })
  await QRCode.toFile(pngPath, NEW_QR_URL, { ...OPTIONS, type: 'png', width: 2048 })

  console.log('✅ Новый QR (yumi_offline) сгенерирован')
  console.log(`   URL (punycode): ${NEW_QR_URL}`)
  console.log(`   URL (кириллица): ${NEW_QR_URL_CYRILLIC}`)
  console.log(`   SVG: ${svgPath}`)
  console.log(`   PNG: ${pngPath} (2048×2048, ECC H)`)
  console.log('')
  console.log('ℹ️  Напечатанные ранее коды (yumi-main.*) по-прежнему ведут на /qr')
  console.log(`   Legacy path: ${LEGACY_QR_PATH}`)
  console.log(`   Legacy path (кириллица): ${LEGACY_QR_PATH_CYRILLIC}`)
  console.log('   /qr сохраняет utm_campaign=launch_first_clients для старой аналитики.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
