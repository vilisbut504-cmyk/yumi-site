import type { OrderPayload } from './orderPayload'
import { buildLeadNote, normalizePhone } from './crmPayload'

type HttpMethod = 'GET' | 'POST' | 'PATCH'

interface AmoConfig {
  baseUrl: string
  token: string
}

interface AmoContact {
  id: number
  name: string
}

interface AmoLead {
  id: number
}

function getConfig(): AmoConfig | null {
  const domain = process.env.AMO_BASE_DOMAIN?.trim()
  const token = process.env.AMO_ACCESS_TOKEN?.trim()
  if (!domain || !token) return null

  const baseUrl = domain.startsWith('http')
    ? domain.replace(/\/$/, '')
    : `https://${domain.replace(/\/$/, '')}`

  return { baseUrl, token }
}

export function assertAmoConfigured(): void {
  if (!getConfig()) {
    throw new Error(
      'amoCRM не настроен: задайте AMO_BASE_DOMAIN и AMO_ACCESS_TOKEN в переменных окружения',
    )
  }
}

export async function amoRequest<T = unknown>(
  method: HttpMethod,
  path: string,
  body?: unknown,
): Promise<T> {
  const config = getConfig()
  if (!config) {
    throw new Error('amoCRM не настроен')
  }

  const url = `${config.baseUrl}${path.startsWith('/') ? path : `/${path}`}`
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: body != null ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  const text = await res.text()
  let data: unknown = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const detail =
      typeof data === 'object' && data && 'detail' in data
        ? String((data as { detail: string }).detail)
        : text || res.statusText
    throw new Error(`amoCRM ${res.status}: ${detail}`)
  }

  return data as T
}

export async function findContactByPhone(phone: string): Promise<AmoContact | null> {
  const normalized = normalizePhone(phone)
  const digits = normalized.replace(/\D/g, '')
  const query = encodeURIComponent(digits.slice(-10))
  const data = await amoRequest<{ _embedded?: { contacts?: AmoContact[] } }>(
    'GET',
    `/api/v4/contacts?query=${query}&limit=1`,
  )
  const contacts = data._embedded?.contacts
  return contacts?.[0] ?? null
}

export async function createContact(payload: OrderPayload): Promise<number> {
  const phone = normalizePhone(payload.customer.phone)
  const name = payload.customer.name?.trim() || phone
  const body: Record<string, unknown> = {
    name,
    custom_fields_values: [
      {
        field_code: 'PHONE',
        values: [{ value: phone, enum_code: 'MOB' }],
      },
    ],
    _embedded: {
      tags: [{ name: 'ЮМИ' }, { name: 'Сайт' }],
    },
  }

  if (payload.customer.email) {
    ;(body.custom_fields_values as unknown[]).push({
      field_code: 'EMAIL',
      values: [{ value: payload.customer.email, enum_code: 'WORK' }],
    })
  }

  const data = await amoRequest<{ _embedded?: { contacts?: AmoContact[] } }>(
    'POST',
    '/api/v4/contacts',
    [body],
  )
  const id = data._embedded?.contacts?.[0]?.id
  if (!id) throw new Error('amoCRM: не удалось создать контакт')
  return id
}

export async function createLead(payload: OrderPayload): Promise<number> {
  const phone = normalizePhone(payload.customer.phone)
  const leadBody: Record<string, unknown> = {
    name: `Заказ с сайта ЮМИ — ${phone}`,
    price: payload.totals.total,
    _embedded: {
      tags: [
        { name: 'ЮМИ' },
        { name: 'Сайт' },
        { name: payload.source },
      ],
    },
  }

  const pipelineId = Number(process.env.AMO_PIPELINE_ID)
  const statusId = Number(process.env.AMO_STATUS_NEW_ID)
  const responsibleId = Number(process.env.AMO_RESPONSIBLE_USER_ID)

  if (pipelineId) leadBody.pipeline_id = pipelineId
  if (statusId) leadBody.status_id = statusId
  if (responsibleId) leadBody.responsible_user_id = responsibleId

  const data = await amoRequest<{ _embedded?: { leads?: AmoLead[] } }>(
    'POST',
    '/api/v4/leads',
    [leadBody],
  )
  const id = data._embedded?.leads?.[0]?.id
  if (!id) throw new Error('amoCRM: не удалось создать сделку')
  return id
}

export async function linkContactToLead(
  leadId: number,
  contactId: number,
): Promise<void> {
  await amoRequest('POST', `/api/v4/leads/${leadId}/link`, [
    {
      to_entity_id: contactId,
      to_entity_type: 'contacts',
      metadata: { is_main: true },
    },
  ])
}

export async function addLeadNote(leadId: number, text: string): Promise<void> {
  await amoRequest('POST', `/api/v4/leads/${leadId}/notes`, [
    {
      note_type: 'common',
      params: { text },
    },
  ])
}

export async function createOrderInAmo(
  payload: OrderPayload,
): Promise<{ leadId: number; contactId: number }> {
  assertAmoConfigured()

  const phone = normalizePhone(payload.customer.phone)
  let contactId: number

  try {
    const existing = await findContactByPhone(phone)
    contactId = existing?.id ?? (await createContact(payload))
  } catch {
    // Если поиск/создание контакта с полями не сработало — создаём минимальный контакт
    const data = await amoRequest<{ _embedded?: { contacts?: AmoContact[] } }>(
      'POST',
      '/api/v4/contacts',
      [
        {
          name: payload.customer.name?.trim() || phone,
          _embedded: { tags: [{ name: 'ЮМИ' }, { name: 'Сайт' }] },
        },
      ],
    )
    const id = data._embedded?.contacts?.[0]?.id
    if (!id) throw new Error('amoCRM: не удалось создать контакт')
    contactId = id
  }

  const leadId = await createLead(payload)
  await linkContactToLead(leadId, contactId)
  await addLeadNote(leadId, buildLeadNote(payload))

  return { leadId, contactId }
}
