import { PRODUCT_LINES_MAP, type ProductLine } from '@/lib/lines'

export type DogAge = 'puppy' | 'adult' | 'senior'
export type DogSize = 'small' | 'medium' | 'large'
export type DogActivity = 'low' | 'medium' | 'high'
export type DogFeature =
  | 'sensitive'
  | 'weight_gain'
  | 'active_sport'
  | 'none'

export interface QuizAnswers {
  age: DogAge | null
  size: DogSize | null
  activity: DogActivity | null
  feature: DogFeature | null
  name: string
  phone: string
  comment: string
}

export type { ProductLine }

export function recommendLine(
  answers: Pick<QuizAnswers, 'age' | 'size' | 'activity' | 'feature'>,
): ProductLine {
  if (answers.age === 'puppy') return PRODUCT_LINES_MAP.puppy
  if (answers.feature === 'sensitive') return PRODUCT_LINES_MAP.sensitive
  if (answers.size === 'small') return PRODUCT_LINES_MAP.small
  if (answers.size === 'large') return PRODUCT_LINES_MAP.large
  if (answers.activity === 'high') return PRODUCT_LINES_MAP.active
  return PRODUCT_LINES_MAP.adult
}

export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 12
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2
}
