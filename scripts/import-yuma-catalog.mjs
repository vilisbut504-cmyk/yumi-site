/**
 * Импорт каталога ЮМИ из двух Excel-файлов:
 *   data/import/Проект ЮМА.xlsx     — наименования, фасовка, цены сайта (G/H)
 *   data/import/Новая таблица.xlsx  — встроенные фото товаров
 *
 * Что делает:
 *   - читает цены сайта из колонок G (за 100 г) и H (за 1 кг);
 *     закупочные колонки D/E НЕ используются и нигде не сохраняются;
 *   - пропускает строки-категории (Говядина, Баранина, Птица, Кролик, Свинина, Печенье);
 *   - товары без цены сайта помечает статусом no_price (не продаются, скрыты);
 *   - извлекает встроенные фото из «Новая таблица.xlsx» (xl/media + drawing1.xml),
 *     сопоставляя их с товарами по строкам/наименованию;
 *   - конвертирует фото в WebP (max 1200px, q82) в
 *     public/products/<categorySlug>/<productSlug>/01.webp;
 *   - генерирует src/data/products.ts (совместим с текущей архитектурой).
 *
 * Запуск: npm run import:yuma
 */
import { promises as fs } from 'node:fs'
import { existsSync, mkdtempSync, rmSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import XLSX from 'xlsx'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PRICE_XLSX = path.join(ROOT, 'data', 'import', 'Проект ЮМА.xlsx')
const PHOTO_XLSX = path.join(ROOT, 'data', 'import', 'Новая таблица.xlsx')
const DEST_ROOT = path.join(ROOT, 'public', 'products')
const PRODUCTS_TS = path.join(ROOT, 'src', 'data', 'products.ts')
const MANIFEST = path.join(ROOT, 'src', 'data', 'product-images.generated.json')

const MAX_WIDTH = 1200
const WEBP_QUALITY = 82

const CATEGORY_NAMES = ['Говядина', 'Баранина', 'Птица', 'Кролик', 'Свинина', 'Печенье']
const CATEGORY_SLUG = {
  Говядина: 'govyadina',
  Баранина: 'baranina',
  Птица: 'ptica',
  Кролик: 'krolik',
  Свинина: 'svinina',
  Печенье: 'pechenye',
}

const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'shch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
}

