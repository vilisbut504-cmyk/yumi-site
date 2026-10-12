'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useCart } from '@/components/CartProvider'
import { validateName, validatePhone } from '@/lib/quiz'
import { PhoneInput } from '@/components/PhoneInput'
import { PHONE_INITIAL } from '@/lib/phone'
import {
  formatPackLine,
  formatPrice,
  lineTotal,
  type DeliveryMethod,
} from '@/lib/cart'
import { buildOrderPayloadFromCheckout, submitOrder } from '@/lib/orderSubmit'
import {
  DELIVERY_REGIONS,
  calculateOrderTotal,
  formatDeliveryOptionPrice,
  getDefaultMethodForRegion,
  getDeliveryOption,
  getDeliveryOptionsForRegion,
  getDeliveryPrice,
  getDeliverySummaryLabel,
  getRegionForMethod,
  isCourier,
  isOutsideKad,
  type DeliveryRegion,
  DISCOUNT_NOTE,
} from '@/src/lib/pricing'
import { getPickupMapsLink } from '@/src/lib/availability'

interface FormState {
  name: string
  phone: string
  email: string
  city: string
  address: string
  comment: string
  region: DeliveryRegion
  delivery: DeliveryMethod
  website: string
}

const INITIAL: FormState = {
  name: '',
  phone: PHONE_INITIAL,
  email: '',
  city: 'Санкт-Петербург',
  address: '',
  comment: '',
  region: 'spb',
  delivery: 'courier_kad',
  website: '',
}

function defaultCityForRegion(region: DeliveryRegion): string {
  return region === 'moscow' ? 'Москва' : 'Санкт-Петербург'
}

