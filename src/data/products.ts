// ВНИМАНИЕ: файл сгенерирован scripts/import-products-from-excel.mjs.
// Не редактируйте вручную — запустите: npm run import:products
//
// Публичные цены (наценка 30%) импортированы из data/Юми Сушка (1).xlsx.
// В файле нет закупки, себестоимости, упаковки, маржи, цен конкурентов и поставщика.

export type ProductHardness = 'мягкое' | 'среднее' | 'плотное' | 'жевательное'
export type ProductUnit = 'weight' | 'piece'
export type ProductStatus = 'active' | 'draft' | 'no_price'

export type Product = {
  id: string
  slug: string
  name: string
  category: string
  protein: string
  purposes: string[]
  dogSizes: string[]
  texture: string
  hardness: ProductHardness
  format: string
  unit: ProductUnit
  weight: string
  price: number
  price100g: number | null
  pricePerKg: number | null
  status: ProductStatus
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

const RAW = [
  {
    "id": "rubec-govyazhiy-sushenyy",
    "slug": "rubec-govyazhiy-sushenyy",
    "name": "Рубец говяжий сушёный",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Волокнистое, упругое",
    "hardness": "жевательное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 169,
    "price100g": 169,
    "pricePerKg": 1690,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/rubec-govyazhiy-sushenyy/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжий рубец. Без добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "legkoe-govyazhe-plastiny",
    "slug": "legkoe-govyazhe-plastiny",
    "name": "Лёгкое говяжье сушёное, пластины",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Поощрение",
      "Дрессировка"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Лёгкое, воздушное",
    "hardness": "мягкое",
    "format": "пластины",
    "unit": "weight",
    "weight": "100 г",
    "price": 182,
    "price100g": 182,
    "pricePerKg": 1820,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжье лёгкое. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-govyazhe-2-5",
    "slug": "legkoe-govyazhe-2-5",
    "name": "Лёгкое говяжье сушёное, 2,5×2,5 см",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Поощрение",
      "Дрессировка"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Лёгкое, воздушное",
    "hardness": "мягкое",
    "format": "2,5×2,5 см",
    "unit": "weight",
    "weight": "100 г",
    "price": 182,
    "price100g": 182,
    "pricePerKg": 1820,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжье лёгкое. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-govyazhe-1x1",
    "slug": "legkoe-govyazhe-1x1",
    "name": "Лёгкое говяжье сушёное, кубики 1×1",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Дрессировка",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Лёгкое, воздушное",
    "hardness": "мягкое",
    "format": "кубики 1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 182,
    "price100g": 182,
    "pricePerKg": 1820,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/legkoe-govyazhe-1x1/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжье лёгкое. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "serdce-govyazhe-sushenoe",
    "slug": "serdce-govyazhe-sushenoe",
    "name": "Сердце говяжье сушёное",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Поощрение",
      "Дрессировка"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 260,
    "price100g": 260,
    "pricePerKg": 2600,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/serdce-govyazhe-sushenoe/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжье сердце. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "kolenki-govyazhi-sushenye",
    "slug": "kolenki-govyazhi-sushenye",
    "name": "Коленки говяжьи сушёные",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 156,
    "price100g": 156,
    "pricePerKg": 1560,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/kolenki-govyazhi-sushenye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжьи коленные хрящи. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "myaso-pishchevoda-govyazhe",
    "slug": "myaso-pishchevoda-govyazhe",
    "name": "Мясо пищевода говяжье сушёное",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Волокнистое, упругое",
    "hardness": "жевательное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 247,
    "price100g": 247,
    "pricePerKg": 2470,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/myaso-pishchevoda-govyazhe/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжий пищевод. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "myaso-govyadiny-kusochki",
    "slug": "myaso-govyadiny-kusochki",
    "name": "Мясо говядины сушёное, кубики 1×1",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Дрессировка",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "кубики 1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 312,
    "price100g": 312,
    "pricePerKg": 3120,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/myaso-govyadiny-kusochki/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% мясо говядины. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "bychiy-koren-ulitka",
    "slug": "bychiy-koren-ulitka",
    "name": "Бычий корень сушёный, улитка",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "улитка",
    "unit": "weight",
    "weight": "100 г",
    "price": 429,
    "price100g": 429,
    "pricePerKg": 4290,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжий бычий корень. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "bychiy-koren-10-15",
    "slug": "bychiy-koren-10-15",
    "name": "Бычий корень сушёный, 10–15 см",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "10–15 см",
    "unit": "weight",
    "weight": "100 г",
    "price": 429,
    "price100g": 429,
    "pricePerKg": 4290,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжий бычий корень. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "bychiy-koren-20-25",
    "slug": "bychiy-koren-20-25",
    "name": "Бычий корень сушёный, 20–25 см",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "20–25 см",
    "unit": "weight",
    "weight": "100 г",
    "price": 429,
    "price100g": 429,
    "pricePerKg": 4290,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжий бычий корень. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "zhilka-govyazhya",
    "slug": "zhilka-govyazhya",
    "name": "Жилка говяжья сушёная",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 195,
    "price100g": 195,
    "pricePerKg": 1950,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/zhilka-govyazhya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжьи сухожилия. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "hryashch-lopatochnyy",
    "slug": "hryashch-lopatochnyy",
    "name": "Хрящ говяжий лопаточный сушёный",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 182,
    "price100g": 182,
    "pricePerKg": 1820,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/hryashch-lopatochnyy/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжий хрящ. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "traheya-govyazhya-trubka",
    "slug": "traheya-govyazhya-trubka",
    "name": "Трахея говяжья сушёная, трубка",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Волокнистое, упругое",
    "hardness": "жевательное",
    "format": "трубка",
    "unit": "weight",
    "weight": "100 г",
    "price": 208,
    "price100g": 208,
    "pricePerKg": 2080,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжья трахея. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "traheya-rakushki",
    "slug": "traheya-rakushki",
    "name": "Трахея говяжья сушёная, ракушка",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Волокнистое, упругое",
    "hardness": "жевательное",
    "format": "ракушка",
    "unit": "weight",
    "weight": "100 г",
    "price": 208,
    "price100g": 208,
    "pricePerKg": 2080,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/traheya-rakushki/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжья трахея. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "traheya-govyazhya-kolechki",
    "slug": "traheya-govyazhya-kolechki",
    "name": "Трахея говяжья сушёная, колечки",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Волокнистое, упругое",
    "hardness": "жевательное",
    "format": "колечки",
    "unit": "weight",
    "weight": "100 г",
    "price": 208,
    "price100g": 208,
    "pricePerKg": 2080,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/traheya-govyazhya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжья трахея. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "vymya-govyazhe-1x1",
    "slug": "vymya-govyazhe-1x1",
    "name": "Вымя говяжье сушёное, кубики 1×1",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "кубики 1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 169,
    "price100g": 169,
    "pricePerKg": 1690,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/vymya-govyazhe/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжье вымя. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "ushi-govyazhi",
    "slug": "ushi-govyazhi",
    "name": "Уши говяжьи сушёные",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 221,
    "price100g": 221,
    "pricePerKg": 2210,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/ushi-govyazhi/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжьи уши. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "semenniki-kusochki-sushenye",
    "slug": "semenniki-kusochki-sushenye",
    "name": "Семенники говяжьи сушёные, кусочки",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "кусочки",
    "unit": "weight",
    "weight": "100 г",
    "price": 221,
    "price100g": 221,
    "pricePerKg": 2210,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/semenniki-kusochki-sushenye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжьи семенники. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "pechen-govyazhya-1x1",
    "slug": "pechen-govyazhya-1x1",
    "name": "Печень говяжья сушёная, кубики 1×1",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Дрессировка",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "кубики 1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 182,
    "price100g": 182,
    "pricePerKg": 1820,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/pechen-govyazhya-1x1/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжья печень. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "rubec-baraniy",
    "slug": "rubec-baraniy",
    "name": "Рубец бараний сушёный",
    "category": "Баранина",
    "protein": "Баранина",
    "purposes": [
      "Длительное жевание",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Волокнистое, упругое",
    "hardness": "жевательное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 169,
    "price100g": 169,
    "pricePerKg": 1690,
    "status": "active",
    "imagePaths": [
      "/products/baranina/rubec-baraniy/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% бараний рубец. Без добавок и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "myaso-pishchevoda-barane",
    "slug": "myaso-pishchevoda-barane",
    "name": "Мясо пищевода баранье сушёное",
    "category": "Баранина",
    "protein": "Баранина",
    "purposes": [
      "Длительное жевание"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Волокнистое, упругое",
    "hardness": "жевательное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 208,
    "price100g": 208,
    "pricePerKg": 2080,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% бараний пищевод. Без добавок и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-barane-plastiny",
    "slug": "legkoe-barane-plastiny",
    "name": "Лёгкое баранье сушёное, пластины",
    "category": "Баранина",
    "protein": "Баранина",
    "purposes": [
      "Поощрение",
      "Дрессировка"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Лёгкое, воздушное",
    "hardness": "мягкое",
    "format": "пластины",
    "unit": "weight",
    "weight": "100 г",
    "price": 182,
    "price100g": 182,
    "pricePerKg": 1820,
    "status": "active",
    "imagePaths": [
      "/products/baranina/legkoe-barane/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% баранье лёгкое. Без добавок и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-barane-2-5",
    "slug": "legkoe-barane-2-5",
    "name": "Лёгкое баранье сушёное, 2,5×2,5 см",
    "category": "Баранина",
    "protein": "Баранина",
    "purposes": [
      "Поощрение",
      "Дрессировка"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Лёгкое, воздушное",
    "hardness": "мягкое",
    "format": "2,5×2,5 см",
    "unit": "weight",
    "weight": "100 г",
    "price": 182,
    "price100g": 182,
    "pricePerKg": 1820,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% баранье лёгкое. Без добавок и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-barane-1x1",
    "slug": "legkoe-barane-1x1",
    "name": "Лёгкое баранье сушёное, кубики 1×1",
    "category": "Баранина",
    "protein": "Баранина",
    "purposes": [
      "Дрессировка",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Лёгкое, воздушное",
    "hardness": "мягкое",
    "format": "кубики 1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 182,
    "price100g": 182,
    "pricePerKg": 1820,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% баранье лёгкое. Без добавок и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "golovy-utinye-sushenye",
    "slug": "golovy-utinye-sushenye",
    "name": "Головы утиные сушёные",
    "category": "Птица",
    "protein": "Утка",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 143,
    "price100g": 143,
    "pricePerKg": 1430,
    "status": "active",
    "imagePaths": [
      "/products/ptica/golovy-utinye-sushenye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% утиные головы. Без добавок и консервантов.",
    "tags": [
      "Утка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "golovy-indeyki-sushenye",
    "slug": "golovy-indeyki-sushenye",
    "name": "Головы индейки сушёные",
    "category": "Птица",
    "protein": "Индейка",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 143,
    "price100g": 143,
    "pricePerKg": 1430,
    "status": "active",
    "imagePaths": [
      "/products/ptica/golovy-indeyki-sushenye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% головы индейки. Без добавок и консервантов.",
    "tags": [
      "Индейка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "myaso-indeyki-1x1",
    "slug": "myaso-indeyki-1x1",
    "name": "Мясо индейки сушёное, кубики 1×1",
    "category": "Птица",
    "protein": "Индейка",
    "purposes": [
      "Дрессировка",
      "Поощрение",
      "Ежедневное лакомство"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "кубики 1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 312,
    "price100g": 312,
    "pricePerKg": 3120,
    "status": "active",
    "imagePaths": [
      "/products/ptica/myaso-indeyki-1x1/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% мясо индейки. Без добавок и консервантов.",
    "tags": [
      "Индейка",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "lapki-utinye",
    "slug": "lapki-utinye",
    "name": "Лапы утиные сушёные",
    "category": "Птица",
    "protein": "Утка",
    "purposes": [
      "Поощрение",
      "Длительное жевание"
    ],
    "dogSizes": [
      "Малые",
      "Средние"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 156,
    "price100g": 156,
    "pricePerKg": 1560,
    "status": "active",
    "imagePaths": [
      "/products/ptica/lapki-utinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% утиные лапы. Без добавок и консервантов.",
    "tags": [
      "Утка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "utinye-zheludki",
    "slug": "utinye-zheludki",
    "name": "Желудки утиные сушёные",
    "category": "Птица",
    "protein": "Утка",
    "purposes": [
      "Поощрение",
      "Дрессировка"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 208,
    "price100g": 208,
    "pricePerKg": 2080,
    "status": "active",
    "imagePaths": [
      "/products/ptica/utinye-zheludki/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% утиные желудки. Без добавок и консервантов.",
    "tags": [
      "Утка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "sheya-utinaya-sushenaya",
    "slug": "sheya-utinaya-sushenaya",
    "name": "Шея утиная сушёная",
    "category": "Птица",
    "protein": "Утка",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 182,
    "price100g": 182,
    "pricePerKg": 1820,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% утиная шея. Без добавок и консервантов.",
    "tags": [
      "Утка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "shei-kurinye-sushenye",
    "slug": "shei-kurinye-sushenye",
    "name": "Шеи куриные сушёные",
    "category": "Птица",
    "protein": "Курица",
    "purposes": [
      "Поощрение",
      "Длительное жевание"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 169,
    "price100g": 169,
    "pricePerKg": 1690,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% куриные шеи. Без добавок и консервантов.",
    "tags": [
      "Курица",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "grebeshki-kurinye-sushenye",
    "slug": "grebeshki-kurinye-sushenye",
    "name": "Гребешки куриные сушёные",
    "category": "Птица",
    "protein": "Курица",
    "purposes": [
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 247,
    "price100g": 247,
    "pricePerKg": 2470,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% куриные гребешки. Без добавок и консервантов.",
    "tags": [
      "Курица",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "ushi-krolika",
    "slug": "ushi-krolika",
    "name": "Уши кролика сушёные",
    "category": "Кролик",
    "protein": "Кролик",
    "purposes": [
      "Поощрение",
      "Длительное жевание"
    ],
    "dogSizes": [
      "Малые",
      "Средние"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "с ворсом",
    "unit": "weight",
    "weight": "100 г",
    "price": 234,
    "price100g": 234,
    "pricePerKg": 2340,
    "status": "active",
    "imagePaths": [
      "/products/krolik/ushi-krolika/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% уши кролика с ворсом. Без добавок и консервантов.",
    "tags": [
      "Кролик",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "pyataki-sushenye",
    "slug": "pyataki-sushenye",
    "name": "Пятаки свиные сушёные",
    "category": "Свинина",
    "protein": "Свинина",
    "purposes": [
      "Поощрение",
      "Длительное жевание"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 182,
    "price100g": 182,
    "pricePerKg": 1820,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% свиные пятаки. Без добавок и консервантов.",
    "tags": [
      "Свинина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "aorta-govyazhya",
    "slug": "aorta-govyazhya",
    "name": "Аорта говяжья сушёная",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Волокнистое, упругое",
    "hardness": "жевательное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/govyadina/aorta-govyazhya/01.webp",
      "/products/govyadina/aorta-govyazhya/02.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжья аорта. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "hvost-govyazhiy-sushenyy",
    "slug": "hvost-govyazhiy-sushenyy",
    "name": "Хвост говяжий сушёный",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "piece",
    "weight": "1 шт",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/govyadina/hvost-govyazhiy-sushenyy/01.webp",
      "/products/govyadina/hvost-govyazhiy-sushenyy/02.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжий хвост. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "kaltyk-govyazhiy",
    "slug": "kaltyk-govyazhiy",
    "name": "Калтык говяжий сушёный",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Волокнистое, упругое",
    "hardness": "жевательное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/govyadina/kaltyk-govyazhiy/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжий калтык. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "noga-govyazhya-sushenaya",
    "slug": "noga-govyazhya-sushenaya",
    "name": "Нога говяжья сушёная",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "piece",
    "weight": "1 шт",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/govyadina/noga-govyazhya-sushenaya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжья нога. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "nosy-govyazhi",
    "slug": "nosy-govyazhi",
    "name": "Носы говяжьи сушёные",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "piece",
    "weight": "1 шт",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/govyadina/nosy-govyazhi/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжьи носы. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "nosy-govyazhi-s-sherstyu",
    "slug": "nosy-govyazhi-s-sherstyu",
    "name": "Носы говяжьи сушёные, с шерстью",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "с шерстью",
    "unit": "piece",
    "weight": "1 шт",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/govyadina/nosy-govyazhi-s-sherstyu/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжьи носы с шерстью. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "pechen-govyazhya",
    "slug": "pechen-govyazhya",
    "name": "Печень говяжья сушёная, целиком",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Поощрение",
      "Дрессировка"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "целиком",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/govyadina/pechen-govyazhya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжья печень. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "vymya-sushenoe",
    "slug": "vymya-sushenoe",
    "name": "Вымя говяжье сушёное, пластины",
    "category": "Говядина",
    "protein": "Говядина",
    "purposes": [
      "Длительное жевание"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "пластины",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/govyadina/vymya-sushenoe/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% говяжье вымя. Без добавок и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "noga-baranya-sushenaya",
    "slug": "noga-baranya-sushenaya",
    "name": "Нога баранья сушёная",
    "category": "Баранина",
    "protein": "Баранина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "piece",
    "weight": "1 шт",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/baranina/noga-baranya-sushenaya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% баранья нога. Без добавок и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "traheya-baranya-sushenaya",
    "slug": "traheya-baranya-sushenaya",
    "name": "Трахея баранья сушёная",
    "category": "Баранина",
    "protein": "Баранина",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Волокнистое, упругое",
    "hardness": "жевательное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/baranina/traheya-baranya-sushenaya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% баранья трахея. Без добавок и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "golovy-perepelinye",
    "slug": "golovy-perepelinye",
    "name": "Головы перепелиные сушёные",
    "category": "Птица",
    "protein": "Перепел",
    "purposes": [
      "Поощрение",
      "Для занятости"
    ],
    "dogSizes": [
      "Малые",
      "Средние"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "piece",
    "weight": "1 шт",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/ptica/golovy-perepelinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% перепелиные головы. Без добавок и консервантов.",
    "tags": [
      "Перепел",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "myaso-indeyki-sushenoe",
    "slug": "myaso-indeyki-sushenoe",
    "name": "Мясо индейки сушёное",
    "category": "Птица",
    "protein": "Индейка",
    "purposes": [
      "Поощрение",
      "Ежедневное лакомство"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/ptica/myaso-indeyki-sushenoe/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% мясо индейки. Без добавок и консервантов.",
    "tags": [
      "Индейка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "serdechki-kurinye",
    "slug": "serdechki-kurinye",
    "name": "Сердечки куриные сушёные",
    "category": "Птица",
    "protein": "Курица",
    "purposes": [
      "Дрессировка",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/ptica/serdechki-kurinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% куриные сердечки. Без добавок и консервантов.",
    "tags": [
      "Курица",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "sheya-indeyki-sushenaya",
    "slug": "sheya-indeyki-sushenaya",
    "name": "Шея индейки сушёная",
    "category": "Птица",
    "protein": "Индейка",
    "purposes": [
      "Длительное жевание",
      "Для занятости"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "piece",
    "weight": "1 шт",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/ptica/sheya-indeyki-sushenaya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% шея индейки. Без добавок и консервантов.",
    "tags": [
      "Индейка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "lapy-krolika",
    "slug": "lapy-krolika",
    "name": "Лапы кролика сушёные",
    "category": "Кролик",
    "protein": "Кролик",
    "purposes": [
      "Поощрение",
      "Длительное жевание"
    ],
    "dogSizes": [
      "Малые",
      "Средние"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "с ворсом",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/krolik/lapy-krolika/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% лапы кролика. Без добавок и консервантов.",
    "tags": [
      "Кролик",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "pechenye-iz-indeyki",
    "slug": "pechenye-iz-indeyki",
    "name": "Печенье из индейки",
    "category": "Печенье",
    "protein": "Индейка",
    "purposes": [
      "Поощрение",
      "Ежедневное лакомство"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/pechenye/pechenye-iz-indeyki/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Мясо индейки, мука. Без искусственных красителей и консервантов.",
    "tags": [
      "Индейка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "pechenye-iz-krolika",
    "slug": "pechenye-iz-krolika",
    "name": "Печенье из кролика",
    "category": "Печенье",
    "protein": "Кролик",
    "purposes": [
      "Поощрение",
      "Ежедневное лакомство"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/pechenye/pechenye-iz-krolika/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Мясо кролика, мука. Без искусственных красителей и консервантов.",
    "tags": [
      "Кролик",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "ushi-svinye",
    "slug": "ushi-svinye",
    "name": "Уши свиные сушёные",
    "category": "Свинина",
    "protein": "Свинина",
    "purposes": [
      "Длительное жевание",
      "Для занятости",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, хрустящее",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/svinina/ushi-svinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "100% свиные уши. Без добавок и консервантов.",
    "tags": [
      "Свинина",
      "Натуральное"
    ],
    "isFeatured": false
  }
] as const

export const products: Product[] = RAW.map((p) => ({
  ...p,
  purposes: [...p.purposes],
  dogSizes: [...p.dogSizes],
  tags: [...p.tags],
  imagePaths: [...p.imagePaths],
  howToUse: USE_DEFAULT,
  storage: STORAGE_DEFAULT,
  warning: NOT_A_MEAL,
})) as Product[]

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
