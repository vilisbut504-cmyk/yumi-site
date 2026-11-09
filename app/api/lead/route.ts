import { NextResponse } from 'next/server'
import { createOrderInAmo } from '@/src/lib/amocrm'
import {
  isServerCrmMode,
  sanitizeOrderPayload,
  validateOrderPayload,
} from '@/src/lib/crmPayload'
import type { OrderApiResponse, OrderPayload } from '@/src/lib/orderPayload'

interface LeadRequestBody {
  customer: {
    name: string
    phone: string
    email?: string
    comment?: string
  }
  dog?: {
    name?: string
    age?: string
    weight?: string
  }
  utm?: OrderPayload['utm']
  page?: OrderPayload['page']
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function optionalString(
  value: unknown,
): { ok: true; value?: string } | { ok: false } {
  if (value == null) return { ok: true, value: undefined }
  if (typeof value !== 'string') return { ok: false }
  return { ok: true, value }
}

/** Разбор и строгая проверка тела заявки до обращения к полям customer/*. */
function parseLeadRequestBody(raw: unknown): LeadRequestBody | null {
  if (!isPlainObject(raw)) return null
  if (!isPlainObject(raw.customer)) return null

  const customerRaw = raw.customer
  if (typeof customerRaw.name !== 'string' || typeof customerRaw.phone !== 'string') {
    return null
  }

  const email = optionalString(customerRaw.email)
  const comment = optionalString(customerRaw.comment)
  if (!email.ok || !comment.ok) return null

  let dog: LeadRequestBody['dog']
  if (raw.dog !== undefined) {
    if (!isPlainObject(raw.dog)) return null
    const dogName = optionalString(raw.dog.name)
    const dogAge = optionalString(raw.dog.age)
    const dogWeight = optionalString(raw.dog.weight)
    if (!dogName.ok || !dogAge.ok || !dogWeight.ok) return null
    dog = {
      name: dogName.value,
      age: dogAge.value,
      weight: dogWeight.value,
    }
  }

  let utm: OrderPayload['utm'] | undefined
  if (raw.utm !== undefined) {
    if (!isPlainObject(raw.utm)) return null
    const source = optionalString(raw.utm.source)
    const medium = optionalString(raw.utm.medium)
    const campaign = optionalString(raw.utm.campaign)
    const content = optionalString(raw.utm.content)
    const term = optionalString(raw.utm.term)
    if (!source.ok || !medium.ok || !campaign.ok || !content.ok || !term.ok) {
      return null
    }
    utm = {
      source: source.value,
      medium: medium.value,
      campaign: campaign.value,
      content: content.value,
      term: term.value,
    }
  }

  let page: OrderPayload['page'] | undefined
  if (raw.page !== undefined) {
    if (!isPlainObject(raw.page)) return null
    if (typeof raw.page.url !== 'string') return null
    const referrer = optionalString(raw.page.referrer)
    if (!referrer.ok) return null
    page = { url: raw.page.url, referrer: referrer.value }
  }

  return {
    customer: {
      name: customerRaw.name,
      phone: customerRaw.phone,
      email: email.value,
      comment: comment.value,
    },
    dog,
    utm,
    page,
  }
}

function buildLeadPayload(body: LeadRequestBody): OrderPayload {
  const dogParts: string[] = []
  if (body.dog?.name) dogParts.push(`Собака: ${body.dog.name}`)
  if (body.dog?.age) dogParts.push(`Возраст: ${body.dog.age}`)
  if (body.dog?.weight) dogParts.push(`Вес: ${body.dog.weight}`)

  const commentParts = [body.customer.comment?.trim(), dogParts.join(', ')].filter(
    Boolean,
  )

  return {
    source: 'lead_form',
    customer: {
      name: body.customer.name.trim(),
      phone: body.customer.phone.trim(),
      email: body.customer.email?.trim(),
      comment: commentParts.join('\n') || undefined,
    },
    delivery: { method: 'pickup' },
    payment: {
      online: false,
      method: 'cash_on_delivery',
      status: 'pending',
    },
    items: [],
    totals: {
      subtotal: 0,
      discountPercent: 0,
      discountAmount: 0,
      subtotalAfterDiscount: 0,
      delivery: 0,
      total: 0,
    },
    utm: body.utm ?? {},
    page: body.page ?? { url: '' },
  }
}

function leadError(status: number, error: string) {
  return NextResponse.json<OrderApiResponse>(
    {
      success: false,
      mode: isServerCrmMode() ? 'server' : 'demo',
      error,
    },
    { status },
  )
}

async function readJsonBody(request: Request): Promise<
  { ok: true; value: unknown } | { ok: false }
> {
  let text: string
  try {
    text = await request.text()
  } catch {
    return { ok: false }
  }

  if (!text.trim()) return { ok: false }

  try {
    return { ok: true, value: JSON.parse(text) as unknown }
  } catch {
    return { ok: false }
  }
}

export async function POST(request: Request) {
  try {
    const parsedJson = await readJsonBody(request)
    if (!parsedJson.ok) {
      return leadError(400, 'Некорректные данные заявки')
    }

    const body = parseLeadRequestBody(parsedJson.value)
    if (!body) {
      return leadError(400, 'Некорректные данные заявки')
    }

    const payload = sanitizeOrderPayload(buildLeadPayload(body))
    if (!payload) {
      return leadError(400, 'Некорректные данные заявки')
    }

    const validationError = validateOrderPayload(payload)
    if (validationError) {
      return leadError(400, validationError)
    }

    if (!isServerCrmMode()) {
      console.log('[YUMI CRM demo] lead payload:', JSON.stringify(payload, null, 2))
      return NextResponse.json<OrderApiResponse>({ success: true, mode: 'demo' })
    }

    const { leadId, contactId } = await createOrderInAmo(payload)
    return NextResponse.json<OrderApiResponse>({
      success: true,
      mode: 'server',
      leadId,
      contactId,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Ошибка сервера'
    console.error('[YUMI CRM] lead error:', message)
    return leadError(500, 'Ошибка сервера')
  }
}
