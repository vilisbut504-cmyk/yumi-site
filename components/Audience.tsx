const AUDIENCE = [
  {
    title: 'Щенкам',
    text: 'Рационы для периода роста с учётом энергии и размера породы.',
  },
  {
    title: 'Взрослым собакам',
    text: 'Сбалансированное ежедневное питание для зрелых собак.',
  },
  {
    title: 'Маленьким породам',
    text: 'Формулы с учётом компактного размера и особенностей метаболизма.',
  },
  {
    title: 'Крупным породам',
    text: 'Поддержка крупных собак с акцентом на удобство порционирования.',
  },
  {
    title: 'Активным собакам',
    text: 'Для собак с высокой нагрузкой, прогулками и тренировками.',
  },
  {
    title: 'Собакам с чувствительным пищеварением',
    text: 'Линейка с продуманным составом для особых потребностей.',
  },
]

export function Audience() {
  return (
    <section className="section audience">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Для кого</p>
          <h2>Кому подойдёт ЮМИ</h2>
        </div>
        <div className="card-grid audience__grid">
          {AUDIENCE.map((item) => (
            <div key={item.title} className="audience__card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
