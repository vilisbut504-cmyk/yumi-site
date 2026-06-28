// ВНИМАНИЕ: файл сгенерирован scripts/import-yuma-catalog.mjs.
// Не редактируйте вручную — запустите: npm run import:yuma
//
// Публичные цены сайта (за 100 г и за 1 кг) импортированы из data/import/Проект ЮМА.xlsx
// (колонки G и H). Закупочные/внутренние цены (колонки D/E) НЕ импортируются
// и нигде в проекте не хранятся.

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
    "id": "aorta-trubka",
    "slug": "aorta-trubka",
    "name": "Аорта трубка",
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
    "price": 195,
    "price100g": 195,
    "pricePerKg": 1950,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/aorta-trubka/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Аорта трубка. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "aorta-chipsy",
    "slug": "aorta-chipsy",
    "name": "Аорта чипсы",
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
      "/products/govyadina/aorta-chipsy/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Аорта чипсы. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "bychiy-koren-10-15",
    "slug": "bychiy-koren-10-15",
    "name": "Бычий корень",
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
    "texture": "Плотное, твёрдое",
    "hardness": "плотное",
    "format": "10-15",
    "unit": "weight",
    "weight": "100 г",
    "price": 450,
    "price100g": 450,
    "pricePerKg": 4500,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/bychiy-koren-10-15/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Бычий корень. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "bychiy-koren-20-25",
    "slug": "bychiy-koren-20-25",
    "name": "Бычий корень",
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
    "texture": "Плотное, твёрдое",
    "hardness": "плотное",
    "format": "20-25",
    "unit": "weight",
    "weight": "100 г",
    "price": 450,
    "price100g": 450,
    "pricePerKg": 4500,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/bychiy-koren-20-25/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Бычий корень. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "bychiy-koren-ulitka-bublik",
    "slug": "bychiy-koren-ulitka-bublik",
    "name": "Бычий корень улитка бублик",
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
    "texture": "Плотное, твёрдое",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 450,
    "price100g": 450,
    "pricePerKg": 4500,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Бычий корень улитка бублик. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "vymya-kusochki-1x1",
    "slug": "vymya-kusochki-1x1",
    "name": "Вымя кусочки",
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
    "format": "1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 150,
    "price100g": 150,
    "pricePerKg": 1500,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/vymya-kusochki-1x1/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Вымя кусочки. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "vymya-sushenoe-plastiny",
    "slug": "vymya-sushenoe-plastiny",
    "name": "Вымя сушеное пластины",
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
    "price": 150,
    "price100g": 150,
    "pricePerKg": 1500,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/vymya-sushenoe-plastiny/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Вымя сушеное пластины. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": true
  },
  {
    "id": "zhilka-govyazhya",
    "slug": "zhilka-govyazhya",
    "name": "Жилка говяжья",
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
    "price": 180,
    "price100g": 180,
    "pricePerKg": 1800,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/zhilka-govyazhya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Жилка говяжья. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "kaltyk",
    "slug": "kaltyk",
    "name": "Калтык",
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
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/kaltyk/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Калтык. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "kolenki-govyazhi",
    "slug": "kolenki-govyazhi",
    "name": "Коленки говяжьи",
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
    "texture": "Плотное, твёрдое",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 135,
    "price100g": 135,
    "pricePerKg": 1350,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/kolenki-govyazhi/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Коленки говяжьи. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-krupnyy-kusok-plastiny",
    "slug": "legkoe-krupnyy-kusok-plastiny",
    "name": "Легкое крупный кусок пластины",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/legkoe-krupnyy-kusok-plastiny/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Легкое крупный кусок пластины. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-melkoe-1x1",
    "slug": "legkoe-melkoe-1x1",
    "name": "Легкое мелкое",
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
    "texture": "Лёгкое, хрустящее",
    "hardness": "мягкое",
    "format": "1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/legkoe-melkoe-1x1/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Легкое мелкое. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-sredniy-kusok-2-5x2-5",
    "slug": "legkoe-sredniy-kusok-2-5x2-5",
    "name": "Легкое средний кусок",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "2,5×2,5",
    "unit": "weight",
    "weight": "100 г",
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/legkoe-sredniy-kusok-2-5x2-5/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Легкое средний кусок. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "myaso-govyadina-1x1",
    "slug": "myaso-govyadina-1x1",
    "name": "Мясо говядина",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 315,
    "price100g": 315,
    "pricePerKg": 3150,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/myaso-govyadina-1x1/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Мясо говядина. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "myaso-pishchevoda-govyazhe",
    "slug": "myaso-pishchevoda-govyazhe",
    "name": "Мясо пищевода говяжье",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 240,
    "price100g": 240,
    "pricePerKg": 2400,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/myaso-pishchevoda-govyazhe/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Мясо пищевода говяжье. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "noga-govyazhya",
    "slug": "noga-govyazhya",
    "name": "Нога говяжья",
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
    "texture": "Плотное, твёрдое",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/govyadina/noga-govyazhya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Нога говяжья. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "nosy-govyazhi",
    "slug": "nosy-govyazhi",
    "name": "Носы говяжьи",
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
    "price": 210,
    "price100g": 210,
    "pricePerKg": 2100,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/nosy-govyazhi/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Носы говяжьи. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "nosy-s-sherstyu",
    "slug": "nosy-s-sherstyu",
    "name": "Носы с шерстью",
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
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/govyadina/nosy-s-sherstyu/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Носы с шерстью. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "pechen-govyazh",
    "slug": "pechen-govyazh",
    "name": "Печень говяж",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Печень говяж. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "pechen-govyazhya-kusochki-1x1",
    "slug": "pechen-govyazhya-kusochki-1x1",
    "name": "Печень говяжья кусочки",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/pechen-govyazhya-kusochki-1x1/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Печень говяжья кусочки. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "rubec-govyazhiy",
    "slug": "rubec-govyazhiy",
    "name": "Рубец говяжий",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 150,
    "price100g": 150,
    "pricePerKg": 1500,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/rubec-govyazhiy/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Рубец говяжий. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "semenniki-govyazh",
    "slug": "semenniki-govyazh",
    "name": "Семенники говяж",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 210,
    "price100g": 210,
    "pricePerKg": 2100,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/semenniki-govyazh/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Семенники говяж. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "semenniki-kusochki-1x1",
    "slug": "semenniki-kusochki-1x1",
    "name": "Семенники кусочки",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 210,
    "price100g": 210,
    "pricePerKg": 2100,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/semenniki-kusochki-1x1/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Семенники кусочки. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "serdce-govyazhe",
    "slug": "serdce-govyazhe",
    "name": "Сердце говяжье",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 255,
    "price100g": 255,
    "pricePerKg": 2550,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/serdce-govyazhe/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Сердце говяжье. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "traheya-kolechki",
    "slug": "traheya-kolechki",
    "name": "Трахея колечки",
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
    "price": 195,
    "price100g": 195,
    "pricePerKg": 1950,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/traheya-kolechki/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Трахея колечки. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "traheya-rakushka",
    "slug": "traheya-rakushka",
    "name": "Трахея ракушка",
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
    "price": 195,
    "price100g": 195,
    "pricePerKg": 1950,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/traheya-rakushka/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Трахея ракушка. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "traheya-trubka",
    "slug": "traheya-trubka",
    "name": "Трахея трубка",
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
    "price": 195,
    "price100g": 195,
    "pricePerKg": 1950,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/traheya-trubka/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Трахея трубка. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "ushi-govyazhi",
    "slug": "ushi-govyazhi",
    "name": "Уши говяжьи",
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
    "price": 210,
    "price100g": 210,
    "pricePerKg": 2100,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/ushi-govyazhi/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Уши говяжьи. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "hvost-govyazhiy",
    "slug": "hvost-govyazhiy",
    "name": "Хвост говяжий",
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
    "texture": "Плотное, твёрдое",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 210,
    "price100g": 210,
    "pricePerKg": 2100,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/hvost-govyazhiy/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Хвост говяжий. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "hryashch-lopatochnyy",
    "slug": "hryashch-lopatochnyy",
    "name": "Хрящ лопаточный",
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
    "texture": "Плотное, твёрдое",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/govyadina/hryashch-lopatochnyy/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Хрящ лопаточный. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Говядина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "koren-baraniy",
    "slug": "koren-baraniy",
    "name": "Корень бараний",
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
    "texture": "Плотное, твёрдое",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Корень бараний. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-barane-2-5x2-5",
    "slug": "legkoe-barane-2-5x2-5",
    "name": "Легкое баранье",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "2,5×2,5",
    "unit": "weight",
    "weight": "100 г",
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/baranina/legkoe-barane-2-5x2-5/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Легкое баранье. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-barane-1x1",
    "slug": "legkoe-barane-1x1",
    "name": "Легкое баранье",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/baranina/legkoe-barane-1x1/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Легкое баранье. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "legkoe-barane-plastiny",
    "slug": "legkoe-barane-plastiny",
    "name": "Легкое баранье пластины",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/baranina/legkoe-barane-plastiny/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Легкое баранье пластины. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "myaso-pishchevoda-barane",
    "slug": "myaso-pishchevoda-barane",
    "name": "Мясо пищевода баранье",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 195,
    "price100g": 195,
    "pricePerKg": 1950,
    "status": "active",
    "imagePaths": [
      "/products/baranina/myaso-pishchevoda-barane/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Мясо пищевода баранье. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "noga-baranya-sht",
    "slug": "noga-baranya-sht",
    "name": "Нога баранья, шт",
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
    "texture": "Плотное, твёрдое",
    "hardness": "плотное",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/baranina/noga-baranya-sht/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Нога баранья, шт. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "rubec-baraniy",
    "slug": "rubec-baraniy",
    "name": "Рубец бараний",
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
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 150,
    "price100g": 150,
    "pricePerKg": 1500,
    "status": "active",
    "imagePaths": [
      "/products/baranina/rubec-baraniy/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Рубец бараний. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "traheya-baranya",
    "slug": "traheya-baranya",
    "name": "Трахея баранья",
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
    "price": 195,
    "price100g": 195,
    "pricePerKg": 1950,
    "status": "active",
    "imagePaths": [
      "/products/baranina/traheya-baranya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Трахея баранья. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Баранина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "golovy-indeyki",
    "slug": "golovy-indeyki",
    "name": "Головы индейки",
    "category": "Птица",
    "protein": "Индейка",
    "purposes": [
      "Длительное жевание",
      "Поощрение"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 120,
    "price100g": 120,
    "pricePerKg": 1200,
    "status": "active",
    "imagePaths": [
      "/products/ptica/golovy-indeyki/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Головы индейки. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Индейка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "golovy-perepelinye",
    "slug": "golovy-perepelinye",
    "name": "Головы перепелиные",
    "category": "Птица",
    "protein": "Перепел",
    "purposes": [
      "Длительное жевание",
      "Поощрение"
    ],
    "dogSizes": [
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
      "/products/ptica/golovy-perepelinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Головы перепелиные. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Перепел",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "golovy-utinye",
    "slug": "golovy-utinye",
    "name": "Головы утиные",
    "category": "Птица",
    "protein": "Утка",
    "purposes": [
      "Длительное жевание",
      "Поощрение"
    ],
    "dogSizes": [
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 120,
    "price100g": 120,
    "pricePerKg": 1200,
    "status": "active",
    "imagePaths": [
      "/products/ptica/golovy-utinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Головы утиные. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Утка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "grebeshki-kurinye",
    "slug": "grebeshki-kurinye",
    "name": "Гребешки куриные",
    "category": "Птица",
    "protein": "Курица",
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
    "price": 240,
    "price100g": 240,
    "pricePerKg": 2400,
    "status": "active",
    "imagePaths": [
      "/products/ptica/grebeshki-kurinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Гребешки куриные. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Курица",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "lapy-utinye",
    "slug": "lapy-utinye",
    "name": "Лапы утиные",
    "category": "Птица",
    "protein": "Утка",
    "purposes": [
      "Длительное жевание",
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
    "price": 135,
    "price100g": 135,
    "pricePerKg": 1350,
    "status": "active",
    "imagePaths": [
      "/products/ptica/lapy-utinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Лапы утиные. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Утка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "myaso-indeyki-1x1",
    "slug": "myaso-indeyki-1x1",
    "name": "Мясо индейки",
    "category": "Птица",
    "protein": "Индейка",
    "purposes": [
      "Длительное жевание",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Плотное, мясное",
    "hardness": "среднее",
    "format": "1×1",
    "unit": "weight",
    "weight": "100 г",
    "price": 315,
    "price100g": 315,
    "pricePerKg": 3150,
    "status": "active",
    "imagePaths": [
      "/products/ptica/myaso-indeyki-1x1/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Мясо индейки. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Индейка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "myaso-indeyki-plastiny",
    "slug": "myaso-indeyki-plastiny",
    "name": "Мясо индейки пластины",
    "category": "Птица",
    "protein": "Индейка",
    "purposes": [
      "Длительное жевание",
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
    "price": 315,
    "price100g": 315,
    "pricePerKg": 3150,
    "status": "active",
    "imagePaths": [
      "/products/ptica/myaso-indeyki-plastiny/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Мясо индейки пластины. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Индейка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "serdechki-kurinye",
    "slug": "serdechki-kurinye",
    "name": "Сердечки куриные",
    "category": "Птица",
    "protein": "Курица",
    "purposes": [
      "Длительное жевание",
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
    "price": 255,
    "price100g": 255,
    "pricePerKg": 2550,
    "status": "active",
    "imagePaths": [
      "/products/ptica/serdechki-kurinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Сердечки куриные. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Курица",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "utinye-zheludki",
    "slug": "utinye-zheludki",
    "name": "Утиные желудки",
    "category": "Птица",
    "protein": "Утка",
    "purposes": [
      "Длительное жевание",
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
    "price": 195,
    "price100g": 195,
    "pricePerKg": 1950,
    "status": "active",
    "imagePaths": [
      "/products/ptica/utinye-zheludki/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Утиные желудки. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Утка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "shei-kurinye",
    "slug": "shei-kurinye",
    "name": "Шеи куриные",
    "category": "Птица",
    "protein": "Курица",
    "purposes": [
      "Длительное жевание",
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
    "price": 150,
    "price100g": 150,
    "pricePerKg": 1500,
    "status": "active",
    "imagePaths": [
      "/products/ptica/shei-kurinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Шеи куриные. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Курица",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "sheya-indeyki",
    "slug": "sheya-indeyki",
    "name": "Шея индейки",
    "category": "Птица",
    "protein": "Индейка",
    "purposes": [
      "Длительное жевание",
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
      "/products/ptica/sheya-indeyki/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Шея индейки. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Индейка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "sheya-utinaya",
    "slug": "sheya-utinaya",
    "name": "Шея утиная",
    "category": "Птица",
    "protein": "Утка",
    "purposes": [
      "Длительное жевание",
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
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/ptica/sheya-utinaya/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Шея утиная. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Утка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "lapy-krolika",
    "slug": "lapy-krolika",
    "name": "Лапы кролика",
    "category": "Кролик",
    "protein": "Кролик",
    "purposes": [
      "Длительное жевание",
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
    "price": 135,
    "price100g": 135,
    "pricePerKg": 1350,
    "status": "active",
    "imagePaths": [
      "/products/krolik/lapy-krolika/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Лапы кролика. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Кролик",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "ushi-krolika",
    "slug": "ushi-krolika",
    "name": "Уши кролика",
    "category": "Кролик",
    "protein": "Кролик",
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
    "price": 225,
    "price100g": 225,
    "pricePerKg": 2250,
    "status": "active",
    "imagePaths": [
      "/products/krolik/ushi-krolika/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Уши кролика. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Кролик",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "pyataki-svinye",
    "slug": "pyataki-svinye",
    "name": "Пятаки свиные",
    "category": "Свинина",
    "protein": "Свинина",
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
    "price": 165,
    "price100g": 165,
    "pricePerKg": 1650,
    "status": "active",
    "imagePaths": [
      "/products/svinina/pyataki-svinye/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Пятаки свиные. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Свинина",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "pechene-iz-indeyki",
    "slug": "pechene-iz-indeyki",
    "name": "Печенье из индейки",
    "category": "Печенье",
    "protein": "Индейка",
    "purposes": [
      "Дрессировка",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Лёгкое, хрустящее",
    "hardness": "мягкое",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/pechenye/pechene-iz-indeyki/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Печенье из индейки. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Индейка",
      "Натуральное"
    ],
    "isFeatured": false
  },
  {
    "id": "pechene-iz-krolika",
    "slug": "pechene-iz-krolika",
    "name": "Печенье из кролика",
    "category": "Печенье",
    "protein": "Птица",
    "purposes": [
      "Дрессировка",
      "Поощрение"
    ],
    "dogSizes": [
      "Малые",
      "Средние",
      "Крупные"
    ],
    "texture": "Лёгкое, хрустящее",
    "hardness": "мягкое",
    "format": "",
    "unit": "weight",
    "weight": "100 г",
    "price": 0,
    "price100g": null,
    "pricePerKg": null,
    "status": "no_price",
    "imagePaths": [
      "/products/pechenye/pechene-iz-krolika/01.webp"
    ],
    "shortDescription": "Натуральное сушёное лакомство для собак — дополнение к основному рациону.",
    "composition": "Печенье из кролика. Без искусственных добавок, соли и консервантов.",
    "tags": [
      "Птица",
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
