'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/components/CartProvider'
import { IconPaw } from '@/components/ui/Icons'
import type { Product } from '@/src/lib/products'

export function ProductDetailActions({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="pdp__actions">
      <div className="qty">
        <button type="button" className="qty__btn" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Меньше">−</button>
        <span className="qty__val">{qty}</span>
        <button type="button" className="qty__btn" onClick={() => setQty((q) => q + 1)} aria-label="Больше">+</button>
      </div>
      <button type="button" className="btn btn-primary pdp__add" onClick={handleAdd}>
        {added ? 'Добавлено' : 'В корзину'}
        <IconPaw />
      </button>
      <Link href="/cart" className="btn btn-secondary">Перейти в корзину</Link>
    </div>
  )
}
