'use client'

import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/src/lib/products'

type SortKey = 'popular' | 'price-asc' | 'price-desc'

type Group = 'category' | 'protein' | 'purposes' | 'dogSizes' | 'hardness' | 'format'

type Selected = Record<Group, string[]>

const EMPTY_SELECTED: Selected = {
  category: [],
  protein: [],
  purposes: [],
  dogSizes: [],
  hardness: [],
  format: [],
}

function norm(value: string): string {
  return value
    .normalize('NFC')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[×х]/g, 'x')
    .replace(/\s+/g, ' ')
    .trim()
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, 'ru'),
  )
}

export function CatalogClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Selected>(EMPTY_SELECTED)
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [sort, setSort] = useState<SortKey>('popular')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    const pur = params.get('purpose')
    setSelected((prev) => ({
      ...prev,
      category: cat ? [cat] : prev.category,
      purposes: pur ? [pur] : prev.purposes,
    }))
  }, [])

  const options = useMemo(
    () => ({
      category: uniqueSorted(products.map((p) => p.category)),
      protein: uniqueSorted(products.map((p) => p.protein)),
      purposes: uniqueSorted(products.flatMap((p) => p.purposes)),
      dogSizes: uniqueSorted(products.flatMap((p) => p.dogSizes)),
      hardness: uniqueSorted(products.map((p) => p.hardness)),
      format: uniqueSorted(products.map((p) => p.format)),
    }),
    [products],
  )

  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price).filter((n) => n > 0)
    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    }
  }, [products])

  const toggle = (group: Group, value: string) => {
    setSelected((prev) => {
      const set = prev[group]
      return {
        ...prev,
        [group]: set.includes(value)
          ? set.filter((v) => v !== value)
          : [...set, value],
      }
    })
  }

  const filtered = useMemo(() => {
    const tokens = norm(search).split(' ').filter(Boolean)
    const min = priceMin ? Number(priceMin) : null
    const max = priceMax ? Number(priceMax) : null

    const result = products.filter((p) => {
      // поиск: все токены должны встретиться (название, slug, белок, формат, назначение)
      if (tokens.length) {
        const haystack = norm(
          [p.name, p.slug, p.protein, p.format, p.category, ...p.purposes, ...p.tags].join(
            ' ',
          ),
        )
        if (!tokens.every((t) => haystack.includes(t))) return false
      }
      // OR внутри группы, AND между группами
      if (selected.category.length && !selected.category.includes(p.category)) return false
      if (selected.protein.length && !selected.protein.includes(p.protein)) return false
      if (selected.hardness.length && !selected.hardness.includes(p.hardness)) return false
      if (selected.format.length && !selected.format.includes(p.format)) return false
      if (
        selected.purposes.length &&
        !selected.purposes.some((v) => p.purposes.includes(v))
      )
        return false
      if (
        selected.dogSizes.length &&
        !selected.dogSizes.some((v) => p.dogSizes.includes(v))
      )
        return false
      if (min !== null && p.price < min) return false
      if (max !== null && p.price > max) return false
      return true
    })

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))

    return result
  }, [products, search, selected, priceMin, priceMax, sort])

  const activeCount =
    (Object.keys(selected) as Group[]).reduce((n, g) => n + selected[g].length, 0) +
    (search ? 1 : 0) +
    (priceMin ? 1 : 0) +
    (priceMax ? 1 : 0)

  const reset = () => {
    setSearch('')
    setSelected(EMPTY_SELECTED)
    setPriceMin('')
    setPriceMax('')
    setSort('popular')
  }

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

        <div className="catalog__filter">
          <span className="form-label">Поиск</span>
          <input
            className="form-input"
            type="search"
            placeholder="Название, белок, формат…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ChipGroup label="Категория" group="category" options={options.category} selected={selected.category} onToggle={toggle} />
        <ChipGroup label="Белок" group="protein" options={options.protein} selected={selected.protein} onToggle={toggle} />
        <ChipGroup label="Назначение" group="purposes" options={options.purposes} selected={selected.purposes} onToggle={toggle} />
        <ChipGroup label="Размер собаки" group="dogSizes" options={options.dogSizes} selected={selected.dogSizes} onToggle={toggle} />
        <ChipGroup label="Жёсткость" group="hardness" options={options.hardness} selected={selected.hardness} onToggle={toggle} />
        <ChipGroup label="Формат" group="format" options={options.format} selected={selected.format} onToggle={toggle} />

        <div className="catalog__filter">
          <span className="form-label">
            Цена, ₽ {priceBounds.max ? `(${priceBounds.min}–${priceBounds.max})` : ''}
          </span>
          <div className="catalog__price">
            <input
              className="form-input"
              type="number"
              inputMode="numeric"
              placeholder="от"
              min={0}
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />
            <span>—</span>
            <input
              className="form-input"
              type="number"
              inputMode="numeric"
              placeholder="до"
              min={0}
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>
        </div>
      </aside>

      <div className="catalog__main">
        <div className="catalog__bar">
          <p className="catalog__count">
            Показано {filtered.length} из {products.length} товаров
          </p>
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
            <p className="catalog__empty-title">Ничего не найдено</p>
            <p>Попробуйте изменить запрос или сбросить фильтры.</p>
            <button type="button" className="btn btn-secondary" onClick={reset}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ChipGroup({
  label,
  group,
  options,
  selected,
  onToggle,
}: {
  label: string
  group: Group
  options: string[]
  selected: string[]
  onToggle: (group: Group, value: string) => void
}) {
  if (options.length === 0) return null
  return (
    <div className="catalog__filter">
      <span className="form-label">{label}</span>
      <div className="catalog__chips">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`catalog__chip${selected.includes(opt) ? ' is-active' : ''}`}
            aria-pressed={selected.includes(opt)}
            onClick={() => onToggle(group, opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
