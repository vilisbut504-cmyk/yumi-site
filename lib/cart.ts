import type { Product, ProductUnit } from '@/src/lib/products'
import type { DeliveryMethod } from '@/src/lib/pricing'

export interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  weight: string
  unit: ProductUnit
  image: string
  qty: number
}

export interface CartLineForPayload {
  id: string
  slug: string
  name: string
  weight: string
  unit: ProductUnit
  qtyLabel: string
  price: number
  qty: number
  total: number
}

export type { DeliveryMethod }
export type PaymentMethod = 'cash_on_delivery' | 'bank_transfer_on_delivery'
export type PaymentStatus = 'pending'

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
 * Онлайн-оплата НЕ подключена: payment.online = false, status = 'pending'.
 */
export interface CheckoutPayload {
  customer: CheckoutCustomer
  delivery: CheckoutDelivery
  payment: {
    online: false
    method: PaymentMethod
    status: PaymentStatus
  }
  items: CartLineForPayload[]
  totals: {
    itemsCount: number
    subtotal: number
  }
  source: string
  createdAt: string
}

/** Подпись количества: «2 × 100 г» или «2 × 1 шт». */
export function packLabel(item: Pick<CartItem, 'qty' | 'weight'>): string {
  return `${item.qty} × ${item.weight}`
}

/** Подпись единицы фасовки: «100 г» или «1 шт». */
export function unitLabel(weight: string): string {
  return weight
}

export function cartItemFromProduct(product: Product, qty = 1): CartItem {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    weight: product.weight,
    unit: product.unit,
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
    unit: item.unit,
    qtyLabel: packLabel(item),
    price: item.price,
    qty: item.qty,
    total: item.price * item.qty,
  }))

  return {
    customer,
    delivery,
    payment: { online: false, method: payment, status: 'pending' },
    items: lines,
    totals: {
      itemsCount: cartCount(items),
      subtotal: cartSubtotal(items),
    },
    source: 'yumi-site/checkout',
    createdAt: new Date().toISOString(),
  }
}
