import { canonicalPhone, isCompletePhone } from '@/lib/phone'
import { formatPackLine, formatPrice as formatCartPrice, normalizePackQty } from '@/lib/cart'
import type {
  OrderPayload,
  OrderItem,
  OrderSource,
  DeliveryMethod,
} from './orderPayload'
import {
  ALL_DELIVERY_METHODS,
  calculateOrderTotal,
  getDeliveryOption,
  getDeliveryPrice,
  getDeliverySummaryLabel,
  getRegionForMethod,
  getRegionLabel,
  isCourier,
  isOutsideKad,
  isPickup,
  OUTSIDE_KAD_PER_KM,
} from './pricing'

export function normalizePhone(phone: string): string {
  return canonicalPhone(phone)
}

export function validateCustomerName(name: string): boolean {
  return name.trim().length >= 2
}

export function validateCustomerPhone(phone: string): boolean {
  return isCompletePhone(phone)
}

export function validateOrderPayload(payload: OrderPayload): string | null {
  if (!validateCustomerName(payload.customer.name)) {
    return 'Укажите имя (минимум 2 символа)'
  }
  if (!validateCustomerPhone(payload.customer.phone)) {
    return 'Укажите корректный телефон'
  }
  if (payload.source === 'checkout') {
    if (!payload.items.length) return 'Корзина пуста'
    if (payload.totals.total <= 0) return 'Сумма заказа должна быть больше 0'
    if (isCourier(payload.delivery.method)) {
      const addr = payload.delivery.address || payload.customer.address || ''
      if (addr.trim().length < 5) return 'Укажите адрес доставки'
    }
  }
  return null
}

const SOURCE_LABELS: Record<OrderSource, string> = {
  checkout: 'Оформление заказа',
  lead_form: 'Форма заявки',
  treat_picker: 'Подбор лакомств',
}

function line(value: string | undefined | null): string {
  return value?.trim() ? value.trim() : '—'
}

function formatMoney(value: number): string {
  return formatCartPrice(value)
}

function buildSpeakToClientBlock(
  method: DeliveryMethod,
  total: number,
): string[] {
  const money = formatMoney(total)
  if (isPickup(method)) {
    const opt = getDeliveryOption(method)
    if (opt && !opt.priceConfirmed) {
      return [
        'К ОЗВУЧИВАНИЮ КЛИЕНТУ:',
        `Базовая сумма за товары: ${money}.`,
        'Стоимость самовывоза уточнить и озвучить клиенту отдельно.',
        'После подтверждения озвучить клиенту окончательную сумму наличными.',
      ]
    }
    return [
      'К ОЗВУЧИВАНИЮ КЛИЕНТУ:',
      `Просим вас подготовить наличными ${money} при получении заказа.`,
    ]
  }
  if (isOutsideKad(method)) {
    return [
      'К ОЗВУЧИВАНИЮ КЛИЕНТУ:',
      `Базовая сумма к оплате: ${money}.`,
      `Дополнительно рассчитать доставку за КАД: ${OUTSIDE_KAD_PER_KM} ₽/км.`,
      'После проверки адреса озвучить клиенту окончательную сумму наличными.',
      '',
      'Проверить адрес и километраж за КАД, рассчитать доплату 25 ₽/км и только после этого озвучить клиенту окончательную сумму наличными.',
    ]
  }
  return [
    'К ОЗВУЧИВАНИЮ КЛИЕНТУ:',
    `Просим вас подготовить наличными ${money} при получении товара от курьера.`,
  ]
}

