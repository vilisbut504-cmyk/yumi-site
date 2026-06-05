const POINTS = [
  'Понятный состав без лишнего маркетингового шума.',
  'Рецептуры под возраст, размер и активность собаки.',
  'Удобные фасовки для регулярного питания.',
  'Прозрачная информация о составе после утверждения линейки.',
  'Рекомендации по переходу на новый корм.',
]

export function Quality() {
  return (
    <section className="section quality" id="quality">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Рецептуры</p>
          <h2>Что будет важно в рецептурах ЮМИ</h2>
        </div>
        <div className="quality__list">
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
