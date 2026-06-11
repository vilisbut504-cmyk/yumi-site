const AUDIENCE = [
  { title: 'Щенкам', text: 'Рационы для периода роста.' },
  { title: 'Взрослым собакам', text: 'Ежедневное сбалансированное питание.' },
  { title: 'Маленьким породам', text: 'С учётом компактного размера.' },
  { title: 'Крупным породам', text: 'Удобство порционирования.' },
  { title: 'Активным собакам', text: 'Для высокой нагрузки и прогулок.' },
  { title: 'С чувствительным пищеварением', text: 'Продуманный подход к составу.' },
]

export function Audience() {
  return (
    <section className="section audience">
      <div className="container">
        <div className="section-header center">
          <h2>Кому подойдёт ЮМИ</h2>
        </div>
        <div className="audience__pills">
          {AUDIENCE.map((item) => (
            <div key={item.title} className="audience__pill">
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
