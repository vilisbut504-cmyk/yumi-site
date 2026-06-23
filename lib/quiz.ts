import { isCompletePhone } from '@/lib/phone'

export function validatePhone(phone: string): boolean {
  return isCompletePhone(phone)
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2
}
