import { products, type Product } from '../data/products'

export function getAllProducts(): Product[] {
  return products
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  )
}

export function getProductsByPurpose(purpose: string): Product[] {
  const needle = purpose.toLowerCase()
  return products.filter((p) =>
    p.purposes.some((item) => item.toLowerCase() === needle),
  )
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  )
  const sameProtein = products.filter(
    (p) =>
      p.id !== product.id &&
      p.category !== product.category &&
      p.protein === product.protein,
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

export type { Product }