function buildDeliveryNoteLines(
  method: DeliveryMethod,
  totals: OrderPayload['totals'],
  address: string,
): string[] {
  const region = getRegionForMethod(method)
  const regionLine = `Регион: ${getRegionLabel(region)}`
  const opt = getDeliveryOption(method)

  if (method === 'pickup') {
    return [
      regionLine,
      'Способ получения: Самовывоз',
      `Точка: ${opt?.pickupPoint ?? 'Санкт-Петербург, по согласованию'}`,
      `Стоимость доставки: ${formatMoney(0)}`,
    ]
  }

  if (method === 'moscow_pickup_yakovleva') {
    return [
      regionLine,
      'Способ получения: Самовывоз',
      `Точка: ${opt?.pickupPoint ?? '«Сытый шарик», деревня Яковлева'}`,
      `Стоимость: ${formatMoney(0)}`,
    ]
  }

  if (isOutsideKad(method)) {
    return [
      regionLine,
      'Способ получения: Доставка',
      'Зона: за пределами КАД',
      `Базовая стоимость: ${formatMoney(totals.delivery)}`,
      `Доплата: ${OUTSIDE_KAD_PER_KM} ₽/км за пределами КАД`,
      'Точный километраж и окончательную сумму уточнить менеджеру',
      `Адрес клиента: ${line(address)}`,
    ]
  }

  if (method === 'moscow_odintsovo' || method === 'moscow_krasnogorsk') {
    return [
      regionLine,
      'Способ получения: Доставка',
      `Зона: ${opt?.zoneLabel ?? getDeliverySummaryLabel(method)}`,
      `Стоимость доставки: ${formatMoney(totals.delivery)}`,
      `Адрес клиента: ${line(address)}`,
    ]
  }

  return [
    regionLine,
    'Способ получения: Доставка',
    `Зона: ${opt?.zoneLabel ?? getDeliverySummaryLabel(method)}`,
    `Стоимость доставки: ${formatMoney(totals.delivery)}`,
    `Адрес клиента: ${line(address)}`,
  ]
}

export function buildLeadNote(payload: OrderPayload): string {
  const { customer, delivery, items, totals, utm, page, source } = payload
  const phone = normalizePhone(customer.phone)
  const deliveryAddr =
    delivery.address ||
    customer.address ||
    (isPickup(delivery.method) ? 'Самовывоз' : '—')

  const itemBlocks =
    items.length > 0
      ? items
          .map((item) => {
            const sum = (Math.round(item.price * 100) * item.quantity) / 100
            return [
              item.name,
              formatPackLine(item.quantity, item.weight),
              `Итого позиции: ${formatMoney(sum)}`,
            ].join('\n')
          })
          .join('\n\n')
      : '— (заявка без корзины)'

  const discountLines =
    totals.discountPercent > 0
      ? [
          `Скидка ${totals.discountPercent}%: −${formatMoney(totals.discountAmount)}`,
          `Итого товаров со скидкой: ${formatMoney(totals.subtotalAfterDiscount)}`,
        ]
      : ['Скидка: 0%']

  const opt = getDeliveryOption(delivery.method)
  const totalsBlock = isOutsideKad(delivery.method)
    ? [
        `Стоимость товаров: ${formatMoney(totals.subtotal)}`,
        ...discountLines,
        `Базовая доставка за КАД: ${formatMoney(totals.delivery)}`,
        `Доплата: ${OUTSIDE_KAD_PER_KM} ₽/км`,
        `Предварительная сумма: ${formatMoney(totals.total)}`,
      ]
    : opt && !opt.priceConfirmed
      ? [
          `Стоимость товаров: ${formatMoney(totals.subtotal)}`,
          ...discountLines,
          `${getDeliverySummaryLabel(delivery.method)}: уточняется`,
          `Предварительная сумма (без самовывоза): ${formatMoney(totals.total)}`,
        ]
      : [
          `Стоимость товаров: ${formatMoney(totals.subtotal)}`,
          ...discountLines,
          `${getDeliverySummaryLabel(delivery.method)}: ${formatMoney(totals.delivery)}`,
          `Итого к оплате: ${formatMoney(totals.total)}`,
        ]

  return [
    'ЗАКАЗ YUMI',
    '',
    `Источник: ${SOURCE_LABELS[source]}`,
    '',
    'Клиент:',
    `Имя: ${line(customer.name)}`,
    `Телефон: ${phone}`,
    `Email: ${line(customer.email)}`,
    `Город: ${line(customer.city)}`,
    `Адрес: ${line(customer.address)}`,
    '',
    ...buildDeliveryNoteLines(delivery.method, totals, deliveryAddr),
    `Желаемое время: ${line(delivery.preferredTime)}`,
    '',
    'Состав заказа:',
    '',
    itemBlocks,
    '',
    ...totalsBlock,
    '',
    ...buildSpeakToClientBlock(delivery.method, totals.total),
    '',
    'UTM:',
    `source: ${line(utm.source)}`,
    `medium: ${line(utm.medium)}`,
    `campaign: ${line(utm.campaign)}`,
    `content: ${line(utm.content)}`,
    `term: ${line(utm.term)}`,
    '',
    'Страница:',
    `url: ${line(page.url)}`,
    `referrer: ${line(page.referrer)}`,
    '',
    'Комментарий клиента:',
    line(customer.comment),
  ].join('\n')
}

