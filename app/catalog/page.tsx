import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CatalogClient } from '@/components/CatalogClient'
import { getAllProducts } from '@/src/lib/products'

export const metadata: Metadata = {
  title: 'Каталог натуральных лакомств для собак — ЮМИ',
  description:
    'Каталог натуральных сушёных лакомств и жевательных продуктов для собак ЮМИ: говядина, баранина, птица, кролик, свинина, печенье.',
}

export default function CatalogPage() {
  const products = getAllProducts()
  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="container">
            <p className="eyebrow">Каталог</p>
            <h1>Натуральные лакомства для собак</h1>
            <p className="page-head__sub">
              Сушёные мясные продукты и жевательные лакомства. Лакомство —
              дополнение к основному рациону, а не его замена.
            </p>
          </div>
        </section>
        <section className="section catalog-section">
          <div className="container">
            <CatalogClient products={products} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
