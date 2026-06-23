import { products, type Product, type ProductUnit } from '../data/products'

export function getAllProducts(): Product[] {
  return products
}

export function isPurchasable(p: Product): boolean {
  return p.status === 'active' && p.price > 0
}

export function getActiveProducts(): Product[] {
  return products.filter(isPurchasable)
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

export type { Product, ProductUnit }
