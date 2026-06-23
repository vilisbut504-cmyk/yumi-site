// Импорт товаров ЮМИ из Excel и генерация публичного src/data/products.ts.
//
// Источник цен: data/Юми Сушка (1).xlsx, лист «Сравнение Цен».
// Берём ТОЛЬКО публичные цены с наценкой 30%:
//   price100g  ← блок «Стоимость с наценкой за 100г» → «Наценка 30%»
//   pricePerKg ← блок «Стоимость с наценкой за 1кг»  → «Наценка 30%»
// В публичный файл НЕ попадают: закупка, себестоимость, упаковка, маржа,
// цены конкурентов, поставщик.
//
// Запуск: npm run import:products

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import XLSX from 'xlsx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const EXCEL_PATH = path.join(ROOT, 'data', 'Юми Сушка (1).xlsx')
const SHEET_NAME = 'Сравнение Цен'
const IMAGES_JSON = path.join(ROOT, 'src', 'data', 'product-images.generated.json')
const OUT_PATH = path.join(ROOT, 'src', 'data', 'products.ts')

// Колонки листа «Сравнение Цен» (0-based)
const COL_NAME = 0
const COL_BUY = 1 // закупка — не экспортируем
const COL_P100_30 = 9 // наценка 30% за 100 г
const COL_PKG_30 = 12 // наценка 30% за 1 кг

function normalize(value) {
  return String(value ?? '')
    .normalize('NFC')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/×/g, 'x') // знак умножения → x
    .replace(/(\d)\s*[хx]\s*(\d)/g, '$1x$2') // 1х1 / 1x1 → 1x1 (не трогаем «хрящ», «трахея»)
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const TEXTURE_BY_HARDNESS = {
  мягкое: 'Лёгкое, воздушное',
  среднее: 'Плотное, мясное',
  плотное: 'Плотное, хрустящее',
  жевательное: 'Волокнистое, упругое',
}

const ALL_SIZES = ['Малые', 'Средние', 'Крупные']
const BIG_SIZES = ['Средние', 'Крупные']
const SMALL_SIZES = ['Малые', 'Средние']

