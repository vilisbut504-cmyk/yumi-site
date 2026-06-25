import { NextResponse } from 'next/server'
import { createOrderInAmo } from '@/src/lib/amocrm'
import {
  isServerCrmMode,
  sanitizeOrderPayload,
  validateOrderPayload,
} from '@/src/lib/crmPayload'
import type { OrderApiResponse } from '@/src/lib/orderPayload'

export async function POST(request: Request) {
  try {
    const raw = await request.json()
    const payload = sanitizeOrderPayload(raw)

    if (!payload) {
      return NextResponse.json<OrderApiResponse>(
        { success: false, mode: isServerCrmMode() ? 'server' : 'demo', error: 'Некорректные данные заказа' },
        { status: 400 },
      )
    }

    payload.source = 'checkout'

    const validationError = validateOrderPayload(payload)
    if (validationError) {
      return NextResponse.json<OrderApiResponse>(
        { success: false, mode: isServerCrmMode() ? 'server' : 'demo', error: validationError },
        { status: 400 },
      )
    }

    if (!isServerCrmMode()) {
      console.log('[YUMI CRM demo] order payload:', JSON.stringify(payload, null, 2))
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
    console.error('[YUMI CRM] order error:', message)
    return NextResponse.json<OrderApiResponse>(
      { success: false, mode: 'server', error: message },
      { status: 500 },
    )
  }
}
