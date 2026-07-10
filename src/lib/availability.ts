import type { ProductAvailability } from '@/src/data/products'

export const AVAILABILITY_LABELS: Record<
  ProductAvailability,
  { short: string; cart: string; detail: string }
> = {
  in_stock: {
    short: 'В наличии',
    cart: 'Доставка в течение 1 дня',
    detail: 'В наличии — доставка в течение 1 дня',
  },
  preorder: {
    short: 'Предзаказ',
    cart: 'Предзаказ — доставка в течение 3 дней с момента оформления заявки',
    detail: 'Предзаказ — доставка в течение 3 дней с момента оформления заявки',
  },
}

export function getAvailabilityLabel(
  availability: ProductAvailability | undefined,
  variant: 'short' | 'cart' | 'detail' = 'short',
): string {
  const key = availability === 'in_stock' ? 'in_stock' : 'preorder'
  return AVAILABILITY_LABELS[key][variant]
}

/** Если в корзине есть хотя бы один предзаказ — общий срок 3 дня. */
export function getCartDeliveryEstimate(
  items: { availability?: ProductAvailability }[],
): { availability: ProductAvailability; label: string } {
  const hasPreorder = items.some((item) => item.availability !== 'in_stock')
  const availability: ProductAvailability = hasPreorder ? 'preorder' : 'in_stock'
  return {
    availability,
    label: getAvailabilityLabel(availability, 'cart'),
  }
}

/** Точка самовывоза ЮМИ (Санкт-Петербург). */
export const PICKUP_POINT = {
  lat: 59.802885,
  lng: 30.397823,
  label: 'Точка самовывоза ЮМИ',
  city: 'Санкт-Петербург',
  hint: 'Самовывоз по согласованию',
} as const

export function getPickupMapEmbedUrl(): string {
  const { lat, lng } = PICKUP_POINT
  return `https://yandex.ru/map-widget/v1/?ll=${lng}%2C${lat}&z=16&pt=${lng}%2C${lat}%2Cpm2rdm`
}

export function getPickupMapsLink(): string {
  const { lat, lng } = PICKUP_POINT
  return `https://yandex.ru/maps/?pt=${lng},${lat}&z=16&l=map`
}
