/**
 * Телефонный ввод для российских номеров.
 * Всегда нормализуем к формату +7 (999) 999-99-99.
 */

/** Возвращает до 10 цифр национального номера (без кода страны). */
export function extractNationalDigits(input: string): string {
  let d = input.replace(/\D/g, '')
  if (d.length === 11 && (d.startsWith('8') || d.startsWith('7'))) {
    d = d.slice(1)
  } else if (d.startsWith('8') || d.startsWith('7')) {
    // частичный ввод: трактуем ведущую 8/7 как код страны
    d = d.slice(1)
  }
  return d.slice(0, 10)
}

/** Форматирует ввод в маску +7 (999) 999-99-99. */
export function formatPhone(input: string): string {
  const d = extractNationalDigits(input)
  let out = '+7'
  if (d.length > 0) out += ` (${d.slice(0, 3)}`
  if (d.length >= 3) out += ')'
  if (d.length > 3) out += ` ${d.slice(3, 6)}`
  if (d.length > 6) out += `-${d.slice(6, 8)}`
  if (d.length > 8) out += `-${d.slice(8, 10)}`
  return out
}

/** Номер заполнен полностью (10 цифр национального номера). */
export function isCompletePhone(input: string): boolean {
  return extractNationalDigits(input).length === 10
}

/** Канонический вид для payload: +7XXXXXXXXXX. */
export function canonicalPhone(input: string): string {
  return `+7${extractNationalDigits(input)}`
}

export const PHONE_INITIAL = '+7 '