/** slug: транслитерация наименования (+ фасовки для уникальности). */
function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFC')
    .replace(/ё/g, 'е')
    // размерность вида 1х1 / 2,5*2,5 → 1x1 / 2.5x2.5 (только между цифрами)
    .replace(/(\d)\s*[*х×]\s*(\d)/g, '$1x$2')
    .replace(/[()]/g, ' ')
    .replace(/,/g, '-')
    .split('')
    .map((ch) => (ch in TRANSLIT ? TRANSLIT[ch] : ch))
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Ключ для сопоставления товаров между двумя файлами. */
function matchKey(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFC')
    .replace(/ё/g, 'е')
    .replace(/,/g, '.')
    .replace(/(\d)\s*см/g, '$1')
    .replace(/шт\.?/g, ' ')
    .replace(/[*х×]/g, 'x')
    .replace(/[^a-zа-я0-9x.]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

/** Отображаемая фасовка: 1х1 → 1×1, оставить как есть для диапазонов. */
function displayFormat(raw) {
  if (raw == null) return ''
  const s = String(raw).trim()
  if (!s || s.toLowerCase() === 'шт' || s.toLowerCase() === 'шт.') return ''
  return s.replace(/[*х]/g, '×')
}

function isPieceUnit(name, format) {
  return /\bшт\b|\bшт\.?/.test(`${name} ${format ?? ''}`.toLowerCase())
}

function detectPoultryProtein(name) {
  const n = name.toLowerCase()
  if (/индейк/.test(n)) return 'Индейка'
  if (/перепел|перепил/.test(n)) return 'Перепел'
  if (/утин|утк|утя/.test(n)) return 'Утка'
  if (/курин|куриц|куры/.test(n)) return 'Курица'
  if (/гус/.test(n)) return 'Гусь'
  return 'Птица'
}

function proteinFor(category, name) {
  switch (category) {
    case 'Говядина':
      return 'Говядина'
    case 'Баранина':
      return 'Баранина'
    case 'Свинина':
      return 'Свинина'
    case 'Кролик':
      return 'Кролик'
    case 'Птица':
      return detectPoultryProtein(name)
    case 'Печенье':
      return detectPoultryProtein(name)
    default:
      return category
  }
}

function hardnessFor(name, format) {
  const n = `${name} ${format ?? ''}`.toLowerCase()
  if (/корень|нога|коленк|хвост|хрящ|копыт|бычий/.test(n)) return 'плотное'
  if (/трахея|ухо|уши|вымя|жилк|калтык|нос|пятак|гребеш|аорта/.test(n)) return 'жевательное'
  if (/чипсы|мелк|1x1|печенье/.test(n)) return 'мягкое'
  return 'среднее'
}

const TEXTURE_BY_HARDNESS = {
  мягкое: 'Лёгкое, хрустящее',
  среднее: 'Плотное, мясное',
  плотное: 'Плотное, твёрдое',
  жевательное: 'Волокнистое, упругое',
}

function purposesFor(hardness, name, format) {
  const n = `${name} ${format ?? ''}`.toLowerCase()
  if (hardness === 'мягкое' || /1x1|мелк|чипсы|печенье/.test(n)) {
    return ['Дрессировка', 'Поощрение']
  }
  if (hardness === 'плотное') return ['Длительное жевание', 'Для занятости']
  return ['Длительное жевание', 'Поощрение']
}

function dogSizesFor(name) {
  const n = name.toLowerCase()
  if (/нога|корень|коленк|хвост|голов|бычий/.test(n)) return ['Средние', 'Крупные']
  return ['Малые', 'Средние', 'Крупные']
}

// ─────────────────────────── ПАРСИНГ ЦЕН ───────────────────────────

function parsePriceFile() {
  const wb = XLSX.readFile(PRICE_XLSX)
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null, blankrows: false })

  const items = []
  let currentCategory = 'Говядина' // первый блок без явного заголовка

  for (const row of rows) {
    const num = row[0]
    const name = row[1] != null ? String(row[1]).trim() : ''
    if (!name) continue

    // Строка-категория: имя из списка категорий (без номера) → переключаем категорию
    if (CATEGORY_NAMES.includes(name)) {
      currentCategory = name
      continue
    }

    // Товарная строка ВСЕГДА имеет числовой порядковый номер в колонке A.
    // Строки-заголовки («Закупка товара», «Наименование») номера не имеют — пропускаем.
    if (typeof num !== 'number') continue

    const format = row[2] != null ? String(row[2]).trim() : ''
    const g = row[6] // цена сайта за 100 г
    const h = row[7] // цена сайта за 1 кг
    const price100g = typeof g === 'number' && g > 0 ? Math.round(g) : null
    const pricePerKg = typeof h === 'number' && h > 0 ? Math.round(h) : null

    items.push({
      category: currentCategory,
      name,
      format,
      price100g,
      pricePerKg,
    })
  }
  return items
}

// ─────────────────────────── ПАРСИНГ ФОТО ───────────────────────────

/**
 * Извлекает каталог фото из «Новая таблица.xlsx».
 * Возвращает { extractDir, byKey: Map<matchKey, string[] media files>, byCategory }
 */
function parsePhotoFile() {
  // 1) распаковываем xlsx во временную папку
  const extractDir = mkdtempSync(path.join(os.tmpdir(), 'yuma-photos-'))
  execFileSync('unzip', ['-o', '-q', PHOTO_XLSX, '-d', extractDir])

  // 2) drawing rels: rId -> media file
  const relsPath = path.join(extractDir, 'xl', 'drawings', '_rels', 'drawing1.xml.rels')
  const drawingPath = path.join(extractDir, 'xl', 'drawings', 'drawing1.xml')
  const rels = existsSync(relsPath) ? readText(relsPath) : ''
  const drawing = existsSync(drawingPath) ? readText(drawingPath) : ''

  const relMap = {}
  for (const m of rels.matchAll(/Id="(rId\d+)"[^>]*Target="\.\.\/media\/([^"]+)"/g)) {
    relMap[m[1]] = m[2]
  }

  // 3) anchors: from.row (0-based) -> media
  const rowToMedia = new Map()
  const anchors = drawing.split(/<xdr:(?:oneCellAnchor|twoCellAnchor)/).slice(1)
  for (const a of anchors) {
    const rowM = a.match(/<xdr:from>[\s\S]*?<xdr:row>(\d+)<\/xdr:row>/)
    const embM = a.match(/r:embed="(rId\d+)"/)
    if (rowM && embM && relMap[embM[1]]) {
      rowToMedia.set(Number(rowM[1]), relMap[embM[1]])
    }
  }

  // 4) читаем Лист2 по реальным индексам строк (drawing.row === sheet row, 0-based)
  const wb = XLSX.readFile(PHOTO_XLSX)
  const ws = wb.Sheets['Лист2'] || wb.Sheets[wb.SheetNames[0]]
  const range = XLSX.utils.decode_range(ws['!ref'])

  // matchKey -> очередь media-файлов (в порядке строк)
  const byKey = new Map()
  let extracted = 0

  for (let r = range.s.r; r <= range.e.r; r++) {
    const numCell = ws[XLSX.utils.encode_cell({ r, c: 0 })]
    const nameCell = ws[XLSX.utils.encode_cell({ r, c: 1 })]
    const cCell = ws[XLSX.utils.encode_cell({ r, c: 2 })]
    const name = nameCell ? String(nameCell.v).trim() : ''
    if (!name) continue
    // категория-заголовок
    if ((numCell == null || numCell.v == null) && CATEGORY_NAMES.includes(name)) continue

    const cVal = cCell ? String(cCell.v).trim().toLowerCase() : ''
    if (cVal === 'нет') continue // фото намеренно отсутствует

    const media = rowToMedia.get(r)
    if (!media) continue

    const key = matchKey(name)
    if (!byKey.has(key)) byKey.set(key, [])
    byKey.get(key).push(path.join(extractDir, 'xl', 'media', media))
    extracted += 1
  }

  return { extractDir, byKey, extracted }
}

