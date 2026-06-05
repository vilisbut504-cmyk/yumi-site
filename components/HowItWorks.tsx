const STEPS = [
  {
    title: 'Пройдите короткий подбор',
    text: 'Ответьте на несколько вопросов о вашей собаке.',
  },
  {
    title: 'Получите предварительную рекомендацию',
    text: 'Система предложит подходящую линейку ЮМИ.',
  },
  {
    title: 'Оставьте заявку на запуск',
    text: 'Мы сообщим, когда линейка будет готова.',
  },
  {
    title: 'Получите инструкцию по переходу',
    text: 'Рекомендации по плавному переходу на новый рацион.',
  },
  {
    title: 'Подберите фасовку',
    text: 'Выберите удобный формат после утверждения линейки.',
  },
]

export function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Процесс</p>
          <h2>Как начать с ЮМИ</h2>
        </div>
        <div className="how__steps">
          {STEPS.map((step, i) => (
            <div key={step.title} className="how__step">
              <div className="how__step-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
