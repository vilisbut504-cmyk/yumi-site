import type { MetadataRoute } from 'next'
import { getSiteOrigin } from '@/src/lib/siteUrl'

/** Нужен для static export (GitHub Pages); на Timeweb SSR тоже безопасен. */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin()
  const host = new URL(`${origin}/`).host

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cart', '/cart/', '/checkout', '/checkout/'],
    },
    sitemap: `${origin}/sitemap.xml`,
    host,
  }
}
