import { PRODUCT_LINES } from '@/lib/lines'
import { ProductMockup } from '@/components/ProductMockup'

export function FutureLines() {
  return (
    <section className="section lines" id="lines">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Ассортимент</p>
          <h2>Будущие линейки ЮМИ</h2>
          <p>Шесть концептуальных линеек — без цен, с понятной логикой подбора под вашу собаку.</p>
        </div>
        <div className="lines__grid">
          {PRODUCT_LINES.map((line) => (
            <article key={line.id} className="lines__card">
              <ProductMockup
                shortName={line.shortName}
                shade={line.mockupShade}
                compact
              />
              <div className="lines__card-body">
                <span className="badge">скоро</span>
                <h3>{line.name}</h3>
                <p>{line.description}</p>
                <div className="lines__audience">
                  {line.audience.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <ul className="lines__highlights">
                  {line.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href="#contacts" className="btn btn-ghost">Узнать о запуске</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
