export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 12
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2
}
