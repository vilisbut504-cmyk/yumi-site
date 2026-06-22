import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/CartProvider'

export const metadata: Metadata = {
  title: 'ЮМИ — натуральные сушёные лакомства для собак в Санкт-Петербурге',
  description:
    'ЮМИ — премиальные натуральные сушёные лакомства и жевательные продукты для собак. Говядина, баранина, птица, кролик, свинина, печенье. Доставка по Санкт-Петербургу.',
  metadataBase: new URL('https://vilisbut504-cmyk.github.io/yumi-site'),
  openGraph: {
    title: 'ЮМИ — натуральные сушёные лакомства для собак',
    description:
      'Премиальные натуральные сушёные лакомства и жевательные продукты для собак. Дополнение к основному рациону.',
    locale: 'ru_RU',
    type: 'website',
    siteName: 'ЮМИ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
