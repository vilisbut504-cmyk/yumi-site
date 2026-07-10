// Единый расчёт стартовой скидки и доставки.
// Используется в корзине, на checkout и в серверном API,
// чтобы суммы нигде не расходились.

export type DeliveryMethod = 'pickup' | 'courier_kad' | 'courier_outside_kad'

export interface DeliveryOption {
  method: DeliveryMethod
  label: string
  hint: string
  price: number
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { method: 'pickup', label: 'Самовывоз', hint: 'Санкт-Петербург, по согласованию', price: 0 },
  {
    method: 'courier_kad',
    label: 'Курьер внутри КАД',
    hint: 'Санкт-Петербург в пределах КАД',
    price: 150,
  },
  {
    method: 'courier_outside_kad',
    label: 'Курьер за КАД',
    hint: 'Доставка за пределы КАД',
    price: 650,
  },
]

export function getDeliveryPrice(method: DeliveryMethod): number {
  return DELIVERY_OPTIONS.find((o) => o.method === method)?.price ?? 0
}

export function getDeliveryLabel(method: DeliveryMethod): string {
  return DELIVERY_OPTIONS.find((o) => o.method === method)?.label ?? 'Доставка'
}

export function isCourier(method: DeliveryMethod): boolean {
  return method === 'courier_kad' || method === 'courier_outside_kad'
}

// Стартовая скидка для первых клиентов — зависит от суммы товаров (без доставки).
export const STARTER_DISCOUNT_TIERS = [
  { minSubtotal: 12000, percent: 19 },
  { minSubtotal: 11999, percent: 15 },
  { minSubtotal: 5999, percent: 11 },
  { minSubtotal: 2999, percent: 7 },
  { minSubtotal: 999, percent: 4 },
] as const

export function getStarterDiscountPercent(subtotal: number): number {
  for (const tier of STARTER_DISCOUNT_TIERS) {
    if (subtotal >= tier.minSubtotal) return tier.percent
  }
  return 0
}

export interface StarterDiscount {
  percent: number
  discountAmount: number
  subtotalAfterDiscount: number
}

export function calculateStarterDiscount(subtotal: number): StarterDiscount {
  const safeSubtotal = Math.max(0, Math.round(subtotal))
  const percent = getStarterDiscountPercent(safeSubtotal)
  const discountAmount = Math.round((safeSubtotal * percent) / 100)
  return {
    percent,
    discountAmount,
    subtotalAfterDiscount: safeSubtotal - discountAmount,
  }
}

export interface OrderTotalBreakdown {
  subtotal: number
  discountPercent: number
  discountAmount: number
  subtotalAfterDiscount: number
  deliveryPrice: number
  total: number
}

export function calculateOrderTotal({
  subtotal,
  deliveryPrice = 0,
}: {
  subtotal: number
  deliveryPrice?: number
}): OrderTotalBreakdown {
  const { percent, discountAmount, subtotalAfterDiscount } =
    calculateStarterDiscount(subtotal)
  const safeDelivery = Math.max(0, Math.round(deliveryPrice))
  return {
    subtotal: Math.max(0, Math.round(subtotal)),
    discountPercent: percent,
    discountAmount,
    subtotalAfterDiscount,
    deliveryPrice: safeDelivery,
    total: subtotalAfterDiscount + safeDelivery,
  }
}

export const STARTER_DISCOUNT_NOTE =
  'Скидка первым клиентам применена автоматически на этапе запуска магазина.'
