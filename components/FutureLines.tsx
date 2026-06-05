const LINES = [
  { name: 'ЮМИ Puppy', desc: 'Для щенков в период роста.', variant: 1 },
  { name: 'ЮМИ Adult', desc: 'Для ежедневного питания взрослых собак.', variant: 2 },
  { name: 'ЮМИ Sensitive', desc: 'Для собак с чувствительным пищеварением.', variant: 3 },
  { name: 'ЮМИ Small Breed', desc: 'Для маленьких пород.', variant: 4 },
  { name: 'ЮМИ Large Breed', desc: 'Для крупных собак.', variant: 5 },
  { name: 'ЮМИ Active', desc: 'Для активных собак.', variant: 6 },
]

const GRADIENTS = [
  'linear-gradient(165deg, #ebe0cc 0%, #d4c4a8 100%)',
  'linear-gradient(165deg, #e0d6c4 0%, #c8b89a 100%)',
  'linear-gradient(165deg, #d8e0d4 0%, #b8c4b0 100%)',
  'linear-gradient(165deg, #e8dcc8 0%, #d0c0a8 100%)',
  'linear-gradient(165deg, #d4ccc0 0%, #b8a898 100%)',
  'linear-gradient(165deg, #dce4d0 0%, #b8c8a8 100%)',
]

export function FutureLines() {
  return (
    <section className="section lines" id="lines">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Ассортимент</p>
          <h2>Будущие линейки ЮМИ</h2>
          <p>Концептуальные линейки без цен — мы готовим запуск и собираем обратную связь.</p>
        </div>
        <div className="lines__grid">
          {LINES.map((line, i) => (
            <article key={line.name} className="lines__card">
              <div
                className="pkg-mockup"
                style={{ background: GRADIENTS[i], aspectRatio: '4 / 3' }}
              >
                <span className="pkg-mockup__brand" style={{ fontSize: 'clamp(20px, 3vw, 28px)', letterSpacing: '0.2em' }}>
                  {line.name.replace('ЮМИ ', '')}
                </span>
                <span className="pkg-mockup__sub">yumi</span>
                <span className="pkg-mockup__grain" style={{ top: '20%', left: '15%' }} />
                <span className="pkg-mockup__grain" style={{ bottom: '25%', right: '20%' }} />
              </div>
              <div className="lines__card-body">
                <span className="badge">скоро</span>
                <h3>{line.name}</h3>
                <p>{line.desc}</p>
                <a href="#contacts" className="btn btn-ghost">Узнать о запуске</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
