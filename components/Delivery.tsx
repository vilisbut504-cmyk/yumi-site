const TAGS = [
  'Санкт-Петербург',
  'Курьерская доставка в разработке',
  'Пробные фасовки обсуждаются',
  'Уведомление о запуске для ранних заявок',
]

export function Delivery() {
  return (
    <section className="section delivery" id="delivery">
      <div className="container delivery__inner">
        <div>
          <h2>Доставка по Санкт-Петербургу</h2>
          <p className="delivery__text">
            Условия доставки будут опубликованы после утверждения ассортимента и
            фасовок. На первом этапе ЮМИ планирует запуск в Санкт-Петербурге.
          </p>
          <div className="delivery__tags">
            {TAGS.map((tag) => (
              <span key={tag} className="delivery__tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="delivery__map">
          <span>Санкт-Петербург</span>
          <small>запуск в разработке</small>
        </div>
      </div>
    </section>
  )
}
