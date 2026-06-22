'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductImage } from '@/components/ProductImage'
import { useCart } from '@/components/CartProvider'
import { formatPrice } from '@/lib/cart'

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
                  {items.map((item) => (
                    <div key={item.id} className="cart__row">
                      <Link href={`/catalog/${item.slug}`} className="cart__media">
                        <ProductImage imagePaths={item.image ? [item.image] : []} alt={item.name} />
                      </Link>
                      <div className="cart__info">
                        <Link href={`/catalog/${item.slug}`} className="cart__name">{item.name}</Link>
                        <p className="cart__weight">{item.weight}</p>
                        <button type="button" className="cart__remove" onClick={() => removeItem(item.id)}>
                          Удалить
                        </button>
                      </div>
                      <div className="qty">
                        <button type="button" className="qty__btn" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Меньше">−</button>
                        <span className="qty__val">{item.qty}</span>
                        <button type="button" className="qty__btn" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Больше">+</button>
                      </div>
                      <div className="cart__sum">{formatPrice(item.price * item.qty)}</div>
                    </div>
                  ))}
                </div>

                <aside className="cart__summary">
                  <h2>Итого</h2>
                  <div className="cart__summary-row">
                    <span>Товары</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <div className="cart__summary-row cart__summary-row--muted">
                    <span>Доставка</span>
                    <span>рассчитывается при оформлении</span>
                  </div>
                  <Link href="/checkout" className="btn btn-primary btn-wide">Оформить заказ</Link>
                  <Link href="/catalog" className="btn btn-ghost btn-wide">Продолжить покупки</Link>
                  <p className="cart__note">Онлайн-оплата не подключена. Оплата при получении.</p>
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
