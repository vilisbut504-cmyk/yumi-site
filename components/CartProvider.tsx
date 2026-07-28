'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  cartCount,
  cartSubtotal,
  cartItemFromProduct,
  normalizePackQty,
  type CartItem,
} from '@/lib/cart'
import type { Product } from '@/src/lib/products'
import { getProductBySlug, isPublicProduct } from '@/src/lib/products'

const STORAGE_KEY = 'yumi-cart-v1'

function hydrateCartItems(parsed: CartItem[]): CartItem[] {
  return parsed
    .map((item) => {
      const product = getProductBySlug(item.slug)
      if (!product || !isPublicProduct(product)) return null
      return {
        ...item,
        qty: normalizePackQty(item.qty),
        price: product.price,
        name: product.name,
        weight: product.weight,
        image: product.imagePaths[0] ?? item.image,
        availability: product.availability ?? item.availability ?? 'preorder',
      }
    })
    .filter(Boolean) as CartItem[]
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  mounted: boolean
  addItem: (product: Product, qty?: number) => void
  removeItem: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        if (Array.isArray(parsed)) setItems(hydrateCartItems(parsed))
      }
    } catch {
      // ignore malformed storage
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore quota errors
    }
  }, [items, mounted])

  const addItem = useCallback((product: Product, qty = 1) => {
    if (!isPublicProduct(product)) return
    const addQty = normalizePackQty(qty)
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? {
                ...i,
                qty: normalizePackQty(i.qty + addQty),
                availability: product.availability ?? i.availability ?? 'preorder',
              }
            : i,
        )
      }
      return [...prev, cartItemFromProduct(product, addQty)]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id))
      return
    }
    const next = normalizePackQty(qty)
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: next } : i)),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: cartCount(items),
      subtotal: cartSubtotal(items),
      mounted,
      addItem,
      removeItem,
      setQty,
      clear,
    }),
    [items, mounted, addItem, removeItem, setQty, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
