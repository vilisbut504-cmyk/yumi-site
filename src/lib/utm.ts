import type { OrderUtm } from './orderPayload'

const STORAGE_KEY = 'yumi-utm-v1'

/** Читает UTM из текущего URL и сохраняет в localStorage. Вызывать на клиенте при загрузке. */
export function captureUtmFromUrl(): OrderUtm {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const utm: OrderUtm = {
    source: params.get('utm_source') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
    content: params.get('utm_content') || undefined,
    term: params.get('utm_term') || undefined,
  }

  const hasAny = Object.values(utm).some(Boolean)
  if (hasAny) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(utm))
    } catch {
      // ignore quota errors
    }
  }

  return utm
}

/** Возвращает сохранённые UTM-метки (или пустой объект). */
export function getStoredUtm(): OrderUtm {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as OrderUtm
  } catch {
    return {}
  }
}

/** UTM для отправки в API: сначала из storage, иначе из URL. */
export function getUtmForPayload(): OrderUtm {
  const stored = getStoredUtm()
  if (Object.values(stored).some(Boolean)) return stored
  return captureUtmFromUrl()
}

/** Контекст страницы для CRM payload. */
export function getPageContext(): { url: string; referrer?: string } {
  if (typeof window === 'undefined') {
    return { url: '' }
  }
  return {
    url: window.location.href,
    referrer: document.referrer || undefined,
  }
}
