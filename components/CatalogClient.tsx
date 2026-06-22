'use client'

import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/src/lib/products'

type SortKey = 'popular' | 'price-asc' | 'price-desc'

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'ru'))
}

export function CatalogClient({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<string>('all')
  const [protein, setProtein] = useState<string>('all')
  const [dogSize, setDogSize] = useState<string>('all')
  const [purpose, setPurpose] = useState<string>('all')
  const [hardness, setHardness] = useState<string>('all')
  const [sort, setSort] = useState<SortKey>('popular')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    const pur = params.get('purpose')
    if (cat) setCategory(cat)
    if (pur) setPurpose(pur)
  }, [])

  const categories = useMemo(() => uniqueSorted(products.map((p) => p.category)), [products])
  const proteins = useMemo(() => uniqueSorted(products.map((p) => p.protein)), [products])
  const sizes = useMemo(() => uniqueSorted(products.flatMap((p) => p.dogSizes)), [products])
  const purposes = useMemo(() => uniqueSorted(products.flatMap((p) => p.purposes)), [products])
  const hardnesses = useMemo(() => uniqueSorted(products.map((p) => p.hardness)), [products])

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (protein !== 'all' && p.protein !== protein) return false
      if (dogSize !== 'all' && !p.dogSizes.includes(dogSize)) return false
      if (purpose !== 'all' && !p.purposes.includes(purpose)) return false
      if (hardness !== 'all' && p.hardness !== hardness) return false
      return true
    })
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'popular') {
      result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
    }
    return result
  }, [products, category, protein, dogSize, purpose, hardness, sort])

  const reset = () => {
    setCategory('all')
    setProtein('all')
    setDogSize('all')
    setPurpose('all')
    setHardness('all')
    setSort('popular')
  }

  const activeCount =
    [category, protein, dogSize, purpose, hardness].filter((v) => v !== 'all').length

  return (
    <div className="catalog">
      <aside className="catalog__filters">
        <div className="catalog__filters-head">
          <h2 className="catalog__filters-title">Фильтры</h2>
          {activeCount > 0 && (
            <button type="button" className="catalog__reset" onClick={reset}>
              Сбросить
            </button>
          )}
        </div>

        <FilterSelect label="Категория" value={category} onChange={setCategory} options={categories} />
        <FilterSelect label="Белок" value={protein} onChange={setProtein} options={proteins} />
        <FilterSelect label="Размер собаки" value={dogSize} onChange={setDogSize} options={sizes} />
        <FilterSelect label="Назначение" value={purpose} onChange={setPurpose} options={purposes} />
        <FilterSelect label="Твёрдость" value={hardness} onChange={setHardness} options={hardnesses} />
      </aside>

      <div className="catalog__main">
        <div className="catalog__bar">
          <p className="catalog__count">Найдено: {filtered.length}</p>
          <label className="catalog__sort">
            <span>Сортировка</span>
            <select
              className="form-input"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="popular">Сначала популярные</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
            </select>
          </label>
        </div>

        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="catalog__empty">
            <p>По выбранным фильтрам ничего не найдено.</p>
            <button type="button" className="btn btn-secondary" onClick={reset}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <div className="catalog__filter">
      <span className="form-label">{label}</span>
      <select className="form-input" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="all">Все</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
