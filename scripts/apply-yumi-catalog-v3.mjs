#!/usr/bin/env node
/**
 * Применяет каталог YUMI v3: цены за 100 г, 50 активных позиций, 9 исключённых.
 * Источник: data/import/Проект ЮМА (3).xlsx (лист «Прайс Юми») или актуальный маппинг.
 *
 * Запуск: node scripts/apply-yumi-catalog-v3.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PRODUCTS_TS = path.join(ROOT, 'src', 'data', 'products.ts')

/** slug → цена за 100 г (₽) */
const ACTIVE_PRICES = {
  'aorta-trubka': 200,
  'aorta-chipsy': 200,
  'bychiy-koren-ulitka-bublik': 425,
  'bychiy-koren-10-15': 425,
  'bychiy-koren-20-25': 425,
  'vymya-kusochki-1x1': 162.5,
  'vymya-sushenoe-plastiny': 150,
  'golovy-indeyki': 118.75,
  'golovy-utinye': 118.75,
  'grebeshki-kurinye': 237.5,
  'zhilka-govyazhya': 200,
  'kaltyk': 200,
  'kolenki-govyazhi': 137.5,
  'lapy-utinye': 137.5,
  'lapy-krolika': 118.75,
  'legkoe-barane-plastiny': 162.5,
  'legkoe-barane-1x1': 175,
  'legkoe-barane-2-5x2-5': 175,
  'legkoe-krupnyy-kusok-plastiny': 162.5,
  'legkoe-sredniy-kusok-2-5x2-5': 162.5,
  'legkoe-melkoe-1x1': 175,
  'myaso-indeyki-plastiny': 306.25,
  'myaso-indeyki-1x1': 318.75,
  'myaso-pishchevoda-barane': 200,
  'myaso-pishchevoda-govyazhe': 225,
  'nosy-govyazhi': 200,
  'pechen-govyazh': 162.5,
  'pechen-govyazhya-kusochki-1x1': 175,
  'pechene-iz-indeyki': 231.25,
  'pyataki-svinye': 162.5,
  'rubec-baraniy': 162.5,
  'rubec-baraniy-kusochki': 175,
  'rubec-govyazhiy': 162.5,
  'rubec-govyazhiy-kusochki': 175,
  'semenniki-kusochki-1x1': 200,
  'semenniki-govyazh': 200,
  'serdechki-kurinye': 237.5,
  'serdce-govyazhe': 237.5,
  'traheya-baranya': 175,
  'traheya-kolechki': 187.5,
  'traheya-rakushka': 187.5,
  'traheya-trubka': 187.5,
  'utinye-zheludki': 162.5,
  'ushi-govyazhi': 212.5,
  'ushi-krolika': 225,
  'hvost-govyazhiy': 225,
  'hvost-govyazhiy-2-3-sm': 225,
  'hryashch-lopatochnyy': 162.5,
  'shei-kurinye': 137.5,
  'sheya-utinaya': 162.5,
}

const EXCLUDED_SLUGS = new Set([
  'koren-baraniy',
  'golovy-perepelinye',
  'myaso-govyadina-1x1',
  'noga-baranya-sht',
  'noga-govyazhya',
  'nosy-s-sherstyu',
  'pechene-iz-krolika',
  'sheya-indeyki',
])

const NEW_FROM_TEMPLATE = [
  {
    slug: 'rubec-baraniy-kusochki',
    templateSlug: 'rubec-baraniy',
    name: 'Рубец бараний кусочки',
    format: '1×1 см',
    price: 175,
  },
  {
    slug: 'rubec-govyazhiy-kusochki',
    templateSlug: 'rubec-govyazhiy',
    name: 'Рубец говяжий кусочки',
    format: '1×1 см',
    price: 175,
  },
  {
    slug: 'hvost-govyazhiy-2-3-sm',
    templateSlug: 'hvost-govyazhiy',
    name: 'Хвост говяжий',
    format: '2–3 см',
    price: 225,
  },
]

