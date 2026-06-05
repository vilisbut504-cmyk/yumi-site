import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ЮМИ — премиальный сухой корм для собак в Санкт-Петербурге',
  description:
    'ЮМИ — бренд премиального сухого корма для собак. Подбор будущего рациона по возрасту, весу, активности и особенностям собаки. Запуск в Санкт-Петербурге.',
  metadataBase: new URL('https://vilisbut504-cmyk.github.io/yumi-site'),
  openGraph: {
    title: 'ЮМИ — премиальный сухой корм для собак в Санкт-Петербурге',
    description:
      'ЮМИ — бренд премиального сухого корма для собак. Подбор будущего рациона по возрасту, весу, активности и особенностям собаки. Запуск в Санкт-Петербурге.',
    locale: 'ru_RU',
    type: 'website',
    siteName: 'ЮМИ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
