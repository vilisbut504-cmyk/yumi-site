'use client'

import { useEffect, useState } from 'react'
import { MAX_PACK_QTY, normalizePackQty } from '@/lib/cart'

interface QtyInputProps {
  value: number
  onChange: (qty: number) => void
  id?: string
  ariaLabel?: string
}

/**
 * Контрол количества упаковок: [−] [число] [+]
 * Число = упаковки по 100 г.
 */
export function QtyInput({ value, onChange, id, ariaLabel = 'Упаковок по 100 г' }: QtyInputProps) {
  const [draft, setDraft] = useState(String(value))

  useEffect(() => {
    setDraft(String(value))
  }, [value])

  const commit = (raw: string) => {
    if (raw.trim() === '') {
      setDraft(String(value))
      return
    }
    const next = normalizePackQty(raw)
    setDraft(String(next))
    if (next !== value) onChange(next)
  }

  return (
    <div className="qty">
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(normalizePackQty(value - 1))}
        aria-label="Меньше"
      >
        −
      </button>
      <input
        id={id}
        className="qty__input"
        type="number"
        inputMode="numeric"
        min={1}
        max={MAX_PACK_QTY}
        step={1}
        value={draft}
        aria-label={ariaLabel}
        onChange={(e) => {
          const v = e.target.value
          if (v === '') {
            setDraft('')
            return
          }
          if (!/^\d{1,3}$/.test(v)) return
          setDraft(v)
          const n = Number(v)
          if (n >= 1 && n <= MAX_PACK_QTY) onChange(n)
        }}
        onBlur={() => commit(draft)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            commit(draft)
            ;(e.target as HTMLInputElement).blur()
          }
        }}
      />
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(normalizePackQty(value + 1))}
        aria-label="Больше"
      >
        +
      </button>
    </div>
  )
}
