#!/usr/bin/env node
/**
 * Проверка подключения к amoCRM.
 * Читает .env.local, НЕ печатает access token.
 *
 * Запуск: npm run amocrm:inspect
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function loadEnvLocal() {
  const file = path.join(root, '.env.local')
  if (!fs.existsSync(file)) {
    console.error('[!] Файл .env.local не найден. Создайте его с AMO_BASE_DOMAIN и AMO_ACCESS_TOKEN.')
    process.exit(1)
  }
  const env = {}
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    env[key] = val
  }
  return env
}

function baseUrl(domain) {
  if (!domain) return ''
  return domain.startsWith('http')
    ? domain.replace(/\/$/, '')
    : `https://${domain.replace(/\/$/, '')}`
}

async function amoGet(base, token, apiPath) {
  const res = await fetch(`${base}${apiPath}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`${apiPath} → ${res.status}: ${text}`)
  }
  return text ? JSON.parse(text) : null
}

async function main() {
  const env = loadEnvLocal()
  const domain = env.AMO_BASE_DOMAIN?.trim()
  const token = env.AMO_ACCESS_TOKEN?.trim()

  if (!domain || !token) {
    console.error('[!] Задайте AMO_BASE_DOMAIN и AMO_ACCESS_TOKEN в .env.local')
    process.exit(1)
  }

  const base = baseUrl(domain)
  console.log('amoCRM inspect')
  console.log('base:', base)
  console.log('token:', token ? `${token.slice(0, 6)}…${token.slice(-4)}` : '(missing)')
  console.log('')

  const account = await amoGet(base, token, '/api/v4/account')
  console.log('Account:')
  console.log('  id:', account.id)
  console.log('  name:', account.name)
  console.log('  subdomain:', account.subdomain)
  console.log('')

  const pipelines = await amoGet(base, token, '/api/v4/leads/pipelines')
  console.log('Pipelines:')
  for (const p of pipelines._embedded?.pipelines ?? []) {
    console.log(`  [${p.id}] ${p.name}`)
    for (const s of p._embedded?.statuses ?? []) {
      console.log(`    status [${s.id}] ${s.name}`)
    }
  }
  console.log('')

  const users = await amoGet(base, token, '/api/v4/users')
  console.log('Users:')
  for (const u of users._embedded?.users ?? []) {
    console.log(`  [${u.id}] ${u.name}`)
  }

  console.log('')
  console.log('Suggested ENV for Timeweb:')
  console.log('  AMO_PIPELINE_ID=...')
  console.log('  AMO_STATUS_NEW_ID=...')
  console.log('  AMO_RESPONSIBLE_USER_ID=...')
}

main().catch((err) => {
  console.error('[!]', err.message)
  process.exit(1)
})