// Ручная карта: нормализованное имя из Excel → публичные атрибуты товара.
// photo — slug папки в public/products (или null, если фото нет → fallback).
const MAP = {
  // ─── Говядина ───
  'рубец говяжий': { slug: 'rubec-govyazhiy-sushenyy', name: 'Рубец говяжий сушёный', protein: 'Говядина', format: '', hardness: 'жевательное', purposes: ['Длительное жевание', 'Поощрение'], photo: 'rubec-govyazhiy-sushenyy', composition: '100% говяжий рубец. Без добавок, соли и консервантов.', featured: true },
  'легкое крупный кусок пластины': { slug: 'legkoe-govyazhe-plastiny', name: 'Лёгкое говяжье сушёное, пластины', protein: 'Говядина', format: 'пластины', hardness: 'мягкое', purposes: ['Поощрение', 'Дрессировка'], photo: null, composition: '100% говяжье лёгкое. Без добавок и консервантов.' },
  'легкое средний кусок 2,5x2,5 см': { slug: 'legkoe-govyazhe-2-5', name: 'Лёгкое говяжье сушёное, 2,5×2,5 см', protein: 'Говядина', format: '2,5×2,5 см', hardness: 'мягкое', purposes: ['Поощрение', 'Дрессировка'], photo: null, composition: '100% говяжье лёгкое. Без добавок и консервантов.' },
  'легкое мелкое 1x1 см': { slug: 'legkoe-govyazhe-1x1', name: 'Лёгкое говяжье сушёное, кубики 1×1', protein: 'Говядина', format: 'кубики 1×1', hardness: 'мягкое', purposes: ['Дрессировка', 'Поощрение'], photo: 'legkoe-govyazhe-1x1', composition: '100% говяжье лёгкое. Без добавок и консервантов.', featured: true },
  'сердце говяжье': { slug: 'serdce-govyazhe-sushenoe', name: 'Сердце говяжье сушёное', protein: 'Говядина', format: '', hardness: 'среднее', purposes: ['Поощрение', 'Дрессировка'], photo: 'serdce-govyazhe-sushenoe', composition: '100% говяжье сердце. Без добавок и консервантов.' },
  'коленки говяжьи': { slug: 'kolenki-govyazhi-sushenye', name: 'Коленки говяжьи сушёные', protein: 'Говядина', format: '', hardness: 'плотное', purposes: ['Длительное жевание', 'Для занятости'], dogSizes: BIG_SIZES, photo: 'kolenki-govyazhi-sushenye', composition: '100% говяжьи коленные хрящи. Без добавок и консервантов.' },
  'мясо пищевода говяжье': { slug: 'myaso-pishchevoda-govyazhe', name: 'Мясо пищевода говяжье сушёное', protein: 'Говядина', format: '', hardness: 'жевательное', purposes: ['Длительное жевание'], photo: 'myaso-pishchevoda-govyazhe', composition: '100% говяжий пищевод. Без добавок и консервантов.' },
  'мясо говядина 1x1 см': { slug: 'myaso-govyadiny-kusochki', name: 'Мясо говядины сушёное, кубики 1×1', protein: 'Говядина', format: 'кубики 1×1', hardness: 'среднее', purposes: ['Дрессировка', 'Поощрение'], photo: 'myaso-govyadiny-kusochki', composition: '100% мясо говядины. Без добавок и консервантов.' },
  'бычий корень улитка бублик': { slug: 'bychiy-koren-ulitka', name: 'Бычий корень сушёный, улитка', protein: 'Говядина', format: 'улитка', hardness: 'плотное', purposes: ['Длительное жевание', 'Для занятости'], dogSizes: BIG_SIZES, photo: null, composition: '100% говяжий бычий корень. Без добавок и консервантов.' },
  'бычий корень 10-15см': { slug: 'bychiy-koren-10-15', name: 'Бычий корень сушёный, 10–15 см', protein: 'Говядина', format: '10–15 см', hardness: 'плотное', purposes: ['Длительное жевание', 'Для занятости'], dogSizes: BIG_SIZES, photo: null, composition: '100% говяжий бычий корень. Без добавок и консервантов.' },
  'бычий корень 20-25см': { slug: 'bychiy-koren-20-25', name: 'Бычий корень сушёный, 20–25 см', protein: 'Говядина', format: '20–25 см', hardness: 'плотное', purposes: ['Длительное жевание', 'Для занятости'], dogSizes: BIG_SIZES, photo: null, composition: '100% говяжий бычий корень. Без добавок и консервантов.' },
  'жилка говяжья': { slug: 'zhilka-govyazhya', name: 'Жилка говяжья сушёная', protein: 'Говядина', format: '', hardness: 'плотное', purposes: ['Длительное жевание', 'Для занятости'], photo: 'zhilka-govyazhya', composition: '100% говяжьи сухожилия. Без добавок и консервантов.' },
  'хрящ лопаточный': { slug: 'hryashch-lopatochnyy', name: 'Хрящ говяжий лопаточный сушёный', protein: 'Говядина', format: '', hardness: 'плотное', purposes: ['Длительное жевание'], photo: 'hryashch-lopatochnyy', composition: '100% говяжий хрящ. Без добавок и консервантов.' },
  'трахея трубка': { slug: 'traheya-govyazhya-trubka', name: 'Трахея говяжья сушёная, трубка', protein: 'Говядина', format: 'трубка', hardness: 'жевательное', purposes: ['Длительное жевание', 'Для занятости'], photo: null, composition: '100% говяжья трахея. Без добавок и консервантов.' },
  'трахея ракушка': { slug: 'traheya-rakushki', name: 'Трахея говяжья сушёная, ракушка', protein: 'Говядина', format: 'ракушка', hardness: 'жевательное', purposes: ['Длительное жевание', 'Для занятости'], photo: 'traheya-rakushki', composition: '100% говяжья трахея. Без добавок и консервантов.' },
  'трахея колечки': { slug: 'traheya-govyazhya-kolechki', name: 'Трахея говяжья сушёная, колечки', protein: 'Говядина', format: 'колечки', hardness: 'жевательное', purposes: ['Длительное жевание', 'Для занятости'], photo: 'traheya-govyazhya', composition: '100% говяжья трахея. Без добавок и консервантов.', featured: true },
  'вымя 1x1 см': { slug: 'vymya-govyazhe-1x1', name: 'Вымя говяжье сушёное, кубики 1×1', protein: 'Говядина', format: 'кубики 1×1', hardness: 'плотное', purposes: ['Длительное жевание'], photo: 'vymya-govyazhe', composition: '100% говяжье вымя. Без добавок и консервантов.' },
  'уши говяжьи': { slug: 'ushi-govyazhi', name: 'Уши говяжьи сушёные', protein: 'Говядина', format: '', hardness: 'плотное', purposes: ['Длительное жевание', 'Для занятости', 'Поощрение'], photo: 'ushi-govyazhi', composition: '100% говяжьи уши. Без добавок и консервантов.' },
  'семенники говяж': { slug: 'semenniki-kusochki-sushenye', name: 'Семенники говяжьи сушёные, кусочки', protein: 'Говядина', format: 'кусочки', hardness: 'среднее', purposes: ['Поощрение'], photo: 'semenniki-kusochki-sushenye', composition: '100% говяжьи семенники. Без добавок и консервантов.' },
  'печень говяжья кусочки 1x1': { slug: 'pechen-govyazhya-1x1', name: 'Печень говяжья сушёная, кубики 1×1', protein: 'Говядина', format: 'кубики 1×1', hardness: 'среднее', purposes: ['Дрессировка', 'Поощрение'], photo: 'pechen-govyazhya-1x1', composition: '100% говяжья печень. Без добавок и консервантов.' },

  // ─── Баранина ───
  'рубец бараний': { slug: 'rubec-baraniy', name: 'Рубец бараний сушёный', protein: 'Баранина', format: '', hardness: 'жевательное', purposes: ['Длительное жевание', 'Поощрение'], photo: 'rubec-baraniy', composition: '100% бараний рубец. Без добавок и консервантов.', featured: true },
  'мясо пищевода баранье': { slug: 'myaso-pishchevoda-barane', name: 'Мясо пищевода баранье сушёное', protein: 'Баранина', format: '', hardness: 'жевательное', purposes: ['Длительное жевание'], photo: null, composition: '100% бараний пищевод. Без добавок и консервантов.' },
  'легкое баранье пластины': { slug: 'legkoe-barane-plastiny', name: 'Лёгкое баранье сушёное, пластины', protein: 'Баранина', format: 'пластины', hardness: 'мягкое', purposes: ['Поощрение', 'Дрессировка'], photo: 'legkoe-barane', composition: '100% баранье лёгкое. Без добавок и консервантов.' },
  'легкое баранье 2,5x2,5 см': { slug: 'legkoe-barane-2-5', name: 'Лёгкое баранье сушёное, 2,5×2,5 см', protein: 'Баранина', format: '2,5×2,5 см', hardness: 'мягкое', purposes: ['Поощрение', 'Дрессировка'], photo: null, composition: '100% баранье лёгкое. Без добавок и консервантов.' },
  'легкое баранье 1x1 см': { slug: 'legkoe-barane-1x1', name: 'Лёгкое баранье сушёное, кубики 1×1', protein: 'Баранина', format: 'кубики 1×1', hardness: 'мягкое', purposes: ['Дрессировка', 'Поощрение'], photo: null, composition: '100% баранье лёгкое. Без добавок и консервантов.' },

  // ─── Птица ───
  'головы утиные': { slug: 'golovy-utinye-sushenye', name: 'Головы утиные сушёные', protein: 'Утка', format: '', hardness: 'плотное', purposes: ['Длительное жевание', 'Для занятости'], dogSizes: BIG_SIZES, photo: 'golovy-utinye-sushenye', composition: '100% утиные головы. Без добавок и консервантов.' },
  'головы индейки': { slug: 'golovy-indeyki-sushenye', name: 'Головы индейки сушёные', protein: 'Индейка', format: '', hardness: 'плотное', purposes: ['Длительное жевание', 'Для занятости'], dogSizes: BIG_SIZES, photo: 'golovy-indeyki-sushenye', composition: '100% головы индейки. Без добавок и консервантов.' },
  'мясо индейки 1x1 см': { slug: 'myaso-indeyki-1x1', name: 'Мясо индейки сушёное, кубики 1×1', protein: 'Индейка', format: 'кубики 1×1', hardness: 'среднее', purposes: ['Дрессировка', 'Поощрение', 'Ежедневное лакомство'], photo: 'myaso-indeyki-1x1', composition: '100% мясо индейки. Без добавок и консервантов.', featured: true },
  'лапы утиные': { slug: 'lapki-utinye', name: 'Лапы утиные сушёные', protein: 'Утка', format: '', hardness: 'среднее', purposes: ['Поощрение', 'Длительное жевание'], dogSizes: SMALL_SIZES, photo: 'lapki-utinye', composition: '100% утиные лапы. Без добавок и консервантов.' },
  'утиные желудки': { slug: 'utinye-zheludki', name: 'Желудки утиные сушёные', protein: 'Утка', format: '', hardness: 'среднее', purposes: ['Поощрение', 'Дрессировка'], photo: 'utinye-zheludki', composition: '100% утиные желудки. Без добавок и консервантов.' },
  'шея утиная': { slug: 'sheya-utinaya-sushenaya', name: 'Шея утиная сушёная', protein: 'Утка', format: '', hardness: 'плотное', purposes: ['Длительное жевание', 'Для занятости'], dogSizes: BIG_SIZES, photo: null, composition: '100% утиная шея. Без добавок и консервантов.' },
  'шеи куриные': { slug: 'shei-kurinye-sushenye', name: 'Шеи куриные сушёные', protein: 'Курица', format: '', hardness: 'среднее', purposes: ['Поощрение', 'Длительное жевание'], photo: null, composition: '100% куриные шеи. Без добавок и консервантов.' },
  'гребешки куриные': { slug: 'grebeshki-kurinye-sushenye', name: 'Гребешки куриные сушёные', protein: 'Курица', format: '', hardness: 'среднее', purposes: ['Поощрение'], photo: null, composition: '100% куриные гребешки. Без добавок и консервантов.' },

  // ─── Кролик ───
  'уши кролика': { slug: 'ushi-krolika', name: 'Уши кролика сушёные', protein: 'Кролик', format: 'с ворсом', hardness: 'среднее', purposes: ['Поощрение', 'Длительное жевание'], dogSizes: SMALL_SIZES, photo: 'ushi-krolika', composition: '100% уши кролика с ворсом. Без добавок и консервантов.' },

  // ─── Свинина ───
  'пятаки свиные': { slug: 'pyataki-sushenye', name: 'Пятаки свиные сушёные', protein: 'Свинина', format: '', hardness: 'плотное', purposes: ['Поощрение', 'Длительное жевание'], photo: null, composition: '100% свиные пятаки. Без добавок и консервантов.' },
}

