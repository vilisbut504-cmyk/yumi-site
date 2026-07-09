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
            Доставим лакомства по Санкт-Петербургу курьером внутри КАД и за КАД.
            Самовывоз — по согласованию. Оплата при получении, без онлайн-оплаты на сайте.
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
