import { BrandLogo } from '@/components/BrandLogo'

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
          <p className="eyebrow">Запуск</p>
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
          <a href="#contacts" className="btn btn-primary">Вступить в список ожидания</a>
        </div>
        <div className="trust__visual">
          <BrandLogo width={220} height={220} />
        </div>
      </div>
    </section>
  )
}
