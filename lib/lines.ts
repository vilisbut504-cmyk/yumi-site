export type LineStatus = 'coming_soon'

export interface ProductLine {
  id: string
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  cardBg: string
  cardAccent: string
  status: LineStatus
}

export const PRODUCT_LINES: ProductLine[] = [
  {
    id: 'puppy',
    slug: 'puppy',
    name: 'ЮМИ Puppy',
    shortName: 'Puppy',
    tagline: 'Для щенков',
    description: 'Поддержка роста и здорового развития.',
    cardBg: '#F5E4D6',
    cardAccent: '#D4A88A',
    status: 'coming_soon',
  },
  {
    id: 'adult',
    slug: 'adult',
    name: 'ЮМИ Adult',
    shortName: 'Adult',
    tagline: 'Для взрослых собак',
    description: 'Баланс энергии и питательных веществ.',
    cardBg: '#EDE0D0',
    cardAccent: '#C4A882',
    status: 'coming_soon',
  },
  {
    id: 'sensitive',
    slug: 'sensitive',
    name: 'ЮМИ Sensitive',
    shortName: 'Sensitive',
    tagline: 'Для чувствительного пищеварения',
    description: 'Лёгкость и комфорт каждый день.',
    cardBg: '#E8E0EC',
    cardAccent: '#B8A8C8',
    status: 'coming_soon',
  },
  {
    id: 'small',
    slug: 'small-breed',
    name: 'ЮМИ Small Breed',
    shortName: 'Small Breed',
    tagline: 'Для собак малых пород',
    description: 'Мелкие гранулы, большая забота.',
    cardBg: '#E0EDE6',
    cardAccent: '#9CB8A4',
    status: 'coming_soon',
  },
  {
    id: 'large',
    slug: 'large-breed',
    name: 'ЮМИ Large Breed',
    shortName: 'Large Breed',
    tagline: 'Для собак крупных пород',
    description: 'Поддержка активности и ежедневного рациона.',
    cardBg: '#DDE4ED',
    cardAccent: '#9AADBE',
    status: 'coming_soon',
  },
  {
    id: 'active',
    slug: 'active',
    name: 'ЮМИ Active',
    shortName: 'Active',
    tagline: 'Для активных собак',
    description: 'Энергия, выносливость и восстановление.',
    cardBg: '#F0E0D0',
    cardAccent: '#D4A878',
    status: 'coming_soon',
  },
]

export const PRODUCT_LINES_MAP = Object.fromEntries(
  PRODUCT_LINES.map((line) => [line.id, line]),
) as Record<string, ProductLine>

export function getLineById(id: string): ProductLine | undefined {
  return PRODUCT_LINES_MAP[id]
}
