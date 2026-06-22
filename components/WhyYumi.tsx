import { IconCheck, IconCrown, IconHeart, IconPaw } from '@/components/ui/Icons'

const CARDS = [
  {
    icon: IconCheck,
    title: 'Натуральный состав',
    text: 'Только мясо и субпродукты, высушенные без соли, сахара и консервантов.',
  },
  {
    icon: IconCrown,
    title: 'Премиальный подход',
    text: 'Тщательный отбор сырья и бережная сушка, сохраняющая вкус и текстуру.',
  },
  {
    icon: IconPaw,
    title: 'Для разных задач',
    text: 'Лакомства для дрессировки, поощрения и продукты для долгого жевания.',
  },
  {
    icon: IconHeart,
    title: 'Дополнение к рациону',
    text: 'Не является заменой основного рациона — даётся дополнительно и дозированно.',
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
