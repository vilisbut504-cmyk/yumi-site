export type DogAge = 'puppy' | 'adult' | 'senior'
export type DogWeight = 'under5' | '5to15' | '15to30' | 'over30'
export type DogActivity = 'low' | 'medium' | 'high'
export type DogFeature =
  | 'sensitive'
  | 'weight_gain'
  | 'active_sport'
  | 'none'

export interface QuizAnswers {
  age: DogAge | null
  weight: DogWeight | null
  activity: DogActivity | null
  feature: DogFeature | null
  currentFood: string | null
  name: string
  phone: string
  comment: string
}

export interface ProductLine {
  id: string
  name: string
  tagline: string
}

export const PRODUCT_LINES: Record<string, ProductLine> = {
  puppy: {
    id: 'puppy',
    name: 'ЮМИ Puppy',
    tagline: 'Для щенков в период роста.',
  },
  sensitive: {
    id: 'sensitive',
    name: 'ЮМИ Sensitive',
    tagline: 'Для собак с чувствительным пищеварением.',
  },
  small: {
    id: 'small',
    name: 'ЮМИ Small Breed',
    tagline: 'Для маленьких пород.',
  },
  large: {
    id: 'large',
    name: 'ЮМИ Large Breed',
    tagline: 'Для крупных собак.',
  },
  active: {
    id: 'active',
    name: 'ЮМИ Active',
    tagline: 'Для активных собак.',
  },
  adult: {
    id: 'adult',
    name: 'ЮМИ Adult',
    tagline: 'Для ежедневного питания взрослых собак.',
  },
}

export function recommendLine(answers: Pick<QuizAnswers, 'age' | 'weight' | 'activity' | 'feature'>): ProductLine {
  if (answers.age === 'puppy') return PRODUCT_LINES.puppy
  if (answers.feature === 'sensitive') return PRODUCT_LINES.sensitive
  if (answers.weight === 'under5' || answers.weight === '5to15') return PRODUCT_LINES.small
  if (answers.weight === 'over30') return PRODUCT_LINES.large
  if (answers.activity === 'high') return PRODUCT_LINES.active
  return PRODUCT_LINES.adult
}

export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 12
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2
}