function readText(p) {
  return readFileSync(p, 'utf8')
}

// ─────────────────────────── ОСНОВНОЙ ПОТОК ───────────────────────────

async function main() {
  if (!existsSync(PRICE_XLSX)) throw new Error(`Не найден файл цен: ${PRICE_XLSX}`)
  if (!existsSync(PHOTO_XLSX)) throw new Error(`Не найден файл фото: ${PHOTO_XLSX}`)

  console.log('📥 Читаю цены из «Проект ЮМА.xlsx»…')
  const priceItems = parsePriceFile()
  console.log(`   Товарных строк (без категорий): ${priceItems.length}`)

  console.log('🖼  Извлекаю фото из «Новая таблица.xlsx»…')
  const { extractDir, byKey, extracted } = parsePhotoFile()
  console.log(`   Привязанных фото найдено: ${extracted}`)

  // Чистим public/products перед перегенерацией (избегаем «осиротевших» картинок)
  if (existsSync(DEST_ROOT)) rmSync(DEST_ROOT, { recursive: true, force: true })

  const usedKey = new Map() // key -> сколько раз уже выдали из очереди
  const usedSlugs = new Set()

  const products = []
  let converted = 0
  let active = 0
  let noPrice = 0
  const withoutPhoto = []

  for (const item of priceItems) {
    const categorySlug = CATEGORY_SLUG[item.category] || slugify(item.category)
    const format = displayFormat(item.format)

    // уникальный slug (наименование + фасовка)
    let baseSlug = slugify(format ? `${item.name} ${item.format}` : item.name)
    if (!baseSlug) baseSlug = slugify(item.name) || 'tovar'
    let slug = baseSlug
    let n = 2
    while (usedSlugs.has(slug)) slug = `${baseSlug}-${n++}`
    usedSlugs.add(slug)

    // фото: ищем по ключу наименование+фасовка, затем по наименованию
    const keyFull = matchKey(format ? `${item.name} ${item.format}` : item.name)
    const keyName = matchKey(item.name)
    let mediaFile = takeMedia(byKey, usedKey, keyFull) || takeMedia(byKey, usedKey, keyName)

    const imagePaths = []
    if (mediaFile) {
      const destDir = path.join(DEST_ROOT, categorySlug, slug)
      await fs.mkdir(destDir, { recursive: true })
      const outFile = path.join(destDir, '01.webp')
      await sharp(mediaFile)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outFile)
      converted += 1
      imagePaths.push(`/products/${categorySlug}/${slug}/01.webp`)
    } else {
      withoutPhoto.push(`${item.category} · ${item.name}${format ? ` (${format})` : ''}`)
    }

    const unit = isPieceUnit(item.name, item.format) ? 'piece' : 'weight'
    const weight = unit === 'piece' ? '1 шт' : '100 г'
    const hasPrice = item.price100g != null && item.price100g > 0
    const status = hasPrice ? 'active' : 'no_price'
    if (hasPrice) active += 1
    else noPrice += 1

    const protein = proteinFor(item.category, item.name)
    const hardness = hardnessFor(item.name, item.format)
    const texture = TEXTURE_BY_HARDNESS[hardness]
    const purposes = purposesFor(hardness, item.name, item.format)
    const dogSizes = dogSizesFor(item.name)

    products.push({
      id: slug,
      slug,
      name: item.name,
      category: item.category,
      protein,
      purposes,
      dogSizes,
      texture,
      hardness,
      format,
      unit,
      weight,
      price: hasPrice ? item.price100g : 0,
      price100g: item.price100g,
      pricePerKg: item.pricePerKg,
      status,
      imagePaths,
      shortDescription:
        'Натуральное сушёное лакомство для собак — дополнение к основному рациону.',
      composition: `${item.name}. Без искусственных добавок, соли и консервантов.`,
      tags: [protein, 'Натуральное'],
      isFeatured: false,
    })
  }

  // featured: первые 6 активных
  let featuredCount = 0
  for (const p of products) {
    if (p.status === 'active' && featuredCount < 6) {
      p.isFeatured = true
      featuredCount += 1
    }
  }

  await writeProductsTs(products)
  await writeManifest(products)

  rmSync(extractDir, { recursive: true, force: true })

  // ─── ОТЧЁТ ───
  console.log('\n═══════════════ ОТЧЁТ ИМПОРТА ═══════════════')
  console.log(`Импортировано товаров:        ${products.length}`)
  console.log(`  активных (с ценой):         ${active}`)
  console.log(`  скрыто (no_price):          ${noPrice}`)
  console.log(`Фото извлечено и сконвертировано: ${converted}`)
  console.log(`Товаров без фото:             ${withoutPhoto.length}`)
  if (withoutPhoto.length) {
    console.log('\nБез фото:')
    for (const w of withoutPhoto) console.log(`  • ${w}`)
  }
  console.log('\nФайлы:')
  console.log(`  src/data/products.ts`)
  console.log(`  src/data/product-images.generated.json`)
  console.log(`  public/products/<category>/<slug>/01.webp`)
}

