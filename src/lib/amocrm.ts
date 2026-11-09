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

export interface AmoValidationErrorItem {
  path?: string
  code?: string
  detail?: string
}

export interface AmoValidationErrorGroup {
  request_id?: string
  errors: AmoValidationErrorItem[]
}

/** Безопасная сводка ошибки amoCRM без PII и без тела запроса. */
export interface AmoErrorSummary {
  status: number
  method: HttpMethod
  path: string
  operation: string
  title?: string
  detail?: string
  validationErrors: AmoValidationErrorGroup[]
}

export class AmoRequestError extends Error {
  readonly summary: AmoErrorSummary

  constructor(summary: AmoErrorSummary) {
    const first = summary.validationErrors[0]?.errors?.[0]
    const hint = first?.path
      ? `${first.path}: ${first.code ?? ''} ${first.detail ?? ''}`.trim()
      : summary.detail || summary.title || `HTTP ${summary.status}`
    super(`amoCRM ${summary.status}: ${hint}`)
    this.name = 'AmoRequestError'
    this.summary = summary
  }
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

/** Числовой ID из env; пустые/NaN → undefined (поле не отправляем). */
export function parseAmoEnvId(raw: string | undefined): number | undefined {
  if (raw == null) return undefined
  const trimmed = String(raw).trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  if (!Number.isFinite(n) || n <= 0) return undefined
  return Math.trunc(n)
}

/**
 * Бюджет сделки в amoCRM — строго int (рубли).
 * Дробные суммы YUMI (162,50 ₽ и т.п.) иначе дают HTTP 400 InvalidType на path "price".
 */
export function toAmoLeadPrice(total: number): number {
  if (!Number.isFinite(total) || total <= 0) return 0
  return Math.round(total)
}

function operationFromPath(method: HttpMethod, path: string): string {
  if (method === 'GET' && path.includes('/contacts')) return 'find_contact'
  if (method === 'POST' && path === '/api/v4/contacts') return 'create_contact'
  if (method === 'POST' && path === '/api/v4/leads') return 'create_lead'
  if (method === 'POST' && /\/api\/v4\/leads\/\d+\/link/.test(path)) return 'link_contact'
  if (method === 'POST' && /\/api\/v4\/leads\/\d+\/notes/.test(path)) return 'add_note'
  return `${method} ${path}`
}

export function parseAmoProblemJson(
  status: number,
  method: HttpMethod,
  path: string,
  data: unknown,
): AmoErrorSummary {
  const obj =
    data && typeof data === 'object' && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : null

  const title = obj && typeof obj.title === 'string' ? obj.title : undefined
  const detail = obj && typeof obj.detail === 'string' ? obj.detail : undefined

  const rawGroups = obj?.['validation-errors']
  const validationErrors: AmoValidationErrorGroup[] = []
  if (Array.isArray(rawGroups)) {
    for (const group of rawGroups) {
      if (!group || typeof group !== 'object') continue
      const g = group as Record<string, unknown>
      const errors: AmoValidationErrorItem[] = []
      if (Array.isArray(g.errors)) {
        for (const err of g.errors) {
          if (!err || typeof err !== 'object') continue
          const e = err as Record<string, unknown>
          errors.push({
            path: typeof e.path === 'string' ? e.path : undefined,
            code: typeof e.code === 'string' ? e.code : undefined,
            detail: typeof e.detail === 'string' ? e.detail : undefined,
          })
        }
      }
      validationErrors.push({
        request_id:
          typeof g.request_id === 'string' || typeof g.request_id === 'number'
            ? String(g.request_id)
            : undefined,
        errors,
      })
    }
  }

  return {
    status,
    method,
    path,
    operation: operationFromPath(method, path),
    title,
    detail,
    validationErrors,
  }
}

/** Лог без PII / токенов / payload. */
export function logAmoErrorSafe(summary: AmoErrorSummary, context?: string): void {
  const payload = {
    context: context || 'amoCRM',
    status: summary.status,
    operation: summary.operation,
    path: summary.path,
    method: summary.method,
    title: summary.title,
    detail: summary.detail,
    validationErrors: summary.validationErrors,
  }
  console.error('[YUMI CRM]', JSON.stringify(payload))
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
      data = { detail: 'non-json response' }
    }
  }

  if (!res.ok) {
    const summary = parseAmoProblemJson(res.status, method, path, data)
    logAmoErrorSafe(summary)
    throw new AmoRequestError(summary)
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

export function buildContactBody(payload: OrderPayload): Record<string, unknown> {
  const phone = normalizePhone(payload.customer.phone)
  const name = payload.customer.name?.trim() || phone
  const custom_fields_values: Record<string, unknown>[] = [
    {
      field_code: 'PHONE',
      values: [{ value: phone, enum_code: 'MOB' }],
    },
  ]

  if (payload.customer.email) {
    custom_fields_values.push({
      field_code: 'EMAIL',
      values: [{ value: payload.customer.email, enum_code: 'WORK' }],
    })
  }

  return {
    name,
    custom_fields_values,
    _embedded: {
      tags: [{ name: 'ЮМИ' }, { name: 'Сайт' }],
    },
  }
}

export function buildLeadBody(payload: OrderPayload): Record<string, unknown> {
  const phone = normalizePhone(payload.customer.phone)
  const leadBody: Record<string, unknown> = {
    name: `Заказ с сайта ЮМИ — ${phone}`,
    // amoCRM требует int; дробные ₽ иначе → 400 InvalidType / path price
    price: toAmoLeadPrice(payload.totals.total),
    _embedded: {
      tags: [{ name: 'ЮМИ' }, { name: 'Сайт' }, { name: payload.source }],
    },
  }

  const pipelineId = parseAmoEnvId(process.env.AMO_PIPELINE_ID)
  const statusId = parseAmoEnvId(process.env.AMO_STATUS_NEW_ID)
  const responsibleId = parseAmoEnvId(process.env.AMO_RESPONSIBLE_USER_ID)

  if (pipelineId != null) leadBody.pipeline_id = pipelineId
  if (statusId != null) leadBody.status_id = statusId
  if (responsibleId != null) leadBody.responsible_user_id = responsibleId

  return leadBody
}

export async function createContact(payload: OrderPayload): Promise<number> {
  const data = await amoRequest<{ _embedded?: { contacts?: AmoContact[] } }>(
    'POST',
    '/api/v4/contacts',
    [buildContactBody(payload)],
  )
  const id = data._embedded?.contacts?.[0]?.id
  if (!id) throw new Error('amoCRM: не удалось создать контакт')
  return id
}

export async function createLead(payload: OrderPayload): Promise<number> {
  const data = await amoRequest<{ _embedded?: { leads?: AmoLead[] } }>(
    'POST',
    '/api/v4/leads',
    [buildLeadBody(payload)],
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

/**
 * Контакт → сделка → связь → примечание.
 * После успешного createLead повторно сделку не создаём: ошибки link/note
 * логируются, но заказ считается принятым (иначе клиентский retry плодит дубликаты).
 */
export async function createOrderInAmo(
  payload: OrderPayload,
): Promise<{ leadId: number; contactId: number }> {
  assertAmoConfigured()

  const phone = normalizePhone(payload.customer.phone)
  let contactId: number

  try {
    const existing = await findContactByPhone(phone)
    contactId = existing?.id ?? (await createContact(payload))
  } catch (err) {
    if (err instanceof AmoRequestError) {
      logAmoErrorSafe(err.summary, 'contact_primary_failed_fallback_minimal')
    }
    // Минимальный контакт без custom fields — если PHONE/EMAIL отклонены
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

  try {
    await linkContactToLead(leadId, contactId)
  } catch (err) {
    if (err instanceof AmoRequestError) {
      logAmoErrorSafe(err.summary, 'link_after_lead_created')
    } else {
      console.error('[YUMI CRM]', JSON.stringify({ context: 'link_after_lead_created', leadId }))
    }
  }

  try {
    await addLeadNote(leadId, buildLeadNote(payload))
  } catch (err) {
    if (err instanceof AmoRequestError) {
      logAmoErrorSafe(err.summary, 'note_after_lead_created')
    } else {
      console.error('[YUMI CRM]', JSON.stringify({ context: 'note_after_lead_created', leadId }))
    }
  }

  return { leadId, contactId }
}
