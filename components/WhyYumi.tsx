const CARDS = [
  {
    icon: '01',
    title: 'Понятный подбор',
    text: 'Корм выбирается не случайно, а по параметрам собаки.',
  },
  {
    icon: '02',
    title: 'Премиальный подход',
    text: 'Акцент на состав, ежедневное питание и удобство владельца.',
  },
  {
    icon: '03',
    title: 'Без хаоса в выборе',
    text: 'Логичные линейки вместо десятков непонятных позиций.',
  },
  {
    icon: '04',
    title: 'Для города',
    text: 'Сервис и доставка под владельцев собак в Санкт-Петербурге.',
  },
]

export function WhyYumi() {
  return (
    <section className="section why" id="about">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Философия бренда</p>
          <h2>Почему ЮМИ</h2>
        </div>
        <div className="card-grid why__grid">
          {CARDS.map((card) => (
            <div key={card.title} className="card why__card">
              <div className="why__icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
