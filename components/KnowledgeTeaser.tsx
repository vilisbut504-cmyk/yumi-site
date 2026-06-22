import Link from 'next/link'
import { KNOWLEDGE } from '@/lib/knowledge'

export function KnowledgeTeaser() {
  const items = KNOWLEDGE.slice(0, 3)
  return (
    <section className="section" id="knowledge">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">База знаний</p>
          <h2>Как давать лакомства правильно</h2>
          <p>Короткие материалы о том, как использовать сушёные лакомства как дополнение к рациону.</p>
        </div>
        <div className="knowledge-grid">
          {items.map((article) => (
            <article key={article.id} className="knowledge-card">
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <Link href={`/knowledge#${article.id}`} className="lines__link">
                Читать →
              </Link>
            </article>
          ))}
        </div>
        <div className="section-cta">
          <Link href="/knowledge" className="btn btn-secondary">Вся база знаний</Link>
        </div>
      </div>
    </section>
  )
}