function takeMedia(byKey, usedKey, key) {
  const queue = byKey.get(key)
  if (!queue || !queue.length) return null
  const idx = usedKey.get(key) || 0
  if (idx >= queue.length) return null
  usedKey.set(key, idx + 1)
  return queue[idx]
}

async function writeProductsTs(products) {
  const header = `// ВНИМАНИЕ: файл сгенерирован scripts/import-yuma-catalog.mjs.
// Не редактируйте вручную — запустите: npm run import:yuma
//
// Публичные цены сайта (за 100 г и за 1 кг) импортированы из data/import/Проект ЮМА.xlsx
// (колонки G и H). Закупочные/внутренние цены (колонки D/E) НЕ импортируются
// и нигде в проекте не хранятся.

export type ProductHardness = 'мягкое' | 'среднее' | 'плотное' | 'жевательное'
export type ProductUnit = 'weight' | 'piece'
export type ProductStatus = 'active' | 'draft' | 'no_price'

export type Product = {
  id: string
  slug: string
  name: string
  category: string
  protein: string
  purposes: string[]
  dogSizes: string[]
  texture: string
  hardness: ProductHardness
  format: string
  unit: ProductUnit
  weight: string
  price: number
  price100g: number | null
  pricePerKg: number | null
  status: ProductStatus
  imagePaths: string[]
  shortDescription: string
  composition: string
  howToUse: string
  storage: string
  warning: string
  tags: string[]
  isFeatured: boolean
}

const NOT_A_MEAL = 'Не является заменой основного рациона.'
const STORAGE_DEFAULT =
  'Хранить в сухом прохладном месте, в закрытой упаковке, вдали от прямых солнечных лучей.'
const USE_DEFAULT =
  'Давайте как дополнение к основному рациону. Вводите постепенно и следите за реакцией собаки. Обеспечьте доступ к свежей воде.'

`

  const raw = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    protein: p.protein,
    purposes: p.purposes,
    dogSizes: p.dogSizes,
    texture: p.texture,
    hardness: p.hardness,
    format: p.format,
    unit: p.unit,
    weight: p.weight,
    price: p.price,
    price100g: p.price100g,
    pricePerKg: p.pricePerKg,
    status: p.status,
    imagePaths: p.imagePaths,
    shortDescription: p.shortDescription,
    composition: p.composition,
    tags: p.tags,
    isFeatured: p.isFeatured,
  }))

  const body = `const RAW = ${JSON.stringify(raw, null, 2)} as const

export const products: Product[] = RAW.map((p) => ({
  ...p,
  purposes: [...p.purposes],
  dogSizes: [...p.dogSizes],
  tags: [...p.tags],
  imagePaths: [...p.imagePaths],
  howToUse: USE_DEFAULT,
  storage: STORAGE_DEFAULT,
  warning: NOT_A_MEAL,
})) as Product[]

export const PRODUCT_CATEGORIES = [
  'Говядина',
  'Баранина',
  'Птица',
  'Кролик',
  'Свинина',
  'Печенье',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export default products
`

  await fs.writeFile(PRODUCTS_TS, header + body, 'utf8')
}

async function writeManifest(products) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    source: 'import-yuma-catalog',
    products: products.map((p) => ({
      slug: p.slug,
      category: p.category,
      status: p.status,
      imagePaths: p.imagePaths,
    })),
  }
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2), 'utf8')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
