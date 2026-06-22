import Link from 'next/link'
import { PRODUCT_CATEGORIES } from '@/src/data/products'
import { getProductsByCategory } from '@/src/lib/products'

const CATEGORY_NOTE: Record<string, string> = {
  Говядина: 'Рубец, лёгкое, печень, жилки и уши',
  Баранина: 'Лёгкое и рубец — мягкие и для жевания',
  Птица: 'Индейка кусочками для дрессировки',
  Кролик: 'Уши и лапы с натуральным ворсом',
  Свинина: 'Уши и пятаки для длительного жевания',
  Печенье: 'Хрустящие мясные снеки для поощрения',
}

export function CategoryGrid() {
  return (
    <section className="section lines" id="categories">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Категории</p>
          <h2>Выберите по типу мяса</h2>
          <p>Натуральные сушёные мясные продукты и жевательные лакомства для собак.</p>
        </div>
        <div className="category-grid">
          {PRODUCT_CATEGORIES.map((cat) => {
            const count = getProductsByCategory(cat).length
            return (
              <Link
                key={cat}
                href={`/catalog?category=${encodeURIComponent(cat)}`}
                className="category-card"
              >
                <div className="category-card__body">
                  <h3>{cat}</h3>
                  <p>{CATEGORY_NOTE[cat] ?? 'Натуральные сушёные лакомства'}</p>
                </div>
                <span className="category-card__count">{count} поз.</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
