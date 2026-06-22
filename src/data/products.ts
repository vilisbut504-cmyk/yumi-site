export type Product = {
  id: string
  slug: string
  name: string
  category: string
  protein: string
  purposes: string[]
  dogSizes: string[]
  texture: string
  hardness: 'мягкое' | 'среднее' | 'плотное' | 'жевательное'
  weight: string
  price: number
  oldPrice?: number | null
  imagePaths: string[]
  shortDescription: string
  composition: string
  howToUse: string
  storage: string
  warning: string
  tags: string[]
  isFeatured: boolean
}

const NOT_A_MEAL = 'Не является заменой основного рациона.'
const STORAGE_DEFAULT =
  'Хранить в сухом прохладном месте, в закрытой упаковке, вдали от прямых солнечных лучей.'
const USE_DEFAULT =
  'Давайте как дополнение к основному рациону. Вводите постепенно и следите за реакцией собаки. Обеспечьте доступ к свежей воде.'

/**
 * ДЕМО-данные. Реальные значения (цены, вес, состав, фото) подставляются
 * из таблицы Excel и из Timeweb Cloud S3 — см. примечание в конце задачи.
 */
export const products: Product[] = [
  // ─────────────── ГОВЯДИНА ───────────────
  {
    id: 'beef-rubec',
    slug: 'rubec-govyazhiy-sushenyy',
    name: 'Рубец говяжий сушёный',
    category: 'Говядина',
    protein: 'Говядина',
    purposes: ['Поощрение', 'Длительное жевание', 'Ежедневное лакомство'],
    dogSizes: ['Малые', 'Средние', 'Крупные'],
    texture: 'Волокнистое, пористое',
    hardness: 'жевательное',
    weight: '100 г',
    price: 390,
    oldPrice: null,
    imagePaths: ['/products/govyadina/rubec-govyazhiy-sushenyy/01.webp'],
    shortDescription:
      'Натуральный сушёный говяжий рубец — ароматное лакомство для длительного жевания.',
    composition: '100% говяжий рубец. Без добавок, соли и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Говядина', 'Жевательное', 'Натуральное'],
    isFeatured: true,
  },
  {
    id: 'beef-legkoe-1x1',
    slug: 'legkoe-govyazhe-1x1',
    name: 'Лёгкое говяжье 1×1',
    category: 'Говядина',
    protein: 'Говядина',
    purposes: ['Дрессировка', 'Поощрение'],
    dogSizes: ['Малые', 'Средние', 'Крупные'],
    texture: 'Лёгкое, воздушное',
    hardness: 'мягкое',
    weight: '50 г',
    price: 290,
    oldPrice: null,
    imagePaths: ['/products/govyadina/legkoe-govyazhe-1x1/01.webp'],
    shortDescription:
      'Мягкие кусочки сушёного говяжьего лёгкого — удобный размер для дрессировки.',
    composition: '100% говяжье лёгкое. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Говядина', 'Мягкое', 'Дрессировка'],
    isFeatured: true,
  },
  {
    id: 'beef-pechen-1x1',
    slug: 'pechen-govyazhya-1x1',
    name: 'Печень говяжья 1×1',
    category: 'Говядина',
    protein: 'Говядина',
    purposes: ['Дрессировка', 'Поощрение'],
    dogSizes: ['Малые', 'Средние', 'Крупные'],
    texture: 'Плотное, ароматное',
    hardness: 'среднее',
    weight: '50 г',
    price: 320,
    oldPrice: null,
    imagePaths: ['/products/govyadina/pechen-govyazhya-1x1/01.webp'],
    shortDescription:
      'Ароматные кубики сушёной говяжьей печени — мотивирующее лакомство для занятий.',
    composition: '100% говяжья печень. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Говядина', 'Дрессировка', 'Ароматное'],
    isFeatured: false,
  },
  {
    id: 'beef-traheya',
    slug: 'traheya-govyazhya',
    name: 'Трахея говяжья',
    category: 'Говядина',
    protein: 'Говядина',
    purposes: ['Длительное жевание', 'Для занятости'],
    dogSizes: ['Средние', 'Крупные'],
    texture: 'Хрящевое, пористое',
    hardness: 'жевательное',
    weight: '1 шт.',
    price: 250,
    oldPrice: null,
    imagePaths: ['/products/govyadina/traheya-govyazhya/01.webp'],
    shortDescription:
      'Натуральная сушёная говяжья трахея для длительного жевания.',
    composition: '100% говяжья трахея. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Говядина', 'Жевательное', 'Для занятости'],
    isFeatured: false,
  },
  {
    id: 'beef-zhilka',
    slug: 'zhilka-govyazhya',
    name: 'Жилка говяжья',
    category: 'Говядина',
    protein: 'Говядина',
    purposes: ['Длительное жевание', 'Для занятости'],
    dogSizes: ['Малые', 'Средние', 'Крупные'],
    texture: 'Плотное, тянущееся',
    hardness: 'плотное',
    weight: '100 г',
    price: 360,
    oldPrice: null,
    imagePaths: ['/products/govyadina/zhilka-govyazhya/01.webp'],
    shortDescription:
      'Сушёная говяжья жилка — плотное лакомство для активного жевания.',
    composition: '100% говяжьи сухожилия. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Говядина', 'Плотное', 'Длительное жевание'],
    isFeatured: false,
  },
  {
    id: 'beef-ushi',
    slug: 'ushi-govyazhi',
    name: 'Уши говяжьи',
    category: 'Говядина',
    protein: 'Говядина',
    purposes: ['Длительное жевание', 'Для занятости', 'Поощрение'],
    dogSizes: ['Средние', 'Крупные'],
    texture: 'Хрустящее, плотное',
    hardness: 'плотное',
    weight: '1 шт.',
    price: 180,
    oldPrice: null,
    imagePaths: ['/products/govyadina/ushi-govyazhi/01.webp'],
    shortDescription:
      'Натуральные сушёные говяжьи уши — популярное лакомство для жевания.',
    composition: '100% говяжьи уши. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Говядина', 'Плотное', 'Для занятости'],
    isFeatured: false,
  },

  // ─────────────── ПТИЦА ───────────────
  {
    id: 'turkey-myaso-1x1',
    slug: 'myaso-indeyki-1x1',
    name: 'Мясо индейки кусочки 1×1',
    category: 'Птица',
    protein: 'Индейка',
    purposes: ['Дрессировка', 'Поощрение', 'Ежедневное лакомство'],
    dogSizes: ['Малые', 'Средние', 'Крупные'],
    texture: 'Плотное, мясное',
    hardness: 'среднее',
    weight: '50 г',
    price: 340,
    oldPrice: null,
    imagePaths: ['/products/ptica/myaso-indeyki-1x1/01.webp'],
    shortDescription:
      'Сушёные кусочки мяса индейки — лёгкое лакомство. Вводите постепенно и следите за реакцией собаки.',
    composition: '100% мясо индейки. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Птица', 'Индейка', 'Дрессировка'],
    isFeatured: true,
  },

  // ─────────────── ПЕЧЕНЬЕ ───────────────
  {
    id: 'cookie-turkey',
    slug: 'pechenye-iz-indeyki',
    name: 'Печенье из индейки',
    category: 'Печенье',
    protein: 'Индейка',
    purposes: ['Поощрение', 'Ежедневное лакомство'],
    dogSizes: ['Малые', 'Средние', 'Крупные'],
    texture: 'Хрустящее',
    hardness: 'среднее',
    weight: '100 г',
    price: 260,
    oldPrice: null,
    imagePaths: ['/products/pechenye/pechenye-iz-indeyki/01.webp'],
    shortDescription:
      'Хрустящее печенье из индейки — лакомство для поощрения. Вводите постепенно и следите за реакцией собаки.',
    composition: 'Мясо индейки, мука. Без искусственных красителей и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Печенье', 'Индейка', 'Хрустящее'],
    isFeatured: false,
  },

  // ─────────────── БАРАНИНА ───────────────
  {
    id: 'lamb-legkoe',
    slug: 'legkoe-barane',
    name: 'Лёгкое баранье',
    category: 'Баранина',
    protein: 'Баранина',
    purposes: ['Дрессировка', 'Поощрение'],
    dogSizes: ['Малые', 'Средние', 'Крупные'],
    texture: 'Лёгкое, воздушное',
    hardness: 'мягкое',
    weight: '50 г',
    price: 330,
    oldPrice: null,
    imagePaths: ['/products/baranina/legkoe-barane/01.webp'],
    shortDescription:
      'Мягкое сушёное баранье лёгкое — лакомство для собак. Вводите постепенно и следите за реакцией собаки.',
    composition: '100% баранье лёгкое. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Баранина', 'Мягкое', 'Дрессировка'],
    isFeatured: false,
  },
  {
    id: 'lamb-rubec',
    slug: 'rubec-baraniy',
    name: 'Рубец бараний',
    category: 'Баранина',
    protein: 'Баранина',
    purposes: ['Длительное жевание', 'Ежедневное лакомство'],
    dogSizes: ['Малые', 'Средние', 'Крупные'],
    texture: 'Волокнистое, пористое',
    hardness: 'жевательное',
    weight: '100 г',
    price: 410,
    oldPrice: null,
    imagePaths: ['/products/baranina/rubec-baraniy/01.webp'],
    shortDescription:
      'Натуральный сушёный бараний рубец для жевания. Вводите постепенно и следите за реакцией собаки.',
    composition: '100% бараний рубец. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Баранина', 'Жевательное', 'Натуральное'],
    isFeatured: true,
  },

  // ─────────────── КРОЛИК ───────────────
  {
    id: 'rabbit-ushi',
    slug: 'ushi-krolika',
    name: 'Уши кролика',
    category: 'Кролик',
    protein: 'Кролик',
    purposes: ['Поощрение', 'Длительное жевание'],
    dogSizes: ['Малые', 'Средние'],
    texture: 'С ворсом, хрустящее',
    hardness: 'среднее',
    weight: '50 г',
    price: 300,
    oldPrice: null,
    imagePaths: ['/products/krolik/ushi-krolika/01.webp'],
    shortDescription:
      'Сушёные кроличьи уши с натуральным ворсом — лакомство для жевания. Вводите постепенно и следите за реакцией собаки.',
    composition: '100% уши кролика с ворсом. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Кролик', 'С ворсом', 'Длительное жевание'],
    isFeatured: false,
  },
  {
    id: 'rabbit-lapy',
    slug: 'lapy-krolika',
    name: 'Лапы кролика',
    category: 'Кролик',
    protein: 'Кролик',
    purposes: ['Поощрение', 'Длительное жевание'],
    dogSizes: ['Малые', 'Средние'],
    texture: 'С ворсом, плотное',
    hardness: 'плотное',
    weight: '50 г',
    price: 310,
    oldPrice: null,
    imagePaths: ['/products/krolik/lapy-krolika/01.webp'],
    shortDescription:
      'Сушёные лапы кролика — натуральное лакомство для жевания. Вводите постепенно и следите за реакцией собаки.',
    composition: '100% лапы кролика. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Кролик', 'С ворсом', 'Плотное'],
    isFeatured: false,
  },

  // ─────────────── СВИНИНА ───────────────
  {
    id: 'pork-ushi',
    slug: 'ushi-svinye',
    name: 'Уши свиные',
    category: 'Свинина',
    protein: 'Свинина',
    purposes: ['Длительное жевание', 'Для занятости', 'Поощрение'],
    dogSizes: ['Средние', 'Крупные'],
    texture: 'Хрустящее, плотное',
    hardness: 'плотное',
    weight: '1 шт.',
    price: 160,
    oldPrice: null,
    imagePaths: ['/products/svinina/ushi-svinye/01.webp'],
    shortDescription:
      'Натуральные сушёные свиные уши — лакомство для жевания. Вводите постепенно и следите за реакцией собаки.',
    composition: '100% свиные уши. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Свинина', 'Плотное', 'Для занятости'],
    isFeatured: false,
  },
  {
    id: 'pork-pyataki',
    slug: 'pyataki-sushenye',
    name: 'Пятаки сушёные',
    category: 'Свинина',
    protein: 'Свинина',
    purposes: ['Поощрение', 'Длительное жевание'],
    dogSizes: ['Малые', 'Средние', 'Крупные'],
    texture: 'Плотное, хрустящее',
    hardness: 'плотное',
    weight: '100 г',
    price: 280,
    oldPrice: null,
    imagePaths: ['/products/svinina/pyataki-sushenye/01.webp'],
    shortDescription:
      'Сушёные свиные пятаки — натуральное лакомство для жевания. Вводите постепенно и следите за реакцией собаки.',
    composition: '100% свиные пятаки. Без добавок и консервантов.',
    howToUse: USE_DEFAULT,
    storage: STORAGE_DEFAULT,
    warning: NOT_A_MEAL,
    tags: ['Свинина', 'Плотное', 'Натуральное'],
    isFeatured: false,
  },
]

export const PRODUCT_CATEGORIES = [
  'Говядина',
  'Баранина',
  'Птица',
  'Кролик',
  'Свинина',
  'Печенье',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export default products
