import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DEST_ROOT = path.join(ROOT, 'public', 'products')

const MAX_WIDTH = 1200
const WEBP_QUALITY = 82
const IMAGE_EXT = new Set(['.jpeg', '.jpg', '.png', '.webp', '.heic'])

const CATEGORIES = ['govyadina', 'baranina', 'ptica', 'krolik', 'svinina', 'pechenye']

/**
 * Явная карта: имя исходного файла (без расширения) -> { category, slug }.
 * Для товаров, которые уже есть в src/data/products.ts, slug совпадает со slug
 * товара, поэтому imagePaths в базе уже указывают на нужную папку.
 * Несколько файлов с одинаковым slug => 01.webp, 02.webp по порядку.
 */
const MAP = {
  // ── ГОВЯДИНА ──
  'Аорта говяжья (Суш)': { category: 'govyadina', slug: 'aorta-govyazhya' },
  'Аорта говяжья': { category: 'govyadina', slug: 'aorta-govyazhya' },
  'Вымя говяжье': { category: 'govyadina', slug: 'vymya-govyazhe' },
  'Вымя сушеное': { category: 'govyadina', slug: 'vymya-sushenoe' },
  'Жилка говяжья': { category: 'govyadina', slug: 'zhilka-govyazhya' },
  'Калтык говяжий': { category: 'govyadina', slug: 'kaltyk-govyazhiy' },
  'Коленки говяжьи сушенные': { category: 'govyadina', slug: 'kolenki-govyazhi-sushenye' },
  'Легкое говяжье (крупный кусок)': { category: 'govyadina', slug: 'legkoe-govyazhe-1x1' },
  'Мясо ковядины кусочки сухое': { category: 'govyadina', slug: 'myaso-govyadiny-kusochki' },
  'Мясо пищевода говяжье': { category: 'govyadina', slug: 'myaso-pishchevoda-govyazhe' },
  'Нога говяжья сушеная': { category: 'govyadina', slug: 'noga-govyazhya-sushenaya' },
  'Носы говяжьи натуральные с (шерстью)': { category: 'govyadina', slug: 'nosy-govyazhi-s-sherstyu' },
  'Носы говяжьи': { category: 'govyadina', slug: 'nosy-govyazhi' },
  'Печень говяжья кусочки сушеные': { category: 'govyadina', slug: 'pechen-govyazhya-1x1' },
  'Печень говяжья': { category: 'govyadina', slug: 'pechen-govyazhya' },
  'Рубец говяжий сш': { category: 'govyadina', slug: 'rubec-govyazhiy-sushenyy' },
  'Семенники кусочки сушеные (Мелкие)': { category: 'govyadina', slug: 'semenniki-kusochki-sushenye' },
  'Сердце говяжье суш': { category: 'govyadina', slug: 'serdce-govyazhe-sushenoe' },
  'Трахея колечки': { category: 'govyadina', slug: 'traheya-govyazhya' },
  'Трахея ракушки': { category: 'govyadina', slug: 'traheya-rakushki' },
  'Уши говяжьи': { category: 'govyadina', slug: 'ushi-govyazhi' },
  'Хвост говяжий сушеный': { category: 'govyadina', slug: 'hvost-govyazhiy-sushenyy' },
  'Хвост говяжий': { category: 'govyadina', slug: 'hvost-govyazhiy-sushenyy' },
  'Хрящ лопаточный': { category: 'govyadina', slug: 'hryashch-lopatochnyy' },

  // ── БАРАНИНА ──
  'Легкое баранина': { category: 'baranina', slug: 'legkoe-barane' },
  'Нога баранья Суш': { category: 'baranina', slug: 'noga-baranya-sushenaya' },
  'Рубец бараний сушенный кусочки': { category: 'baranina', slug: 'rubec-baraniy' },
  'Трахея баранья сушеная': { category: 'baranina', slug: 'traheya-baranya-sushenaya' },

  // ── ПТИЦА ──
  'Головы перепилные': { category: 'ptica', slug: 'golovy-perepelinye' },
  'Головы утиные сушеные': { category: 'ptica', slug: 'golovy-utinye-sushenye' },
  'Головый индейки сушеные': { category: 'ptica', slug: 'golovy-indeyki-sushenye' },
  'Лапки утиные': { category: 'ptica', slug: 'lapki-utinye' },
  'Мясо Индейки суш': { category: 'ptica', slug: 'myaso-indeyki-sushenoe' },
  'Мясо индейки кусочки суш': { category: 'ptica', slug: 'myaso-indeyki-1x1' },
  'Сердчеки куриные': { category: 'ptica', slug: 'serdechki-kurinye' },
  'Утиные желудки': { category: 'ptica', slug: 'utinye-zheludki' },
  'Шея индейки сушеная': { category: 'ptica', slug: 'sheya-indeyki-sushenaya' },

  // ── КРОЛИК ──
  'Лапы кролика сушеные': { category: 'krolik', slug: 'lapy-krolika' },
  'Уши кролика сушеные': { category: 'krolik', slug: 'ushi-krolika' },

  // ── СВИНИНА ──
  'Уши Свинные сух': { category: 'svinina', slug: 'ushi-svinye' },

  // ── ПЕЧЕНЬЕ ──
  'Печенье изиндейки': { category: 'pechenye', slug: 'pechenye-iz-indeyki' },
  'Печенье из кролика суш': { category: 'pechenye', slug: 'pechenye-iz-krolika' },
}

