'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ProductImage } from '@/components/ProductImage'
import { useCart } from '@/components/CartProvider'
import { formatPrice } from '@/lib/cart'
import { DISCOUNT_BADGE } from '@/src/lib/pricing'
import { getProductDisplayName, type Product } from '@/src/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const displayName = getProductDisplayName(product)

  const handleAdd = () => {
    addItem(product, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="pcard">
      <Link href={`/catalog/${product.slug}`} className="pcard__media" aria-label={displayName}>
        <ProductImage imagePaths={product.imagePaths} alt={displayName} />
        <span className="pcard__badge">{DISCOUNT_BADGE}</span>
      </Link>
      <div className="pcard__body">
        <p className="pcard__cat">{product.category}</p>
        <h3 className="pcard__name">
          <Link href={`/catalog/${product.slug}`}>{displayName}</Link>
        </h3>
        <p className="pcard__pack">Фасовка: {product.weight}</p>
        <div className="pcard__footer">
          <div className="pcard__price">
            <strong className="pcard__price-now">{formatPrice(product.price)}</strong>
            <span className="pcard__price-unit">/ {product.weight}</span>
          </div>
          <button
            type="button"
            className={`btn btn-primary pcard__btn${added ? ' is-added' : ''}`}
            onClick={handleAdd}
          >
            {added ? 'В корзине' : 'В корзину'}
          </button>
        </div>
      </div>
    </article>
  )
}
