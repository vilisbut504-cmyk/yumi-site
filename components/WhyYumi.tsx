import { IconCheck, IconCrown, IconHeart, IconPaw } from '@/components/ui/Icons'

const CARDS = [
  {
    icon: IconCheck,
    title: 'Понятный состав',
    text: 'Один ингредиент, без соли, сахара и лишних добавок — вы знаете, что получает питомец.',
  },
  {
    icon: IconCrown,
    title: 'Премиальная сушка',
    text: 'Бережная обработка сохраняет вкус и текстуру — для поощрения и долгого жевания.',
  },
  {
    icon: IconPaw,
    title: 'Удобный заказ',
    text: 'Каталог, корзина и оформление на сайте. Оплата при получении, доставка по СПб.',
  },
  {
    icon: IconHeart,
    title: 'Скидка первым клиентам',
    text: 'До 19% в корзине на этапе запуска — чем больше заказ, тем выгоднее.',
  },
]

export function WhyYumi() {
  return (
    <section className="section why" id="about">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">О бренде</p>
          <h2>Почему ЮМИ</h2>
        </div>
        <div className="why__grid">
          {CARDS.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.title} className="why__card">
                <div className="why__icon"><Icon /></div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
