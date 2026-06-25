'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useCart } from '@/components/CartProvider'
import { validateName, validatePhone } from '@/lib/quiz'
import { PhoneInput } from '@/components/PhoneInput'
import { PHONE_INITIAL } from '@/lib/phone'
import { formatPrice, packLabel, type DeliveryMethod, type PaymentMethod } from '@/lib/cart'
import { buildOrderPayloadFromCheckout, submitOrder } from '@/lib/orderSubmit'

interface FormState {
  name: string
  phone: string
  email: string
  city: string
  address: string
  comment: string
  delivery: DeliveryMethod
  payment: PaymentMethod
  website: string
}

const INITIAL: FormState = {
  name: '',
  phone: PHONE_INITIAL,
  email: '',
  city: 'Санкт-Петербург',
  address: '',
  comment: '',
  delivery: 'courier_spb',
  payment: 'cash_on_delivery',
  website: '',
}

export default function CheckoutPage() {
  const { items, subtotal, mounted, clear } = useCart()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (submitError) setSubmitError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website || submitting) return

    const next: Partial<Record<keyof FormState, string>> = {}
    if (!validateName(form.name)) next.name = 'Введите имя'
    if (!validatePhone(form.phone)) next.phone = 'Введите корректный телефон'
    if (form.delivery === 'courier_spb' && form.address.trim().length < 5) {
      next.address = 'Укажите адрес доставки'
    }
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const payload = buildOrderPayloadFromCheckout(
      items,
      {
        name: form.name,
        phone: form.phone,
        email: form.email,
        comment: form.comment,
        city: form.city,
        address: form.address,
      },
      form.delivery,
      form.payment,
    )

    setSubmitting(true)
    setSubmitError('')
    try {
      await submitOrder(payload)
      clear()
      setDone(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Не удалось отправить заказ')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <>
        <Header />
        <main>
          <section className="section">
            <div className="container checkout-done">
              <h1>Заявка отправлена</h1>
              <p>
                Заявка отправлена. Менеджер свяжется с вами для подтверждения состава
                заказа, доставки и способа оплаты.
              </p>
              <Link href="/catalog" className="btn btn-primary">Вернуться в каталог</Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="container">
            <p className="eyebrow">Оформление</p>
            <h1>Оформление заказа</h1>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {!mounted ? (
              <p className="cart__loading">Загружаем…</p>
            ) : items.length === 0 ? (
              <div className="cart__empty">
                <p>Корзина пуста — оформить заказ нельзя.</p>
                <Link href="/catalog" className="btn btn-primary">Перейти в каталог</Link>
              </div>
            ) : (
              <form className="checkout" onSubmit={handleSubmit}>
                <div className="checkout__main">
                  <input
                    type="text" name="website" value={form.website} tabIndex={-1}
                    autoComplete="off" aria-hidden className="hp-field"
                    onChange={(e) => update('website', e.target.value)}
                  />

                  <fieldset className="checkout__block">
                    <legend>Контакты</legend>
                    <div className="lead__grid">
                      <div className="form-group">
                        <label className="form-label" htmlFor="co-name">Имя</label>
                        <input id="co-name" className="form-input" value={form.name} onChange={(e) => update('name', e.target.value)} />
                        {errors.name && <p className="form-error">{errors.name}</p>}
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="co-phone">Телефон</label>
                        <PhoneInput id="co-phone" value={form.phone} onChange={(v) => update('phone', v)} />
                        {errors.phone && <p className="form-error">{errors.phone}</p>}
                      </div>
                      <div className="form-group full">
                        <label className="form-label" htmlFor="co-email">E-mail (необязательно)</label>
                        <input id="co-email" className="form-input" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="checkout__block">
                    <legend>Доставка</legend>
                    <div className="checkout__options">
                      <label className={`checkout__option${form.delivery === 'courier_spb' ? ' selected' : ''}`}>
                        <input type="radio" name="delivery" checked={form.delivery === 'courier_spb'} onChange={() => update('delivery', 'courier_spb')} />
                        <span><strong>Курьер по Санкт-Петербургу</strong><small>Адресная доставка</small></span>
                      </label>
                      <label className={`checkout__option${form.delivery === 'pickup' ? ' selected' : ''}`}>
                        <input type="radio" name="delivery" checked={form.delivery === 'pickup'} onChange={() => update('delivery', 'pickup')} />
                        <span><strong>Самовывоз</strong><small>По согласованию</small></span>
                      </label>
                    </div>
                    {form.delivery === 'courier_spb' && (
                      <>
                        <div className="form-group">
                          <label className="form-label" htmlFor="co-city">Город</label>
                          <input id="co-city" className="form-input" value={form.city} onChange={(e) => update('city', e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="co-address">Адрес</label>
                          <input id="co-address" className="form-input" value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Улица, дом, квартира" />
                          {errors.address && <p className="form-error">{errors.address}</p>}
                        </div>
                      </>
                    )}
                  </fieldset>

                  <fieldset className="checkout__block">
                    <legend>Оплата</legend>
                    <div className="checkout__options">
                      <label className={`checkout__option${form.payment === 'cash_on_delivery' ? ' selected' : ''}`}>
                        <input type="radio" name="payment" checked={form.payment === 'cash_on_delivery'} onChange={() => update('payment', 'cash_on_delivery')} />
                        <span><strong>Наличными при получении</strong></span>
                      </label>
                      <label className={`checkout__option${form.payment === 'bank_transfer_on_delivery' ? ' selected' : ''}`}>
                        <input type="radio" name="payment" checked={form.payment === 'bank_transfer_on_delivery'} onChange={() => update('payment', 'bank_transfer_on_delivery')} />
                        <span><strong>Переводом на карту при получении</strong></span>
                      </label>
                    </div>
                    <p className="checkout__hint">
                      Онлайн-оплаты на сайте пока нет. После оформления заказа менеджер
                      свяжется с вами для подтверждения состава заказа, доставки и способа
                      оплаты.
                    </p>
                  </fieldset>

                  <div className="form-group">
                    <label className="form-label" htmlFor="co-comment">Комментарий к заказу</label>
                    <textarea id="co-comment" className="form-textarea" value={form.comment} onChange={(e) => update('comment', e.target.value)} />
                  </div>

                  {submitError && <p className="form-error">{submitError}</p>}
                </div>

                <aside className="checkout__summary">
                  <h2>Ваш заказ</h2>
                  <ul className="checkout__items">
                    {items.map((item) => (
                      <li key={item.id}>
                        <span>{item.name} · {packLabel(item)}</span>
                        <strong>{formatPrice(item.price * item.qty)}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="checkout__total">
                    <span>Итого</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <button type="submit" className="btn btn-primary btn-wide" disabled={submitting}>
                    {submitting ? 'Отправляем…' : 'Оформить заказ'}
                  </button>
                  <p className="cart__note">Нажимая кнопку, вы оставляете заявку. Менеджер свяжется для подтверждения.</p>
                </aside>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
