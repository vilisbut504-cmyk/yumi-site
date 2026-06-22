const TAGS = [
  'Санкт-Петербург',
  'Курьерская доставка',
  'Самовывоз по согласованию',
  'Оплата при получении',
]

export function Delivery() {
  return (
    <section className="section delivery" id="delivery">
      <div className="container delivery__inner">
        <div>
          <p className="eyebrow">Доставка</p>
          <h2>Доставка по Санкт-Петербургу</h2>
          <p className="delivery__text">
            Привозим натуральные лакомства по Санкт-Петербургу курьером. Возможен
            самовывоз по согласованию. Оплата производится при получении —
            онлайн-оплата не требуется.
          </p>
          <div className="delivery__tags">
            {TAGS.map((tag) => (
              <span key={tag} className="delivery__tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="delivery__map">
          <span>Санкт-Петербург</span>
          <small>доставка и самовывоз</small>
        </div>
      </div>
    </section>
  )
}
