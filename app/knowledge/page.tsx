import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { KNOWLEDGE } from '@/lib/knowledge'

export const metadata: Metadata = {
  title: 'База знаний — ЮМИ',
  description:
    'Как давать собаке натуральные сушёные лакомства: дозировка, ввод нового продукта, хранение. Лакомство — дополнение к основному рациону.',
}

export default function KnowledgePage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="container">
            <p className="eyebrow">База знаний</p>
            <h1>Как давать лакомства правильно</h1>
            <p className="page-head__sub">
              Натуральные сушёные лакомства — это дополнение к основному рациону собаки,
              а не его замена. Здесь собрали короткие практичные материалы.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container knowledge-page">
            {KNOWLEDGE.map((article) => (
              <article key={article.id} id={article.id} className="knowledge-article">
                <h2>{article.title}</h2>
                {article.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </article>
            ))}
            <p className="knowledge-disclaimer">
              Информация носит общий характер. Лакомство не является заменой основного
              рациона. Наблюдайте за собакой во время жевания.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
