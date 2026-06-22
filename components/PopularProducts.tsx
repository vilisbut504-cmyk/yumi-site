import Link from 'next/link'
import { ProductCard } from '@/components/ProductCard'
import { getFeaturedProducts, getAllProducts } from '@/src/lib/products'

export function PopularProducts() {
  const featured = getFeaturedProducts()
  const items = featured.length > 0 ? featured : getAllProducts().slice(0, 4)

  return (
    <section className="section" id="popular">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Хиты ассортимента</p>
          <h2>Популярные лакомства</h2>
          <p>
            Натуральные сушёные мясные продукты и жевательные лакомства —
            дополнение к основному рациону вашей собаки.
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
