import type { Product, ProductAvailability, ProductUnit } from '@/src/lib/products'
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
  availability: ProductAvailability
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
/** Внутреннее значение для CRM; клиент оплату не выбирает. */
export type PaymentMethod = 'cash_on_delivery' | 'bank_transfer_on_delivery'
export type PaymentStatus = 'pending'

export const DEFAULT_PAYMENT_METHOD: PaymentMethod = 'cash_on_delivery'

export const MAX_PACK_QTY = 999

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
 * Payload для CRM. Онлайн-оплата не подключена.
 * Способ оплаты назначается сервером, не выбирается клиентом.
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

/** Нормализация количества упаковок: целое 1…MAX_PACK_QTY. */
export function normalizePackQty(raw: unknown): number {
  const n = typeof raw === 'number' ? raw : Number(raw)
  if (!Number.isFinite(n) || Number.isNaN(n)) return 1
  return Math.min(MAX_PACK_QTY, Math.max(1, Math.floor(n)))
}

/**
 * Общий вес позиции: quantity упаковок по 100 г.
 * 1 → 100 г, 5 → 500 г, 10 → 1 кг, 15 → 1,5 кг
 */
export function formatTotalWeight(quantity: number, gramsPerPack = 100): string {
  const qty = Math.max(0, Math.floor(quantity))
  const grams = qty * gramsPerPack
  if (grams < 1000) return `${grams} г`
  const kg = grams / 1000
  if (Number.isInteger(kg)) return `${kg} кг`
  return `${String(kg).replace('.', ',')} кг`
}

/** «5 × 100 г / 500 г» */
export function formatPackLine(qty: number, weight = '100 г'): string {
  const total = formatTotalWeight(qty)
  return `${qty} × ${weight} / ${total}`
}

/** Подпись количества: «2 × 100 г». */
export function packLabel(item: Pick<CartItem, 'qty' | 'weight'>): string {
  return `${item.qty} × ${item.weight}`
}

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
    qty: normalizePackQty(qty),
    availability: product.availability ?? 'preorder',
  }
}

export function cartSubtotal(items: CartItem[]): number {
  const kopecks = items.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.qty,
    0,
  )
  return kopecks / 100
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0)
}

export function lineTotal(price: number, qty: number): number {
  return (Math.round(price * 100) * qty) / 100
}

export function formatPrice(value: number): string {
  const kopecks = Math.round(Math.max(0, value) * 100)
  const rubles = Math.floor(kopecks / 100)
  const kop = kopecks % 100
  if (kop === 0) {
    return `${rubles.toLocaleString('ru-RU')} ₽`
  }
  return `${rubles.toLocaleString('ru-RU')},${String(kop).padStart(2, '0')} ₽`
}

/** «200 ₽ / 100 г» или «162,50 ₽ / 100 г» */
export function formatUnitPrice(price: number, weight = '100 г'): string {
  return `${formatPrice(price)} / ${weight}`
}

export function buildCheckoutPayload(
  items: CartItem[],
  customer: CheckoutCustomer,
  delivery: CheckoutDelivery,
): CheckoutPayload {
  const lines: CartLineForPayload[] = items.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    weight: item.weight,
    unit: item.unit,
    qtyLabel: formatPackLine(item.qty, item.weight),
    price: item.price,
    qty: item.qty,
    total: lineTotal(item.price, item.qty),
  }))

  return {
    customer,
    delivery,
    payment: { online: false, method: DEFAULT_PAYMENT_METHOD, status: 'pending' },
    items: lines,
    totals: {
      itemsCount: cartCount(items),
      subtotal: cartSubtotal(items),
    },
    source: 'yumi-site/checkout',
    createdAt: new Date().toISOString(),
  }
}
