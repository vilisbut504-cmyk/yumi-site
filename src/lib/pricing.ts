// Единый расчёт скидки и доставки.
// Используется в корзине, на checkout и в серверном API,
// чтобы суммы нигде не расходились.

export type DeliveryMethod = 'pickup' | 'courier_kad' | 'courier_outside_kad'

export interface DeliveryOption {
  method: DeliveryMethod
  label: string
  hint: string
  /** Базовая цена на сайте (₽). Для за КАД — только база, без км. */
  price: number
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    method: 'pickup',
    label: 'Самовывоз',
    hint: 'Санкт-Петербург, по согласованию',
    price: 0,
  },
  {
    method: 'courier_kad',
    label: 'Доставка внутри КАД',
    hint: 'Санкт-Петербург в пределах КАД',
    price: 250,
  },
  {
    method: 'courier_outside_kad',
    label: 'Доставка за КАД',
    hint: '250 ₽ + 25 ₽/км за пределами КАД. Точную стоимость подтвердит менеджер после проверки адреса.',
    price: 250,
  },
]

/** Доплата за каждый км за пределами КАД (₽). Сайт не считает км — только информирует. */
export const OUTSIDE_KAD_PER_KM = 25

export function getDeliveryPrice(method: DeliveryMethod): number {
  return DELIVERY_OPTIONS.find((o) => o.method === method)?.price ?? 0
}

export function getDeliveryLabel(method: DeliveryMethod): string {
  return DELIVERY_OPTIONS.find((o) => o.method === method)?.label ?? 'Доставка'
}

export function getDeliverySummaryLabel(method: DeliveryMethod): string {
  switch (method) {
    case 'pickup':
      return 'Самовывоз'
    case 'courier_kad':
      return 'Доставка внутри КАД'
    case 'courier_outside_kad':
      return 'Базовая доставка за КАД'
    default:
      return 'Доставка'
  }
}

export function isCourier(method: DeliveryMethod): boolean {
  return method === 'courier_kad' || method === 'courier_outside_kad'
}

export function isOutsideKad(method: DeliveryMethod): boolean {
  return method === 'courier_outside_kad'
}

/** Итог за КАД предварительный — километраж уточняет менеджер. */
export function isDeliveryEstimate(method: DeliveryMethod): boolean {
  return method === 'courier_outside_kad'
}

// Скидка от суммы товаров (без доставки). Пороги не менять без отдельной задачи.
export const STARTER_DISCOUNT_TIERS = [
  { minSubtotal: 17999, percent: 10 },
  { minSubtotal: 11999, percent: 8 },
  { minSubtotal: 5999, percent: 6 },
  { minSubtotal: 2999, percent: 4 },
  { minSubtotal: 999, percent: 2 },
] as const

function toKopecks(rubles: number): number {
  return Math.round(Math.max(0, rubles) * 100)
}

function fromKopecks(kopecks: number): number {
  return kopecks / 100
}

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
  const subK = toKopecks(subtotal)
  const percent = getStarterDiscountPercent(fromKopecks(subK))
  const discountK = Math.round((subK * percent) / 100)
  return {
    percent,
    discountAmount: fromKopecks(discountK),
    subtotalAfterDiscount: fromKopecks(subK - discountK),
  }
}

export interface OrderTotalBreakdown {
  subtotal: number
  discountPercent: number
  discountAmount: number
  subtotalAfterDiscount: number
  deliveryPrice: number
  total: number
  /** true — сумма предварительная (за КАД, без км) */
  isEstimate: boolean
}

export function calculateOrderTotal({
  subtotal,
  deliveryPrice = 0,
  deliveryMethod,
}: {
  subtotal: number
  deliveryPrice?: number
  deliveryMethod?: DeliveryMethod
}): OrderTotalBreakdown {
  const { percent, discountAmount, subtotalAfterDiscount } =
    calculateStarterDiscount(subtotal)
  const deliveryK = toKopecks(deliveryPrice)
  const subAfterK = toKopecks(subtotalAfterDiscount)
  return {
    subtotal: fromKopecks(toKopecks(subtotal)),
    discountPercent: percent,
    discountAmount,
    subtotalAfterDiscount,
    deliveryPrice: fromKopecks(deliveryK),
    total: fromKopecks(subAfterK + deliveryK),
    isEstimate: deliveryMethod ? isDeliveryEstimate(deliveryMethod) : false,
  }
}

export const DISCOUNT_NOTE =
  'Скидка рассчитывается автоматически от стоимости товаров.'

export const DISCOUNT_BADGE = 'Скидка до 10% в корзине'

export const DISCOUNT_HERO = 'Скидка до 10% от суммы товаров'