function parseProductsTs(content) {
  const start = content.indexOf('const RAW = ')
  const end = content.indexOf('\nexport const products')
  if (start === -1 || end === -1) throw new Error('Не найден RAW в products.ts')
  const json = content.slice(start + 'const RAW = '.length, end).replace(/\sas const\s*$/, '').trim()
  return JSON.parse(json)
}

function applyProduct(p) {
  if (EXCLUDED_SLUGS.has(p.slug)) {
    return {
      ...p,
      status: 'no_price',
      price: 0,
      price100g: null,
      pricePerKg: null,
      weight: '100 г',
      unit: 'weight',
    }
  }

  const price = ACTIVE_PRICES[p.slug]
  if (price != null) {
    return {
      ...p,
      status: 'active',
      price,
      price100g: price,
      pricePerKg: null,
      weight: '100 г',
      unit: 'weight',
    }
  }

  return {
    ...p,
    status: 'no_price',
    price: 0,
    price100g: null,
    pricePerKg: null,
    weight: '100 г',
    unit: 'weight',
  }
}

function cloneFromTemplate(template, spec) {
  return {
    ...template,
    id: spec.slug,
    slug: spec.slug,
    name: spec.name,
    format: spec.format,
    price: spec.price,
    price100g: spec.price,
    pricePerKg: null,
    status: 'active',
    weight: '100 г',
    unit: 'weight',
    imagePaths: [...(template.imagePaths || [])],
    purposes: [...template.purposes],
    dogSizes: [...template.dogSizes],
    tags: [...template.tags],
    isFeatured: false,
  }
}

function writeProductsTs(products) {
  const header = `// ВНИМАНИЕ: файл сгенерирован scripts/apply-yumi-catalog-v3.mjs / import-yuma-catalog.mjs.
// Не редактируйте вручную — запустите: node scripts/apply-yumi-catalog-v3.mjs
//
// Публичные цены сайта — только за 100 г (блок «в сайт ЮМИ»).
// Закупочные/внутренние цены нигде не хранятся.

export type ProductHardness = 'мягкое' | 'среднее' | 'плотное' | 'жевательное'
export type ProductUnit = 'weight' | 'piece'
export type ProductStatus = 'active' | 'draft' | 'no_price'
/** Внутреннее поле; публично не отображается */
export type ProductAvailability = 'in_stock' | 'preorder'

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
  availability?: ProductAvailability
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

  const raw = products.map((p) => {
    const { availability, howToUse, storage, warning, ...rest } = p
    void availability
    void howToUse
    void storage
    void warning
    return rest
  })

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

  writeFileSync(PRODUCTS_TS, header + body, 'utf8')
}

function main() {
  const content = readFileSync(PRODUCTS_TS, 'utf8')
  let products = parseProductsTs(content).map(applyProduct)

  for (const spec of NEW_FROM_TEMPLATE) {
    if (products.some((p) => p.slug === spec.slug)) continue
    const template = products.find((p) => p.slug === spec.templateSlug)
    if (!template) {
      console.warn(`[!] Шаблон не найден: ${spec.templateSlug}`)
      continue
    }
    products.push(cloneFromTemplate(template, spec))
  }

  products = products.map(applyProduct)

  let featured = 0
  for (const p of products) {
    if (p.status === 'active' && featured < 6) {
      p.isFeatured = true
      featured += 1
    } else {
      p.isFeatured = false
    }
  }

  writeProductsTs(products)

  const active = products.filter((p) => p.status === 'active' && p.price > 0)
  const excluded = products.filter((p) => EXCLUDED_SLUGS.has(p.slug))
  console.log(`Каталог обновлён: ${products.length} позиций`)
  console.log(`  активных (покупаемых): ${active.length}`)
  console.log(`  исключённых:           ${excluded.length}`)
  console.log(`  no_price прочие:       ${products.length - active.length - excluded.length + excluded.length}`)
}

main()
