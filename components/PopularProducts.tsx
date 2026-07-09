import Link from 'next/link'
import { ProductCard } from '@/components/ProductCard'
import { getFeaturedProducts, getActiveProducts } from '@/src/lib/products'

export function PopularProducts() {
  const featured = getFeaturedProducts()
  const items = featured.length > 0 ? featured : getActiveProducts().slice(0, 4)

  return (
    <section className="section" id="popular">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Хиты ассортимента</p>
          <h2>Популярные лакомства</h2>
          <p>
            Хиты ассортимента для прогулок и поощрения — закажите с доставкой
            по Санкт-Петербургу или самовывозом.
          </p>
        </div>
        <div className="product-grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="section-cta">
          <Link href="/catalog" className="btn btn-primary">Весь каталог</Link>
        </div>
      </div>
    </section>
  )
}
