const POINTS = [
  'Предварительные заявки',
  'Будущая система подбора',
  'Линейки под разные задачи',
  'Фокус на понятной коммуникации',
  'Запуск в Санкт-Петербурге',
]

export function Trust() {
  return (
    <section className="section trust">
      <div className="container trust__inner">
        <div>
          <h2>ЮМИ готовится к запуску в Санкт-Петербурге</h2>
          <p className="trust__text">
            Мы формируем первые линейки сухого корма для собак и собираем ранний
            список владельцев, которые хотят узнать о запуске первыми.
          </p>
          <ul className="trust__list">
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <a href="#lead" className="btn btn-primary">Вступить в список ожидания</a>
        </div>
      </div>
    </section>
  )
}