// Товары без цены в Excel, но с фото. Заводим как no_price (скрыты из каталога).
const NO_PRICE = {
  'aorta-govyazhya': { name: 'Аорта говяжья сушёная', category: 'Говядина', protein: 'Говядина', format: '', hardness: 'жевательное', purposes: ['Длительное жевание', 'Для занятости'], composition: '100% говяжья аорта. Без добавок и консервантов.' },
  'hvost-govyazhiy-sushenyy': { name: 'Хвост говяжий сушёный', category: 'Говядина', protein: 'Говядина', format: '', hardness: 'плотное', unit: 'piece', dogSizes: BIG_SIZES, purposes: ['Длительное жевание', 'Для занятости'], composition: '100% говяжий хвост. Без добавок и консервантов.' },
  'kaltyk-govyazhiy': { name: 'Калтык говяжий сушёный', category: 'Говядина', protein: 'Говядина', format: '', hardness: 'жевательное', purposes: ['Длительное жевание', 'Для занятости'], composition: '100% говяжий калтык. Без добавок и консервантов.' },
  'noga-govyazhya-sushenaya': { name: 'Нога говяжья сушёная', category: 'Говядина', protein: 'Говядина', format: '', hardness: 'плотное', unit: 'piece', dogSizes: BIG_SIZES, purposes: ['Длительное жевание', 'Для занятости'], composition: '100% говяжья нога. Без добавок и консервантов.' },
  'nosy-govyazhi': { name: 'Носы говяжьи сушёные', category: 'Говядина', protein: 'Говядина', format: '', hardness: 'плотное', unit: 'piece', purposes: ['Длительное жевание', 'Для занятости'], composition: '100% говяжьи носы. Без добавок и консервантов.' },
  'nosy-govyazhi-s-sherstyu': { name: 'Носы говяжьи сушёные, с шерстью', category: 'Говядина', protein: 'Говядина', format: 'с шерстью', hardness: 'плотное', unit: 'piece', purposes: ['Длительное жевание', 'Для занятости'], composition: '100% говяжьи носы с шерстью. Без добавок и консервантов.' },
  'pechen-govyazhya': { name: 'Печень говяжья сушёная, целиком', category: 'Говядина', protein: 'Говядина', format: 'целиком', hardness: 'среднее', purposes: ['Поощрение', 'Дрессировка'], composition: '100% говяжья печень. Без добавок и консервантов.' },
  'vymya-sushenoe': { name: 'Вымя говяжье сушёное, пластины', category: 'Говядина', protein: 'Говядина', format: 'пластины', hardness: 'плотное', purposes: ['Длительное жевание'], composition: '100% говяжье вымя. Без добавок и консервантов.' },
  'noga-baranya-sushenaya': { name: 'Нога баранья сушёная', category: 'Баранина', protein: 'Баранина', format: '', hardness: 'плотное', unit: 'piece', dogSizes: BIG_SIZES, purposes: ['Длительное жевание', 'Для занятости'], composition: '100% баранья нога. Без добавок и консервантов.' },
  'traheya-baranya-sushenaya': { name: 'Трахея баранья сушёная', category: 'Баранина', protein: 'Баранина', format: '', hardness: 'жевательное', purposes: ['Длительное жевание', 'Для занятости'], composition: '100% баранья трахея. Без добавок и консервантов.' },
  'golovy-perepelinye': { name: 'Головы перепелиные сушёные', category: 'Птица', protein: 'Перепел', format: '', hardness: 'среднее', unit: 'piece', dogSizes: SMALL_SIZES, purposes: ['Поощрение', 'Для занятости'], composition: '100% перепелиные головы. Без добавок и консервантов.' },
  'myaso-indeyki-sushenoe': { name: 'Мясо индейки сушёное', category: 'Птица', protein: 'Индейка', format: '', hardness: 'среднее', purposes: ['Поощрение', 'Ежедневное лакомство'], composition: '100% мясо индейки. Без добавок и консервантов.' },
  'serdechki-kurinye': { name: 'Сердечки куриные сушёные', category: 'Птица', protein: 'Курица', format: '', hardness: 'среднее', purposes: ['Дрессировка', 'Поощрение'], composition: '100% куриные сердечки. Без добавок и консервантов.' },
  'sheya-indeyki-sushenaya': { name: 'Шея индейки сушёная', category: 'Птица', protein: 'Индейка', format: '', hardness: 'плотное', unit: 'piece', dogSizes: BIG_SIZES, purposes: ['Длительное жевание', 'Для занятости'], composition: '100% шея индейки. Без добавок и консервантов.' },
  'lapy-krolika': { name: 'Лапы кролика сушёные', category: 'Кролик', protein: 'Кролик', format: 'с ворсом', hardness: 'плотное', dogSizes: SMALL_SIZES, purposes: ['Поощрение', 'Длительное жевание'], composition: '100% лапы кролика. Без добавок и консервантов.' },
  'pechenye-iz-indeyki': { name: 'Печенье из индейки', category: 'Печенье', protein: 'Индейка', format: '', hardness: 'среднее', purposes: ['Поощрение', 'Ежедневное лакомство'], composition: 'Мясо индейки, мука. Без искусственных красителей и консервантов.' },
  'pechenye-iz-krolika': { name: 'Печенье из кролика', category: 'Печенье', protein: 'Кролик', format: '', hardness: 'среднее', purposes: ['Поощрение', 'Ежедневное лакомство'], composition: 'Мясо кролика, мука. Без искусственных красителей и консервантов.' },
  'ushi-svinye': { name: 'Уши свиные сушёные', category: 'Свинина', protein: 'Свинина', format: '', hardness: 'плотное', purposes: ['Длительное жевание', 'Для занятости', 'Поощрение'], composition: '100% свиные уши. Без добавок и консервантов.' },
}

