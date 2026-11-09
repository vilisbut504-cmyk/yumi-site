#!/usr/bin/env node
/**
 * Локальные безопасные тесты amoCRM-интеграции БЕЗ записи в CRM.
 * Запуск: node scripts/amocrm-safe-tests.mjs
 */

import assert from 'node:assert/strict'

function toAmoLeadPrice(total) {
  if (!Number.isFinite(total) || total <= 0) return 0
  return Math.round(total)
}

function parseAmoEnvId(raw) {
  if (raw == null) return undefined
  const trimmed = String(raw).trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  if (!Number.isFinite(n) || n <= 0) return undefined
  return Math.trunc(n)
}

function parseAmoProblemJson(status, method, path, data) {
  const obj = data && typeof data === 'object' && !Array.isArray(data) ? data : null
  const title = obj && typeof obj.title === 'string' ? obj.title : undefined
  const detail = obj && typeof obj.detail === 'string' ? obj.detail : undefined
  const validationErrors = []
  if (Array.isArray(obj?.['validation-errors'])) {
    for (const group of obj['validation-errors']) {
      if (!group || typeof group !== 'object') continue
      validationErrors.push({
        request_id: group.request_id != null ? String(group.request_id) : undefined,
        errors: Array.isArray(group.errors)
          ? group.errors.map((e) => ({
              path: typeof e?.path === 'string' ? e.path : undefined,
              code: typeof e?.code === 'string' ? e.code : undefined,
              detail: typeof e?.detail === 'string' ? e.detail : undefined,
            }))
          : [],
      })
    }
  }
  return { status, method, path, title, detail, validationErrors }
}

function buildLeadBody(totalsTotal, source = 'checkout') {
  const body = {
    name: 'Заказ с сайта ЮМИ — [redacted]',
    price: toAmoLeadPrice(totalsTotal),
    _embedded: { tags: [{ name: 'ЮМИ' }, { name: 'Сайт' }, { name: source }] },
  }
  const pipelineId = parseAmoEnvId(process.env.AMO_PIPELINE_ID || '11044042')
  const statusId = parseAmoEnvId(process.env.AMO_STATUS_NEW_ID || '86769378')
  const responsibleId = parseAmoEnvId(process.env.AMO_RESPONSIBLE_USER_ID || '13963678')
  if (pipelineId != null) body.pipeline_id = pipelineId
  if (statusId != null) body.status_id = statusId
  if (responsibleId != null) body.responsible_user_id = responsibleId
  return body
}

function clientSafeError(_internalMessage) {
  // Клиенту нельзя отдавать path/detail amoCRM — только общий текст.
  return 'Не удалось отправить заказ. Попробуйте ещё раз или напишите нам в Telegram.'
}

let passed = 0
function test(name, fn) {
  fn()
  passed += 1
  console.log('OK', name)
}

test('price int for fractional totals', () => {
  assert.equal(toAmoLeadPrice(162.5), 163)
  assert.equal(toAmoLeadPrice(306.25), 306)
  assert.equal(toAmoLeadPrice(200), 200)
  assert.equal(toAmoLeadPrice(0), 0)
  assert.equal(toAmoLeadPrice(-1), 0)
})

test('JSON serialization of price is integer token', () => {
  const body = buildLeadBody(162.5)
  const json = JSON.stringify([body])
  assert.match(json, /"price":163/)
  assert.equal(json.includes('"price":162.5'), false)
  assert.equal(typeof body.price, 'number')
  assert.equal(Number.isInteger(body.price), true)
})

test('env ids parsed as numbers', () => {
  assert.equal(parseAmoEnvId('11044042'), 11044042)
  assert.equal(parseAmoEnvId(' 86769378 '), 86769378)
  assert.equal(parseAmoEnvId(''), undefined)
  assert.equal(parseAmoEnvId('abc'), undefined)
  const body = buildLeadBody(200)
  assert.equal(typeof body.pipeline_id, 'number')
  assert.equal(typeof body.status_id, 'number')
  assert.equal(typeof body.responsible_user_id, 'number')
})

test('parse validation-errors from problem+json', () => {
  const summary = parseAmoProblemJson(400, 'POST', '/api/v4/leads', {
    title: 'Bad Request',
    detail: 'Request validation failed',
    'validation-errors': [
      {
        request_id: '0',
        errors: [
          {
            path: 'price',
            code: 'InvalidType',
            detail: 'This value should be of type int.',
          },
        ],
      },
    ],
  })
  assert.equal(summary.status, 400)
  assert.equal(summary.detail, 'Request validation failed')
  assert.equal(summary.validationErrors[0].errors[0].path, 'price')
  assert.equal(summary.validationErrors[0].errors[0].code, 'InvalidType')
})

test('status codes mapping placeholders', () => {
  for (const status of [401, 403, 429, 500]) {
    const s = parseAmoProblemJson(status, 'POST', '/api/v4/leads', {
      title: 'Error',
      detail: 'fail',
    })
    assert.equal(s.status, status)
    assert.equal(s.validationErrors.length, 0)
  }
})

test('client message has no amo internals', () => {
  const msg = clientSafeError('amoCRM 400: price: InvalidType ...')
  assert.match(msg, /Не удалось отправить заказ/)
  assert.equal(msg.includes('InvalidType'), false)
  assert.equal(msg.includes('validation-errors'), false)
  assert.equal(msg.includes('amoCRM'), false)
})

test('lead form zero total stays int 0', () => {
  const body = buildLeadBody(0, 'lead_form')
  assert.equal(body.price, 0)
  assert.equal(Number.isInteger(body.price), true)
})

console.log(`\nPassed ${passed} safe tests (no CRM writes).`)
