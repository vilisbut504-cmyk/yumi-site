import { canonicalPhone, isCompletePhone } from '@/lib/phone'
import type {
  OrderPayload,
  OrderItem,
  OrderSource,
  PaymentMethod,
  DeliveryMethod,
} from './orderPayload'

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
    if (payload.delivery.method === 'courier_spb') {
      const addr = payload.delivery.address || payload.customer.address || ''
      if (addr.trim().length < 5) return 'Укажите адрес доставки'
    }
  }
  return null
}

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cash_on_delivery: 'Наличными при получении',
  bank_transfer_on_delivery: 'Переводом на карту при получении',
}

const DELIVERY_LABELS: Record<DeliveryMethod, string> = {
  courier_spb: 'Курьер по Санкт-Петербургу',
  pickup: 'Самовывоз',
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
  return `${value.toLocaleString('ru-RU')} ₽`
}

export function buildLeadNote(payload: OrderPayload): string {
  const { customer, delivery, payment, items, totals, utm, page, source } = payload
  const phone = normalizePhone(customer.phone)

  const itemLines =
    items.length > 0
      ? items
          .map((item, i) => {
            const sum = item.price * item.quantity
            return `${i + 1}. ${item.name} — ${item.quantity} × ${item.weight} — ${formatMoney(item.price)} — ${formatMoney(sum)}`
          })
          .join('\n')
      : '— (заявка без корзины)'

  const deliveryAddr =
    delivery.address || customer.address || (delivery.method === 'pickup' ? 'Самовывоз' : '—')

  return [
    'Новый заказ с сайта ЮМИ',
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
    'Доставка:',
    `Способ: ${DELIVERY_LABELS[delivery.method]}`,
    `Адрес: ${line(deliveryAddr)}`,
    `Желаемое время: ${line(delivery.preferredTime)}`,
    '',
    'Оплата:',
    `Способ: ${PAYMENT_LABELS[payment.method]}`,
    'Статус: онлайн-оплата не проводилась',
    '',
    'Состав заказа:',
    '',
    itemLines,
    '',
    'Итого:',
    `Подытог: ${formatMoney(totals.subtotal)}`,
    `Доставка: ${totals.delivery != null ? formatMoney(totals.delivery) : '—'}`,
    `Итого: ${formatMoney(totals.total)}`,
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
  if (!p.customer || !p.delivery || !p.payment || !p.totals || !p.page) return null

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
      method: p.delivery.method === 'pickup' ? 'pickup' : 'courier_spb',
      address: p.delivery.address ? String(p.delivery.address).trim() : undefined,
      preferredTime: p.delivery.preferredTime
        ? String(p.delivery.preferredTime).trim()
        : undefined,
    },
    payment: {
      online: false,
      method:
        p.payment.method === 'bank_transfer_on_delivery'
          ? 'bank_transfer_on_delivery'
          : 'cash_on_delivery',
      status: 'pending',
    },
    items: Array.isArray(p.items)
      ? p.items.map((item) => sanitizeItem(item)).filter(Boolean) as OrderItem[]
      : [],
    totals: {
      subtotal: Number(p.totals.subtotal) || 0,
      delivery: p.totals.delivery != null ? Number(p.totals.delivery) : undefined,
      total: Number(p.totals.total) || 0,
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
    quantity: Math.max(1, Number(i.quantity) || 1),
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
