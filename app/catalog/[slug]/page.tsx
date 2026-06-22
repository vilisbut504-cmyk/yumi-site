import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductImage } from '@/components/ProductImage'
import { ProductCard } from '@/components/ProductCard'
import { ProductDetailActions } from '@/components/ProductDetailActions'
import { formatPrice } from '@/lib/cart'
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from '@/src/lib/products'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Товар не найден — ЮМИ' }
  return {
    title: `${product.name} — ЮМИ`,
    description: product.shortDescription,
  }
}

const FULL_WARNING =
  'Лакомство не является заменой основного рациона. Наблюдайте за собакой во время жевания. При чувствительном пищеварении вводите новый продукт постепенно.'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span>/</span>
            <Link href="/catalog">Каталог</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>
        </div>

        <section className="section pdp-section">
          <div className="container pdp">
            <div className="pdp__media">
              <ProductImage imagePaths={product.imagePaths} alt={product.name} className="pdp__image" />
            </div>

            <div className="pdp__info">
              <p className="eyebrow">{product.category} · {product.protein}</p>
              <h1 className="pdp__title">{product.name}</h1>
              <p className="pdp__short">{product.shortDescription}</p>

              <div className="pdp__price">
                <span className="pdp__price-now">{formatPrice(product.price)}</span>
                {product.oldPrice ? (
                  <span className="pdp__price-old">{formatPrice(product.oldPrice)}</span>
                ) : null}
                <span className="pdp__weight">/ {product.weight}</span>
              </div>

              <ProductDetailActions product={product} />

              <ul className="pdp__specs">
                <li><span>Категория</span><strong>{product.category}</strong></li>
                <li><span>Белок</span><strong>{product.protein}</strong></li>
                <li><span>Текстура</span><strong>{product.texture}</strong></li>
                <li><span>Твёрдость</span><strong>{product.hardness}</strong></li>
                <li><span>Размер собаки</span><strong>{product.dogSizes.join(', ')}</strong></li>
                <li><span>Назначение</span><strong>{product.purposes.join(', ')}</strong></li>
                <li><span>Фасовка</span><strong>{product.weight}</strong></li>
              </ul>

              <div className="pdp__warning">{FULL_WARNING}</div>
            </div>
          </div>
        </section>

        <section className="section pdp-details">
          <div className="container pdp-details__grid">
            <div className="pdp-block">
              <h2>Состав</h2>
              <p>{product.composition}</p>
            </div>
            <div className="pdp-block">
              <h2>Как давать</h2>
              <p>{product.howToUse}</p>
            </div>
            <div className="pdp-block">
              <h2>Хранение</h2>
              <p>{product.storage}</p>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2>Похожие лакомства</h2>
              </div>
              <div className="product-grid">
                {related.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
