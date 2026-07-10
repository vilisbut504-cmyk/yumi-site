'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ProductImage } from '@/components/ProductImage'
import { useCart } from '@/components/CartProvider'
import { formatPrice } from '@/lib/cart'
import { getAvailabilityLabel } from '@/src/lib/availability'
import type { Product } from '@/src/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const availability = product.availability ?? 'preorder'

  const handleAdd = () => {
    addItem(product, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="pcard">
      <Link href={`/catalog/${product.slug}`} className="pcard__media" aria-label={product.name}>
        <ProductImage imagePaths={product.imagePaths} alt={product.name} />
        <span className="pcard__badge">Скидка первым клиентам в корзине</span>
      </Link>
      <div className="pcard__body">
        <p className="pcard__cat">
          {product.category}
          {product.format ? ` · ${product.format}` : ''}
        </p>
        <h3 className="pcard__name">
          <Link href={`/catalog/${product.slug}`}>{product.name}</Link>
        </h3>
        <p
          className={`pcard__availability pcard__availability--${availability}`}
        >
          {getAvailabilityLabel(availability, 'short')}
        </p>
        <p className="pcard__desc">{product.shortDescription}</p>
        <p className="pcard__pack">Фасовка: {product.weight}</p>
        <div className="pcard__meta">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="pcard__tag">{tag}</span>
          ))}
        </div>
        <div className="pcard__footer">
          <div className="pcard__price">
            <span className="pcard__price-now">{formatPrice(product.price)}</span>
            <span className="pcard__price-per">/ {product.weight}</span>
            {product.unit === 'weight' && product.pricePerKg ? (
              <span className="pcard__price-kg">{formatPrice(product.pricePerKg)} / кг</span>
            ) : null}
          </div>
          <button
            type="button"
            className={`btn btn-primary pcard__btn${added ? ' is-added' : ''}`}
            onClick={handleAdd}
          >
            {added ? 'В корзине' : 'В корзину'}
          </button>
        </div>
        <p className="pcard__warning">Не является заменой основного рациона.</p>
      </div>
    </article>
  )
}
