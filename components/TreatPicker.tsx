'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { IconPaw } from '@/components/ui/Icons'
import { getActiveProducts } from '@/src/lib/products'

const PROTEINS = ['Говядина', 'Баранина', 'Индейка', 'Кролик', 'Свинина']
const SIZES = ['Малые', 'Средние', 'Крупные']
const PURPOSES = ['Дрессировка', 'Поощрение', 'Длительное жевание', 'Для занятости']

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string | null
  onChange: (v: string) => void
}) {
  return (
    <div className="quiz__group">
      <p className="quiz__label">{label}</p>
      <div className="quiz__chips">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`quiz__chip${value === opt ? ' selected' : ''}`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export function TreatPicker() {
  const products = getActiveProducts()
  const [protein, setProtein] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [purpose, setPurpose] = useState<string | null>(null)
  const [show, setShow] = useState(false)

  const matches = useMemo(() => {
    const scored = products
      .map((p) => {
        let score = 0
        if (protein && p.protein === protein) score += 2
        if (size && p.dogSizes.includes(size)) score += 1
        if (purpose && p.purposes.includes(purpose)) score += 2
        return { p, score }
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
    return scored.slice(0, 3).map((x) => x.p)
  }, [products, protein, size, purpose])

  const canShow = protein || size || purpose

  return (
    <section className="section quiz-section" id="picker">
      <div className="container">
        <div className="quiz-shell">
          <div className="quiz-shell__intro">
            <h2>Подбор лакомства за минуту</h2>
            <p>
              Выберите белок, размер собаки и для чего нужно лакомство — покажем
              подходящие натуральные сушёные продукты ЮМИ.
            </p>
            <p className="quiz-shell__micro">
              Лакомство — дополнение к основному рациону, а не его замена.
            </p>
          </div>

          <div className="quiz-shell__form">
            <Chips label="Белок" options={PROTEINS} value={protein} onChange={setProtein} />
            <Chips label="Размер собаки" options={SIZES} value={size} onChange={setSize} />
            <Chips label="Для чего" options={PURPOSES} value={purpose} onChange={setPurpose} />

            <button
              type="button"
              className="btn btn-primary btn-wide"
              disabled={!canShow}
              onClick={() => setShow(true)}
            >
              Показать лакомства
              <IconPaw />
            </button>

            {show && (
              <div className="picker__result">
                {matches.length > 0 ? (
                  <>
                    <div className="product-grid product-grid--mini">
                      {matches.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    <Link href="/catalog" className="btn btn-secondary btn-wide">
                      Смотреть весь каталог
                    </Link>
                  </>
                ) : (
                  <p className="picker__empty">
                    Не нашли точного совпадения. Загляните в{' '}
                    <Link href="/catalog" className="lines__link">полный каталог</Link>.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
