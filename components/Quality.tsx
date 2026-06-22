const POINTS = [
  'Натуральное мясо и субпродукты без лишних добавок.',
  'Сушка без соли, сахара, красителей и консервантов.',
  'Понятные категории по типу мяса и назначению.',
  'Удобные форматы для дрессировки и для долгого жевания.',
  'Прозрачная информация о составе и фасовке в каждой карточке.',
  'Лакомство — дополнение к основному рациону, а не его замена.',
]

export function Quality() {
  return (
    <section className="section quality" id="quality">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Качество</p>
          <h2>Что важно в продуктах ЮМИ</h2>
        </div>
        <div className="quality__grid">
          {POINTS.map((point, i) => (
            <div key={point} className="quality__item">
              <span className="quality__num">{String(i + 1).padStart(2, '0')}</span>
              <p>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
