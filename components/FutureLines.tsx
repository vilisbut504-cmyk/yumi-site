import { PRODUCT_LINES } from '@/lib/lines'
import { ProductMockup } from '@/components/ProductMockup'

export function FutureLines() {
  return (
    <section className="section lines" id="lines">
      <div className="container">
        <div className="section-header center">
          <h2>Будущие линейки ЮМИ</h2>
          <p>
            Концептуальные линейки без цен — финальный ассортимент и фасовки
            будут утверждены перед запуском.
          </p>
        </div>
        <div className="lines__grid">
          {PRODUCT_LINES.map((line) => (
            <article key={line.id} className="lines__card">
              <ProductMockup
                shortName={line.shortName}
                bg={line.cardBg}
                accent="#681B1A"
              />
              <div className="lines__card-body">
                <span className="badge">готовится</span>
                <h3>{line.shortName}</h3>
                <p className="lines__tagline">{line.tagline}</p>
                <p>{line.description}</p>
                <a href="#lead" className="btn btn-ghost">Узнать о запуске</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