const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'shch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[()]/g, ' ')
    .split('')
    .map((ch) => (ch in TRANSLIT ? TRANSLIT[ch] : ch))
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function detectCategory(name) {
  const n = name.toLowerCase()
  if (n.includes('печенье')) return 'pechenye'
  if (n.includes('баран')) return 'baranina'
  if (n.includes('кролик')) return 'krolik'
  if (n.includes('свин')) return 'svinina'
  if (/индейк|утин|утк|перепел|перепил|курин|куриц|гус/.test(n)) return 'ptica'
  if (/говя|ковя|калтык|аорта|вымя|рубец|жилк|коленк|хвост|сердц|хрящ|семенник|нос/.test(n)) {
    return 'govyadina'
  }
  return null
}

async function findSourceDir() {
  const candidates = [
    process.env.YUMI_PHOTOS_SRC,
    path.join(ROOT, 'photos'),
    path.join(ROOT, 'product-photos'),
    path.join(ROOT, 'source-photos'),
    path.join(os.homedir(), 'Desktop', 'Юми'),
    path.join(os.homedir(), 'Desktop', 'ЮМи'),
    path.join(os.homedir(), 'Desktop', 'Yumi'),
    path.join(os.homedir(), 'Downloads', 'Юми'),
    path.join(os.homedir(), 'Downloads', 'Yumi'),
  ].filter(Boolean)

  for (const dir of candidates) {
    try {
      const entries = await fs.readdir(dir)
      const hasImages = entries.some((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
      if (hasImages) return dir
    } catch {
      // not found, continue
    }
  }
  return null
}

function isLogo(name) {
  return /логотип|logo/i.test(name)
}

async function main() {
  const srcDir = await findSourceDir()
  if (!srcDir) {
    console.error('❌ Не найдена папка с исходными фото (Юми / photos / product-photos).')
    console.error('   Укажите путь через переменную окружения YUMI_PHOTOS_SRC.')
    process.exit(1)
  }
  console.log(`📂 Источник фото: ${srcDir}\n`)

  const entries = (await fs.readdir(srcDir))
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .filter((f) => !isLogo(f))
    .sort((a, b) => a.localeCompare(b, 'ru'))

  // Группируем по category/slug
  const groups = new Map()
  const unsortedNote = []

  for (const file of entries) {
    // macOS хранит имена в NFD (й = и + U+0306) — нормализуем в NFC,
    // иначе ключи карты и транслитерация не совпадут.
    const base = path.parse(file).name.trim().normalize('NFC')
    let entry = MAP[base]
    if (!entry) {
      const category = detectCategory(base)
      const slug = slugify(base)
      if (category) {
        entry = { category, slug }
      } else {
        entry = { category: '_unsorted', slug }
        unsortedNote.push(file)
      }
    }
    const key = `${entry.category}/${entry.slug}`
    if (!groups.has(key)) groups.set(key, { ...entry, files: [] })
    groups.get(key).files.push(file)
  }

  const report = {
    found: entries.length,
    converted: 0,
    byCategory: {},
    unsorted: [],
    products: [],
    sizesKb: [],
  }

  for (const [key, group] of [...groups.entries()].sort()) {
    const destDir = path.join(DEST_ROOT, group.category, group.slug)
    await fs.mkdir(destDir, { recursive: true })

    const sortedFiles = group.files.sort((a, b) => a.localeCompare(b, 'ru'))
    const imagePaths = []

    for (let i = 0; i < sortedFiles.length; i++) {
      const srcFile = path.join(srcDir, sortedFiles[i])
      const outName = `${String(i + 1).padStart(2, '0')}.webp`
      const outFile = path.join(destDir, outName)

      await sharp(srcFile)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outFile)

      const stat = await fs.stat(outFile)
      const kb = Math.round(stat.size / 1024)
      report.converted += 1
      report.sizesKb.push(kb)
      imagePaths.push(`/products/${group.category}/${group.slug}/${outName}`)
    }

    if (group.category === '_unsorted') {
      report.unsorted.push({ slug: group.slug, files: sortedFiles, imagePaths })
    } else {
      report.byCategory[group.category] = (report.byCategory[group.category] || 0) + 1
      report.products.push({
        category: group.category,
        slug: group.slug,
        sources: sortedFiles,
        imagePaths,
      })
    }
  }

  // ─── ОТЧЁТ ───
  const avg = report.sizesKb.length
    ? Math.round(report.sizesKb.reduce((a, b) => a + b, 0) / report.sizesKb.length)
    : 0
  const min = report.sizesKb.length ? Math.min(...report.sizesKb) : 0
  const max = report.sizesKb.length ? Math.max(...report.sizesKb) : 0

  console.log('═══════════════ ОТЧЁТ ═══════════════')
  console.log(`Исходных фото найдено:   ${report.found}`)
  console.log(`Конвертировано в WebP:   ${report.converted}`)
  console.log(`Папок товаров создано:   ${report.products.length}`)
  console.log(`Размер webp (КБ):        avg ${avg} · min ${min} · max ${max}`)
  console.log('')
  console.log('По категориям:')
  for (const cat of CATEGORIES) {
    if (report.byCategory[cat]) console.log(`  ${cat.padEnd(12)} ${report.byCategory[cat]} товаров`)
  }
  console.log('')
  console.log('Товары и фото:')
  for (const p of report.products) {
    console.log(`  [${p.category}] ${p.slug} ← ${p.sources.join(', ')}`)
  }
  if (report.unsorted.length) {
    console.log('')
    console.log('⚠️  В _unsorted (категория не определена):')
    for (const u of report.unsorted) console.log(`  ${u.slug} ← ${u.files.join(', ')}`)
  } else {
    console.log('')
    console.log('_unsorted: пусто ✅')
  }

  // Записываем манифест для сверки с базой
  const manifest = {
    generatedAt: new Date().toISOString(),
    products: report.products.map((p) => ({
      category: p.category,
      slug: p.slug,
      imagePaths: p.imagePaths,
    })),
    unsorted: report.unsorted,
  }
  await fs.writeFile(
    path.join(ROOT, 'src', 'data', 'product-images.generated.json'),
    JSON.stringify(manifest, null, 2),
    'utf8',
  )
  console.log('\n📝 Манифест: src/data/product-images.generated.json')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
