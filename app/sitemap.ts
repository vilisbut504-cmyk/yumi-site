import type { MetadataRoute } from 'next'
import { getActiveProducts } from '@/src/lib/products'
import { getSiteOrigin } from '@/src/lib/siteUrl'

/** Нужен для static export (GitHub Pages); на Timeweb SSR тоже безопасен. */
export const dynamic = 'force-static'

/**
 * Публичный sitemap: главная, каталог, база знаний и товары с фото.
 * Корзина/checkout/api/moscow-маршруты не включаются.
 * getActiveProducts() = isPurchasable + hasRealProductImage.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin()

  // trailingSlash: true в next.config — URL со слэшем на конце
  const staticRoutes = ['', '/catalog/', '/knowledge/'].map((path) => ({
    url: path ? `${origin}${path}` : `${origin}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  const productRoutes = getActiveProducts().map((p) => ({
    url: `${origin}/catalog/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes]
}
