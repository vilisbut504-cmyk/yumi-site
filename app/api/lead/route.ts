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

function buildLeadPayload(body: LeadRequestBody): OrderPayload {
  const dogParts: string[] = []
  if (body.dog?.name) dogParts.push(`Собака: ${body.dog.name}`)
  if (body.dog?.age) dogParts.push(`Возраст: ${body.dog.age}`)
  if (body.dog?.weight) dogParts.push(`Вес: ${body.dog.weight}`)

  const commentParts = [body.customer.comment?.trim(), dogParts.join(', ')].filter(Boolean)

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
    totals: { subtotal: 0, total: 0 },
    utm: body.utm ?? {},
    page: body.page ?? { url: '' },
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadRequestBody
    const payload = sanitizeOrderPayload(buildLeadPayload(body))

    if (!payload) {
      return NextResponse.json<OrderApiResponse>(
        { success: false, mode: isServerCrmMode() ? 'server' : 'demo', error: 'Некорректные данные заявки' },
        { status: 400 },
      )
    }

    const validationError = validateOrderPayload(payload)
    if (validationError) {
      return NextResponse.json<OrderApiResponse>(
        { success: false, mode: isServerCrmMode() ? 'server' : 'demo', error: validationError },
        { status: 400 },
      )
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
    return NextResponse.json<OrderApiResponse>(
      { success: false, mode: 'server', error: message },
      { status: 500 },
    )
  }
}