function num(v) {
  if (v == null || v === '') return null
  const n = Number(String(v).replace(',', '.'))
  return Number.isFinite(n) ? Math.round(n) : null
}

function readExcel() {
  if (!fs.existsSync(EXCEL_PATH)) {
    console.error(`\n[!] Не найден Excel: ${EXCEL_PATH}`)
    console.error('    Положите файл «Юми Сушка (1).xlsx» в папку data/ и повторите.\n')
    process.exit(1)
  }
  const wb = XLSX.readFile(EXCEL_PATH)
  const ws = wb.Sheets[SHEET_NAME]
  if (!ws) {
    console.error(`[!] В книге нет листа «${SHEET_NAME}». Листы: ${wb.SheetNames.join(', ')}`)
    process.exit(1)
  }
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null, blankrows: false })
  const items = []
  let currentCategory = null
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i]
    const name = r[COL_NAME]
    if (!name) continue
    const p100 = num(r[COL_P100_30])
    const pkg = num(r[COL_PKG_30])
    const buy = r[COL_BUY]
    // строка-категория: есть имя, но нет закупки и нет цены 30%
    if (buy == null && p100 == null && pkg == null) {
      currentCategory = String(name).trim()
      continue
    }
    items.push({ rawName: String(name).trim(), category: currentCategory, price100g: p100, pricePerKg: pkg })
  }
  return items
}

