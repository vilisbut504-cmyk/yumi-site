export type LineStatus = 'coming_soon'

export interface ProductLine {
  id: string
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  audience: string[]
  highlights: string[]
  status: LineStatus
  /** Subtle mockup shade — always within brand burgundy family */
  mockupShade: string
}

export const PRODUCT_LINES: ProductLine[] = [
  {
    id: 'puppy',
    slug: 'puppy',
    name: 'ЮМИ Puppy',
    shortName: 'Puppy',
    tagline: 'Для щенков в период роста.',
    description:
      'Линейка для щенков с логикой подбора под возраст и размер. Рецептура и фасовки будут утверждены перед запуском.',
    audience: ['Щенки', 'Период роста', 'Породы разного размера'],
    highlights: ['Подбор под возраст', 'Удобные фасовки', 'Понятный переход на рацион'],
    status: 'coming_soon',
    mockupShade: '#8A0917',
  },
  {
    id: 'adult',
    slug: 'adult',
    name: 'ЮМИ Adult',
    shortName: 'Adult',
    tagline: 'Для ежедневного питания взрослых собак.',
    description:
      'Базовая линейка для ежедневного питания взрослых собак. Фокус на понятном составе и регулярном рационе.',
    audience: ['Взрослые собаки', 'Ежедневное питание', 'Городские владельцы'],
    highlights: ['Ежедневный рацион', 'Прозрачный состав', 'Регулярные фасовки'],
    status: 'coming_soon',
    mockupShade: '#7A0815',
  },
  {
    id: 'sensitive',
    slug: 'sensitive',
    name: 'ЮМИ Sensitive',
    shortName: 'Sensitive',
    tagline: 'Для собак с чувствительным пищеварением.',
    description:
      'Линейка для собак с особыми потребностями в питании. Без медицинских обещаний — только продуманный подход к составу.',
    audience: ['Чувствительное пищеварение', 'Особые потребности', 'Щадящий рацион'],
    highlights: ['Продуманный состав', 'Мягкий переход', 'Понятная коммуникация'],
    status: 'coming_soon',
    mockupShade: '#6B0612',
  },
  {
    id: 'small',
    slug: 'small-breed',
    name: 'ЮМИ Small Breed',
    shortName: 'Small Breed',
    tagline: 'Для маленьких пород.',
    description:
      'Формула с учётом компактного размера собаки и удобства ежедневного кормления в городе.',
    audience: ['Маленькие породы', 'До 15 кг', 'Компактные рационы'],
    highlights: ['Под размер породы', 'Удобные порции', 'Городской формат'],
    status: 'coming_soon',
    mockupShade: '#9A1A26',
  },
  {
    id: 'large',
    slug: 'large-breed',
    name: 'ЮМИ Large Breed',
    shortName: 'Large Breed',
    tagline: 'Для крупных собак.',
    description:
      'Линейка для крупных собак с акцентом на удобство порционирования и регулярного питания.',
    audience: ['Крупные породы', '30+ кг', 'Активные прогулки'],
    highlights: ['Крупные фасовки', 'Регулярный рацион', 'Понятный подбор'],
    status: 'coming_soon',
    mockupShade: '#5C050F',
  },
  {
    id: 'active',
    slug: 'active',
    name: 'ЮМИ Active',
    shortName: 'Active',
    tagline: 'Для активных собак.',
    description:
      'Для собак с высокой активностью, длительными прогулками и тренировками. Детали рецептуры — после утверждения.',
    audience: ['Высокая активность', 'Спорт и прогулки', 'Энергичные собаки'],
    highlights: ['Под нагрузку', 'Регулярное питание', 'Понятный подбор'],
    status: 'coming_soon',
    mockupShade: '#A02430',
  },
]

export const PRODUCT_LINES_MAP = Object.fromEntries(
  PRODUCT_LINES.map((line) => [line.id, line]),
) as Record<string, ProductLine>

export function getLineById(id: string): ProductLine | undefined {
  return PRODUCT_LINES_MAP[id]
}
