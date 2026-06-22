import type { Product } from '@/src/lib/products'

export interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  weight: string
  image: string
  qty: number
}

export interface CartLineForPayload {
  id: string
  slug: string
  name: string
  weight: string
  price: number
  qty: number
  total: number
}

export type DeliveryMethod = 'courier_spb' | 'pickup'
export type PaymentMethod = 'cash_on_delivery' | 'card_on_delivery'

export interface CheckoutCustomer {
  name: string
  phone: string
  email: string
  comment: string
}

export interface CheckoutDelivery {
  method: DeliveryMethod
  city: string
  address: string
}

/**
 * Payload готовится для будущей интеграции (CRM / приём заказов).
 * Онлайн-оплата НЕ подключена: payment.online = false.
 */
export interface CheckoutPayload {
  customer: CheckoutCustomer
  delivery: CheckoutDelivery
  payment: {
    method: PaymentMethod
    online: false
  }
  items: CartLineForPayload[]
  totals: {
    itemsCount: number
    subtotal: number
  }
  source: string
  createdAt: string
}

export function cartItemFromProduct(product: Product, qty = 1): CartItem {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    weight: product.weight,
    image: product.imagePaths[0] ?? '',
    qty,
  }
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0)
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₽`
}

export function buildCheckoutPayload(
  items: CartItem[],
  customer: CheckoutCustomer,
  delivery: CheckoutDelivery,
  payment: PaymentMethod,
): CheckoutPayload {
  const lines: CartLineForPayload[] = items.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    weight: item.weight,
    price: item.price,
    qty: item.qty,
    total: item.price * item.qty,
  }))

  return {
    customer,
    delivery,
    payment: { method: payment, online: false },
    items: lines,
    totals: {
      itemsCount: cartCount(items),
      subtotal: cartSubtotal(items),
    },
    source: 'yumi-site/checkout',
    createdAt: new Date().toISOString(),
  }
}