function loadImages() {
  const data = JSON.parse(fs.readFileSync(IMAGES_JSON, 'utf8'))
  const bySlug = new Map()
  for (const p of data.products) bySlug.set(p.slug, p.imagePaths)
  return bySlug
}

function texture(hardness) {
  return TEXTURE_BY_HARDNESS[hardness] || 'Плотное'
}

function build() {
  const excel = readExcel()
  const images = loadImages()
  const usedPhotoSlugs = new Set()
  const products = []
  const unmatched = []

  // Активные товары из Excel
  for (const row of excel) {
    const key = normalize(row.rawName)
    const m = MAP[key]
    if (!m) {
      unmatched.push(row.rawName)
      continue
    }
    const hasPrice = row.price100g != null
    const photoPaths = m.photo && images.has(m.photo) ? images.get(m.photo) : []
    if (m.photo && images.has(m.photo)) usedPhotoSlugs.add(m.photo)
    const unit = m.unit || 'weight'
    products.push({
      id: m.slug,
      slug: m.slug,
      name: m.name,
      category: row.category || 'Прочее',
      protein: m.protein,
      purposes: m.purposes || ['Поощрение'],
      dogSizes: m.dogSizes || ALL_SIZES,
      texture: texture(m.hardness),
      hardness: m.hardness,
      format: m.format || '',
      unit,
      weight: unit === 'piece' ? '1 шт' : '100 г',
      price: hasPrice ? row.price100g : 0,
      price100g: hasPrice ? row.price100g : null,
      pricePerKg: row.pricePerKg ?? null,
      status: hasPrice ? 'active' : 'no_price',
      imagePaths: photoPaths,
      shortDescription:
        'Натуральное сушёное лакомство для собак — дополнение к основному рациону.',
      composition: m.composition,
      tags: [m.protein, 'Натуральное'],
      isFeatured: Boolean(m.featured),
    })
  }

  // Товары без цены, но с фото → no_price
  for (const [slug, info] of Object.entries(NO_PRICE)) {
    if (usedPhotoSlugs.has(slug)) continue
    const photoPaths = images.has(slug) ? images.get(slug) : []
    if (images.has(slug)) usedPhotoSlugs.add(slug)
    const unit = info.unit || 'weight'
    products.push({
      id: slug,
      slug,
      name: info.name,
      category: info.category,
      protein: info.protein,
      purposes: info.purposes || ['Поощрение'],
      dogSizes: info.dogSizes || ALL_SIZES,
      texture: texture(info.hardness),
      hardness: info.hardness,
      format: info.format || '',
      unit,
      weight: unit === 'piece' ? '1 шт' : '100 г',
      price: 0,
      price100g: null,
      pricePerKg: null,
      status: 'no_price',
      imagePaths: photoPaths,
      shortDescription:
        'Натуральное сушёное лакомство для собак — дополнение к основному рациону.',
      composition: info.composition,
      tags: [info.protein, 'Натуральное'],
      isFeatured: false,
    })
  }

  // Фото без товара (не сопоставлены ни с Excel, ни с NO_PRICE)
  const allPhotoSlugs = new Set(images.keys())
  const photosWithoutProduct = [...allPhotoSlugs].filter((s) => !usedPhotoSlugs.has(s))

  return { products, excel, unmatched, photosWithoutProduct, images }
}

