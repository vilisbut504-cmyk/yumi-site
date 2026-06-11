import { IconBuilding, IconCheck, IconCrown, IconSliders } from '@/components/ui/Icons'

const CARDS = [
  {
    icon: IconSliders,
    title: 'Понятный подбор',
    text: 'Рацион подбирается по ключевым параметрам вашей собаки. Никакой сложности и догадок.',
  },
  {
    icon: IconCrown,
    title: 'Премиальный подход',
    text: 'Качественные ингредиенты, продуманные рецептуры и забота о ежедневном питании.',
  },
  {
    icon: IconCheck,
    title: 'Без хаоса в выборе',
    text: 'Только необходимые линейки и понятные решения для разных потребностей.',
  },
  {
    icon: IconBuilding,
    title: 'Для города',
    text: 'Создано в Санкт-Петербурге с учётом темпа жизни и потребностей городских собак.',
  },
]

export function WhyYumi() {
  return (
    <section className="section why" id="about">
      <div className="container">
        <div className="section-header center">
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
