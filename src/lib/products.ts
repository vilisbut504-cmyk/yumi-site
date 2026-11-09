import {
  products,
  type Product,
  type ProductAvailability,
  type ProductUnit,
} from '../data/products'
import { FALLBACK_PRODUCT_IMAGE } from './assets'

/** Есть ли у товара реальное фото (не fallback и не пустой путь). */
export function hasRealProductImage(p: Product): boolean {
  const first = p.imagePaths?.find((path) => {
    if (!path || typeof path !== 'string') return false
    const trimmed = path.trim()
    if (!trimmed) return false
    if (trimmed === FALLBACK_PRODUCT_IMAGE) return false
    if (trimmed.endsWith('/fallback-product.webp')) return false
    return true
  })
  return Boolean(first)
}

export function getAllProducts(): Product[] {
  return products
}

export function isPurchasable(p: Product): boolean {
  return p.status === 'active' && p.price > 0
}

/** Публично доступен: покупаемый и с настоящим фото. */
export function isPublicProduct(p: Product): boolean {
  return isPurchasable(p) && hasRealProductImage(p)
}

export function getActiveProducts(): Product[] {
  return products.filter(isPublicProduct)
}

export function getDraftProducts(): Product[] {
  return products.filter((p) => !isPurchasable(p))
}

export function getFeaturedProducts(): Product[] {
  return getActiveProducts().filter((p) => p.isFeatured)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return getActiveProducts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  )
}

export function getProductsByPurpose(purpose: string): Product[] {
  const needle = purpose.toLowerCase()
  return getActiveProducts().filter((p) =>
    p.purposes.some((item) => item.toLowerCase() === needle),
  )
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const pool = getActiveProducts().filter((p) => p.id !== product.id)
  const sameCategory = pool.filter((p) => p.category === product.category)
  const sameProtein = pool.filter(
    (p) => p.category !== product.category && p.protein === product.protein,
  )

  const combined: Product[] = []
  const seen = new Set<string>()
  for (const p of [...sameCategory, ...sameProtein]) {
    if (seen.has(p.id)) continue
    seen.add(p.id)
    combined.push(p)
    if (combined.length >= limit) break
  }
  return combined
}

/**
 * Человекочитаемый формат размера для UI.
 * Внутренние ключи фильтров (product.format) не меняются в данных.
 */
export function formatProductFormatLabel(format: string): string {
  const raw = format?.trim()
  if (!raw) return ''

  let label = raw
    .replace(/[xх]/gi, '×')
    .replace(/\s*×\s*/g, ' × ')
    .replace(/\s*-\s*/g, '–')
    .replace(/\s*–\s*/g, '–')
    .replace(/\s+/g, ' ')
    .trim()

  // Унифицируем «1×1» и «1×1 см» → один лейбл.
  if (!/см/i.test(label)) {
    if (/^\d+[.,]?\d*\s*×\s*\d+[.,]?\d*$/.test(label)) return `${label} см`
    if (/^\d+\s*–\s*\d+$/.test(label)) return `${label} см`
  } else {
    label = label.replace(/\s*см\s*$/i, ' см').trim()
  }
  return label
}

/** Канонический ключ формата для дедупликации фильтров. */
export function normalizeProductFormatKey(format: string): string {
  return formatProductFormatLabel(format)
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/см$/i, '')
}

/** Отображаемое название с размером, если он есть в данных и ещё не в имени. */
export function getProductDisplayName(product: Product): string {
  const formatLabel = formatProductFormatLabel(product.format)
  if (!formatLabel) return product.name

  const nameNorm = product.name.toLowerCase().replace(/\s+/g, '')
  const formatNorm = formatLabel
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/см$/i, '')
  if (nameNorm.includes(formatNorm)) return product.name

  return `${product.name} ${formatLabel}`
}

export type { Product, ProductAvailability, ProductUnit }