function writeFile(products) {
  const header = `// ВНИМАНИЕ: файл сгенерирован scripts/import-products-from-excel.mjs.
// Не редактируйте вручную — запустите: npm run import:products
//
// Публичные цены (наценка 30%) импортированы из data/Юми Сушка (1).xlsx.
// В файле нет закупки, себестоимости, упаковки, маржи, цен конкурентов и поставщика.

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

const RAW = ${JSON.stringify(products, null, 2)} as const

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
  fs.writeFileSync(OUT_PATH, header, 'utf8')
}

function report({ products, excel, unmatched, photosWithoutProduct }) {
  const active = products.filter((p) => p.status === 'active')
  const noPrice = products.filter((p) => p.status === 'no_price')
  const activeNoPhoto = active.filter((p) => p.imagePaths.length === 0)
  const withP100 = products.filter((p) => p.price100g != null)
  const withPkg = products.filter((p) => p.pricePerKg != null)

  console.log('\n══════════════ ОТЧЁТ ИМПОРТА ══════════════')
  console.log('Строк товаров в Excel:           ', excel.length)
  console.log('Товаров с price100g:             ', withP100.length)
  console.log('Товаров с pricePerKg:            ', withPkg.length)
  console.log('Всего в базе:                    ', products.length)
  console.log('Активных (в каталоге):           ', active.length)
  console.log('Скрытых no_price:                ', noPrice.length)
  console.log('Активных без фото (fallback):    ', activeNoPhoto.length)
  console.log('Фото-папок без активного товара: ', photosWithoutProduct.length)

  if (unmatched.length) {
    console.log('\n[!] Строки Excel без сопоставления:')
    unmatched.forEach((n) => console.log('   -', n))
  } else {
    console.log('\nВсе строки Excel сопоставлены.')
  }

  console.log('\nАктивные товары без фото (показываем fallback):')
  activeNoPhoto.forEach((p) => console.log('   -', p.slug, '·', p.name))

  console.log('\nФото без активного товара (no_price / нет цены):')
  photosWithoutProduct.forEach((s) => console.log('   -', s))

  console.log('\nno_price товары:')
  noPrice.forEach((p) => console.log('   -', p.slug, '·', p.name))
  console.log('═══════════════════════════════════════════\n')
}

const result = build()
writeFile(result.products)
report(result)
