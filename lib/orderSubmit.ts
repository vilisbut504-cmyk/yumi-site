import type { CartItem, DeliveryMethod } from './cart'
import { DEFAULT_PAYMENT_METHOD, cartSubtotal, normalizePackQty } from './cart'
import type { OrderPayload } from '@/src/lib/orderPayload'
import { getUtmForPayload, getPageContext } from '@/src/lib/utm'
import { calculateOrderTotal, getDeliveryPrice, isCourier } from '@/src/lib/pricing'

export function buildOrderPayloadFromCheckout(
  items: CartItem[],
  customer: {
    name: string
    phone: string
    email: string
    comment: string
    city: string
    address: string
  },
  deliveryMethod: DeliveryMethod,
): OrderPayload {
  const subtotal = cartSubtotal(items)
  const deliveryPrice = getDeliveryPrice(deliveryMethod)
  const totals = calculateOrderTotal({
    subtotal,
    deliveryPrice,
    deliveryMethod,
  })

  return {
    source: 'checkout',
    customer: {
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      email: customer.email.trim() || undefined,
      city: customer.city.trim() || undefined,
      address: customer.address.trim() || undefined,
      comment: customer.comment.trim() || undefined,
    },
    delivery: {
      method: deliveryMethod,
      address: isCourier(deliveryMethod) ? customer.address.trim() || undefined : undefined,
    },
    payment: {
      online: false,
      method: DEFAULT_PAYMENT_METHOD,
      status: 'pending',
    },
    items: items.map((item) => ({
      slug: item.slug,
      name: item.name,
      quantity: normalizePackQty(item.qty),
      unit: item.unit,
      weight: item.weight,
      price: item.price,
    })),
    totals: {
      subtotal: totals.subtotal,
      discountPercent: totals.discountPercent,
      discountAmount: totals.discountAmount,
      subtotalAfterDiscount: totals.subtotalAfterDiscount,
      delivery: totals.deliveryPrice,
      total: totals.total,
    },
    utm: getUtmForPayload(),
    page: getPageContext(),
  }
}

export async function submitOrder(payload: OrderPayload) {
  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Не удалось отправить заказ')
  }
  return data
}

export async function submitLead(body: {
  customer: { name: string; phone: string; email?: string; comment?: string }
  dog?: { name?: string; age?: string; weight?: string }
}) {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...body,
      utm: getUtmForPayload(),
      page: getPageContext(),
    }),
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Не удалось отправить заявку')
  }
  return data
}
