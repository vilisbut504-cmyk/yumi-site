import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'
import { UtmCapture } from '@/components/UtmCapture'
import { getMetadataBase, SITE_DOMAIN_CYRILLIC } from '@/src/lib/siteUrl'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
})

/** Явный mobile viewport — без этого Safari может отдавать «версию для ПК». */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: 'ЮМИ — натуральные сушёные лакомства для собак в Санкт-Петербурге',
  description:
    'ЮМИ — премиальные натуральные сушёные лакомства и жевательные продукты для собак. Говядина, баранина, птица, кролик, свинина, печенье. Доставка по Санкт-Петербургу.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ЮМИ — натуральные сушёные лакомства для собак в Санкт-Петербурге',
    description:
      'Премиальные натуральные сушёные лакомства и жевательные продукты для собак. Доставка и самовывоз по Санкт-Петербургу.',
    locale: 'ru_RU',
    type: 'website',
    siteName: 'ЮМИ',
    url: SITE_DOMAIN_CYRILLIC,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ЮМИ — натуральные сушёные лакомства для собак в Санкт-Петербурге',
    description:
      'Премиальные натуральные сушёные лакомства для собак. Доставка по Санкт-Петербургу.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className={manrope.className}>
        <CartProvider>
          <UtmCapture />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
