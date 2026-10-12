// Единый расчёт скидки и доставки.
// Используется в корзине, на checkout и в серверном API,
// чтобы суммы нигде не расходились.

export type DeliveryRegion = 'spb' | 'moscow'

/** СПб-методы сохранены для совместимости payload. */
export type DeliveryMethod =
  | 'pickup'
  | 'courier_kad'
  | 'courier_outside_kad'
  | 'moscow_odintsovo'
  | 'moscow_krasnogorsk'
  | 'moscow_pickup_yakovleva'

export interface DeliveryOption {
  method: DeliveryMethod
  region: DeliveryRegion
  label: string
  hint: string
  /** Базовая цена на сайте (₽). Для за КАД — только база, без км. */
  price: number
  /**
   * false — цена не подтверждена, пользователю не показывать «бесплатно» / ложную сумму.
   * Расчёт totals использует price (обычно 0) до подтверждения.
   */
  priceConfirmed: boolean
  /** Краткая зона для итогов и CRM */
  zoneLabel?: string
  /** Точка самовывоза (если есть) */
  pickupPoint?: string
}

export const DELIVERY_REGIONS: {
  id: DeliveryRegion
  label: string
}[] = [
  { id: 'spb', label: 'Санкт-Петербург' },
  { id: 'moscow', label: 'Москва и Московская область' },
]

/** Самовывоз в Москве («Сытый шарик», деревня Яковлева) — бесплатно. */
export const MOSCOW_PICKUP_YAKOVLEVA_PRICE = 0

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    method: 'pickup',
    region: 'spb',
    label: 'Самовывоз',
    hint: 'Санкт-Петербург, по согласованию',
    price: 0,
    priceConfirmed: true,
    zoneLabel: 'Самовывоз',
    pickupPoint: 'Санкт-Петербург, по согласованию',
  },
  {
    method: 'courier_kad',
    region: 'spb',
    label: 'Доставка внутри КАД',
    hint: 'Санкт-Петербург в пределах КАД',
    price: 250,
    priceConfirmed: true,
    zoneLabel: 'Внутри КАД',
  },
  {
    method: 'courier_outside_kad',
    region: 'spb',
    label: 'Доставка за КАД',
    hint: '250 ₽ + 25 ₽/км за пределами КАД. Точную стоимость подтвердит менеджер после проверки адреса.',
    price: 250,
    priceConfirmed: true,
    zoneLabel: 'За КАД',
  },
  {
    method: 'moscow_odintsovo',
    region: 'moscow',
    label: 'Доставка — Одинцовский район',
    hint: 'Москва и Московская область',
    price: 400,
    priceConfirmed: true,
    zoneLabel: 'Одинцовский район',
  },
  {
    method: 'moscow_krasnogorsk',
    region: 'moscow',
    label: 'Доставка — Красногорск',
    hint: 'Москва и Московская область',
    price: 400,
    priceConfirmed: true,
    zoneLabel: 'Красногорск',
  },
  {
    method: 'moscow_pickup_yakovleva',
    region: 'moscow',
    label: 'Самовывоз — «Сытый шарик»',
    hint: 'деревня Яковлева',
    price: MOSCOW_PICKUP_YAKOVLEVA_PRICE,
    priceConfirmed: true,
    zoneLabel: 'Самовывоз',
    pickupPoint: '«Сытый шарик», деревня Яковлева',
  },
]

/** Доплата за каждый км за пределами КАД (₽). Сайт не считает км — только информирует. */
export const OUTSIDE_KAD_PER_KM = 25

export const ALL_DELIVERY_METHODS: DeliveryMethod[] = DELIVERY_OPTIONS.map(
  (o) => o.method,
)

export function getDeliveryOption(method: DeliveryMethod): DeliveryOption | undefined {
  return DELIVERY_OPTIONS.find((o) => o.method === method)
}

export function getDeliveryOptionsForRegion(region: DeliveryRegion): DeliveryOption[] {
  return DELIVERY_OPTIONS.filter((o) => o.region === region)
}

export function getRegionForMethod(method: DeliveryMethod): DeliveryRegion {
  return getDeliveryOption(method)?.region ?? 'spb'
}

export function getDefaultMethodForRegion(region: DeliveryRegion): DeliveryMethod {
  return region === 'moscow' ? 'moscow_odintsovo' : 'courier_kad'
}

export function getRegionLabel(region: DeliveryRegion): string {
  return DELIVERY_REGIONS.find((r) => r.id === region)?.label ?? region
}

export function getDeliveryPrice(method: DeliveryMethod): number {
  return getDeliveryOption(method)?.price ?? 0
}

export function getDeliveryLabel(method: DeliveryMethod): string {
  return getDeliveryOption(method)?.label ?? 'Доставка'
}

export function getDeliverySummaryLabel(method: DeliveryMethod): string {
  switch (method) {
    case 'pickup':
      return 'Самовывоз'
    case 'courier_kad':
      return 'Доставка внутри КАД'
    case 'courier_outside_kad':
      return 'Базовая доставка за КАД'
    case 'moscow_odintsovo':
      return 'Доставка — Одинцовский район'
    case 'moscow_krasnogorsk':
      return 'Доставка — Красногорск'
    case 'moscow_pickup_yakovleva':
      return 'Самовывоз — «Сытый шарик»'
    default:
      return 'Доставка'
  }
}

/** Нужен ли адрес доставки (не самовывоз). */
export function isCourier(method: DeliveryMethod): boolean {
  return (
    method === 'courier_kad' ||
    method === 'courier_outside_kad' ||
    method === 'moscow_odintsovo' ||
    method === 'moscow_krasnogorsk'
  )
}

export function isPickup(method: DeliveryMethod): boolean {
  return method === 'pickup' || method === 'moscow_pickup_yakovleva'
}

export function isOutsideKad(method: DeliveryMethod): boolean {
  return method === 'courier_outside_kad'
}

/** Итог предварительный — километраж или цена самовывоза уточняет менеджер. */
export function isDeliveryEstimate(method: DeliveryMethod): boolean {
  if (method === 'courier_outside_kad') return true
  const opt = getDeliveryOption(method)
  return Boolean(opt && !opt.priceConfirmed)
}

export function formatDeliveryOptionPrice(opt: DeliveryOption): string {
  if (!opt.priceConfirmed) return 'стоимость уточнит менеджер'
  if (opt.price === 0) return 'Бесплатно'
  if (opt.method === 'courier_outside_kad') {
    return `${opt.price.toLocaleString('ru-RU')} ₽ + ${OUTSIDE_KAD_PER_KM} ₽/км`
  }
  return `${opt.price.toLocaleString('ru-RU')} ₽`
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
  /** true — сумма предварительная (за КАД / неутверждённый самовывоз) */
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
