'use client'

import { formatPhone, PHONE_INITIAL } from '@/lib/phone'

export function PhoneInput({
  id,
  value,
  onChange,
  className = 'form-input',
}: {
  id?: string
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatPhone(e.target.value))
  }

  const handleFocus = () => {
    if (!value) onChange(PHONE_INITIAL)
  }

  return (
    <input
      id={id}
      className={className}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder="+7 (999) 999-99-99"
      value={value || PHONE_INITIAL}
      onFocus={handleFocus}
      onChange={handleChange}
    />
  )
}
