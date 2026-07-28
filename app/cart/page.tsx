'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductImage } from '@/components/ProductImage'
import { QtyInput } from '@/components/QtyInput'
import { useCart } from '@/components/CartProvider'
import {
  formatPackLine,
  formatPrice,
  formatTotalWeight,
  formatUnitPrice,
  lineTotal,
} from '@/lib/cart'
import { calculateStarterDiscount, DISCOUNT_NOTE } from '@/src/lib/pricing'

export default function CartPage() {
  const { items, subtotal, mounted, setQty, removeItem } = useCart()

  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="container">
            <p className="eyebrow">Корзина</p>
            <h1>Ваш заказ</h1>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {!mounted ? (
              <p className="cart__loading">Загружаем корзину…</p>
            ) : items.length === 0 ? (
              <div className="cart__empty">
                <p>Корзина пока пуста.</p>
                <Link href="/catalog" className="btn btn-primary">Перейти в каталог</Link>
              </div>
            ) : (
              <div className="cart">
                <div className="cart__list">
                  {items.map((item) => {
                    const total = lineTotal(item.price, item.qty)
                    return (
                      <div key={item.id} className="cart__row">
                        <Link href={`/catalog/${item.slug}`} className="cart__media">
                          <ProductImage imagePaths={item.image ? [item.image] : []} alt={item.name} />
                        </Link>
                        <div className="cart__info">
                          <Link href={`/catalog/${item.slug}`} className="cart__name">{item.name}</Link>
                          <p className="cart__weight">{formatPackLine(item.qty, item.weight)}</p>
                          <p className="cart__pack-meta">
                            Упаковок по 100 г · {item.qty} × 100 г = {formatTotalWeight(item.qty)}
                          </p>
                          <p className="cart__unit-price">{formatUnitPrice(item.price, item.weight)}</p>
                          <button type="button" className="cart__remove" onClick={() => removeItem(item.id)}>
                            Удалить
                          </button>
                        </div>
                        <div className="cart__qty-block">
                          <QtyInput value={item.qty} onChange={(q) => setQty(item.id, q)} />
                          <p className="cart__line-total">Итого позиции: {formatPrice(total)}</p>
                        </div>
                        <div className="cart__sum">{formatPrice(total)}</div>
                      </div>
                    )
                  })}
                </div>

                <aside className="cart__summary">
                  <h2>Итого</h2>
                  {(() => {
                    const d = calculateStarterDiscount(subtotal)
                    return (
                      <>
                        <div className="cart__summary-row">
                          <span>Стоимость товаров</span>
                          <strong>{formatPrice(d.subtotalAfterDiscount + d.discountAmount)}</strong>
                        </div>
                        {d.percent > 0 && (
                          <>
                            <div className="cart__summary-row cart__summary-row--discount">
                              <span>Скидка {d.percent}%</span>
                              <span>−{formatPrice(d.discountAmount)}</span>
                            </div>
                            <div className="cart__summary-row">
                              <span>Итого товаров со скидкой</span>
                              <strong>{formatPrice(d.subtotalAfterDiscount)}</strong>
                            </div>
                          </>
                        )}
                        <div className="cart__summary-row cart__summary-row--muted">
                          <span>Доставка</span>
                          <span>рассчитывается при оформлении</span>
                        </div>
                        {d.percent > 0 && (
                          <p className="cart__note">{DISCOUNT_NOTE}</p>
                        )}
                      </>
                    )
                  })()}
                  <Link href="/checkout" className="btn btn-primary btn-wide">Оформить заказ</Link>
                  <Link href="/catalog" className="btn btn-ghost btn-wide">Продолжить покупки</Link>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