export default function CheckoutPage() {
  const { items, subtotal, mounted, clear } = useCart()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const regionOptions = useMemo(
    () => getDeliveryOptionsForRegion(form.region),
    [form.region],
  )

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (submitError) setSubmitError('')
  }

  const setRegion = (region: DeliveryRegion) => {
    const nextMethod = getDefaultMethodForRegion(region)
    setForm((prev) => ({
      ...prev,
      region,
      delivery: nextMethod,
      city: defaultCityForRegion(region),
      address: '',
    }))
    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }))
    if (submitError) setSubmitError('')
  }

  const setDelivery = (method: DeliveryMethod) => {
    const region = getRegionForMethod(method)
    setForm((prev) => ({
      ...prev,
      region,
      delivery: method,
    }))
    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }))
    if (submitError) setSubmitError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website || submitting) return

    const next: Partial<Record<keyof FormState, string>> = {}
    if (!validateName(form.name)) next.name = 'Введите имя'
    if (!validatePhone(form.phone)) next.phone = 'Введите корректный телефон'
    if (isCourier(form.delivery) && form.address.trim().length < 5) {
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
              <p>После оформления менеджер свяжется с вами для подтверждения заказа.</p>
              <Link href="/catalog" className="btn btn-primary">Вернуться в каталог</Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  const deliveryOpt = getDeliveryOption(form.delivery)
  const totals = calculateOrderTotal({
    subtotal,
    deliveryPrice: getDeliveryPrice(form.delivery),
    deliveryMethod: form.delivery,
  })
  const outside = isOutsideKad(form.delivery)
  const pricePending = Boolean(deliveryOpt && !deliveryOpt.priceConfirmed)

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
                    <legend>Регион</legend>
                    <div className="checkout__options">
                      {DELIVERY_REGIONS.map((region) => (
                        <label
                          key={region.id}
                          className={`checkout__option${form.region === region.id ? ' selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="region"
                            checked={form.region === region.id}
                            onChange={() => setRegion(region.id)}
                          />
                          <span>
                            <strong>{region.label}</strong>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="checkout__block">
                    <legend>Способ получения</legend>
                    <div className="checkout__options">
                      {regionOptions.map((opt) => (
                        <label
                          key={opt.method}
                          className={`checkout__option${form.delivery === opt.method ? ' selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="delivery"
                            checked={form.delivery === opt.method}
                            onChange={() => setDelivery(opt.method)}
                          />
                          <span>
                            <strong>{opt.label}</strong>
                            <small>{formatDeliveryOptionPrice(opt)}</small>
                            {opt.method === 'moscow_pickup_yakovleva' && (
                              <small>деревня Яковлева</small>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                    {form.delivery === 'courier_outside_kad' && (
                      <p className="checkout__hint">
                        Доставка за КАД — 250 ₽ + 25 ₽/км.
                        Точную стоимость подтвердит менеджер после проверки адреса.
                      </p>
                    )}
                    {form.delivery === 'moscow_pickup_yakovleva' && (
                      <p className="checkout__hint">
                        Самовывоз — «Сытый шарик», деревня Яковлева.
                        Стоимость самовывоза уточнит менеджер.
                      </p>
                    )}
                    {isCourier(form.delivery) && (
                      <>
                        <div className="form-group">
                          <label className="form-label" htmlFor="co-city">Город / населённый пункт</label>
                          <input id="co-city" className="form-input" value={form.city} onChange={(e) => update('city', e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="co-address">Адрес</label>
                          <input id="co-address" className="form-input" value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Улица, дом, квартира" />
                          {errors.address && <p className="form-error">{errors.address}</p>}
                        </div>
                      </>
                    )}
                    {form.delivery === 'pickup' && (
                      <p className="checkout__discount-note">
                        Самовывоз:{' '}
                        <a href={getPickupMapsLink()} target="_blank" rel="noopener noreferrer">
                          точка на карте
                        </a>
                      </p>
                    )}
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
                        <span>
                          <strong className="checkout__item-name">{item.name}</strong>
                          <small>{formatPackLine(item.qty, item.weight)}</small>
                        </span>
                        <strong>{formatPrice(lineTotal(item.price, item.qty))}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="checkout__summary-rows">
                    <div className="checkout__summary-row">
                      <span>Стоимость товаров</span>
                      <span>{formatPrice(totals.subtotal)}</span>
                    </div>
                    {totals.discountPercent > 0 && (
                      <>
                        <div className="checkout__summary-row checkout__summary-row--discount">
                          <span>Скидка {totals.discountPercent}%</span>
                          <span>−{formatPrice(totals.discountAmount)}</span>
                        </div>
                        <div className="checkout__summary-row">
                          <span>Итого товаров со скидкой</span>
                          <span>{formatPrice(totals.subtotalAfterDiscount)}</span>
                        </div>
                      </>
                    )}
                    <div className="checkout__summary-row">
                      <span>
                        {getDeliverySummaryLabel(form.delivery)}
                        {form.delivery === 'moscow_pickup_yakovleva' && (
                          <>
                            <br />
                            <small className="checkout__delivery-sub">деревня Яковлева</small>
                          </>
                        )}
                      </span>
                      <span>
                        {pricePending
                          ? 'уточняется'
                          : totals.deliveryPrice === 0
                            ? 'бесплатно'
                            : formatPrice(totals.deliveryPrice)}
                      </span>
                    </div>
                    {outside && (
                      <div className="checkout__summary-row checkout__summary-row--muted">
                        <span>Доплата за километры</span>
                        <span>уточняется</span>
                      </div>
                    )}
                  </div>
                  {totals.discountPercent > 0 && (
                    <p className="checkout__discount-note">{DISCOUNT_NOTE}</p>
                  )}
                  <div className="checkout__total">
                    <span>
                      {outside || pricePending ? 'Предварительная сумма' : 'Итого к оплате'}
                    </span>
                    <strong>{formatPrice(totals.total)}</strong>
                  </div>
                  <button type="submit" className="btn btn-primary btn-wide" disabled={submitting}>
                    {submitting ? 'Отправляем…' : 'Оформить заказ'}
                  </button>
                  <p className="cart__note">
                    После оформления менеджер свяжется с вами для подтверждения заказа.
                  </p>
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
