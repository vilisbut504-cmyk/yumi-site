'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/components/CartProvider'
import { QtyInput } from '@/components/QtyInput'
import { IconPaw } from '@/components/ui/Icons'
import { formatTotalWeight, lineTotal, formatPrice } from '@/lib/cart'
import type { Product } from '@/src/lib/products'
import { isPublicProduct } from '@/src/lib/products'

export function ProductDetailActions({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const canBuy = isPublicProduct(product)

  const handleAdd = () => {
    if (!canBuy) return
    addItem(product, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  if (!canBuy) {
    return (
      <div className="pdp__actions">
        <p className="pdp__unavailable">Товар временно недоступен для заказа.</p>
        <Link href="/catalog" className="btn btn-secondary">В каталог</Link>
      </div>
    )
  }

  return (
    <div className="pdp__actions">
      <div className="pdp__qty-wrap">
        <p className="pdp__qty-label">Упаковок по 100 г</p>
        <QtyInput value={qty} onChange={setQty} />
        <p className="pdp__qty-meta">
          {qty} × 100 г = {formatTotalWeight(qty)} · {formatPrice(lineTotal(product.price, qty))}
        </p>
      </div>
      <button type="button" className="btn btn-primary pdp__add" onClick={handleAdd}>
        {added ? 'Добавлено' : 'В корзину'}
        <IconPaw />
      </button>
      <Link href="/cart" className="btn btn-secondary">Перейти в корзину</Link>
    </div>
  )
}