export function sanitizeOrderPayload(raw: unknown): OrderPayload | null {
  if (!raw || typeof raw !== 'object') return null
  const p = raw as Partial<OrderPayload>
  if (!p.customer || !p.delivery || !p.totals || !p.page) return null

  const deliveryMethod: DeliveryMethod = ALL_DELIVERY_METHODS.includes(
    p.delivery.method as DeliveryMethod,
  )
    ? (p.delivery.method as DeliveryMethod)
    : 'pickup'

  const items = Array.isArray(p.items)
    ? (p.items.map((item) => sanitizeItem(item)).filter(Boolean) as OrderItem[])
    : []

  // Итоги ВСЕГДА пересчитываем на сервере из method → getDeliveryPrice.
  const subtotalK = items.reduce(
    (sum, i) => sum + Math.round(i.price * 100) * i.quantity,
    0,
  )
  const subtotal = subtotalK / 100
  const deliveryPrice = getDeliveryPrice(deliveryMethod)
  const totals = calculateOrderTotal({
    subtotal,
    deliveryPrice,
    deliveryMethod,
  })

  return {
    source: (p.source as OrderSource) || 'checkout',
    customer: {
      name: String(p.customer.name || '').trim(),
      phone: String(p.customer.phone || '').trim(),
      email: p.customer.email ? String(p.customer.email).trim() : undefined,
      city: p.customer.city ? String(p.customer.city).trim() : undefined,
      address: p.customer.address ? String(p.customer.address).trim() : undefined,
      comment: p.customer.comment ? String(p.customer.comment).trim() : undefined,
    },
    delivery: {
      method: deliveryMethod,
      address: p.delivery.address ? String(p.delivery.address).trim() : undefined,
      preferredTime: p.delivery.preferredTime
        ? String(p.delivery.preferredTime).trim()
        : undefined,
    },
    payment: {
      online: false,
      method: 'cash_on_delivery',
      status: 'pending',
    },
    items,
    totals: {
      subtotal: totals.subtotal,
      discountPercent: totals.discountPercent,
      discountAmount: totals.discountAmount,
      subtotalAfterDiscount: totals.subtotalAfterDiscount,
      delivery: totals.deliveryPrice,
      total: totals.total,
    },
    utm: {
      source: p.utm?.source,
      medium: p.utm?.medium,
      campaign: p.utm?.campaign,
      content: p.utm?.content,
      term: p.utm?.term,
    },
    page: {
      url: String(p.page.url || ''),
      referrer: p.page.referrer ? String(p.page.referrer) : undefined,
    },
  }
}

function sanitizeItem(raw: unknown): OrderItem | null {
  if (!raw || typeof raw !== 'object') return null
  const i = raw as Partial<OrderItem>
  if (!i.slug || !i.name) return null
  return {
    slug: String(i.slug),
    name: String(i.name),
    quantity: normalizePackQty(i.quantity),
    unit: i.unit === 'piece' ? 'piece' : 'weight',
    weight: String(i.weight || '100 г'),
    price: Number(i.price) || 0,
    price100g: i.price100g != null ? Number(i.price100g) : undefined,
    pricePerKg: i.pricePerKg != null ? Number(i.pricePerKg) : undefined,
  }
}

export function isServerCrmMode(): boolean {
  return process.env.NEXT_PUBLIC_CRM_MODE === 'server'
}
