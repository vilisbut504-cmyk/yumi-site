'use client'

import { useState } from 'react'
import { validateName, validatePhone } from '@/lib/quiz'
import { IconPaw } from '@/components/ui/Icons'

interface FormData {
  name: string
  phone: string
  dogName: string
  dogAge: string
  dogWeight: string
  comment: string
  website: string
}

const INITIAL: FormData = {
  name: '',
  phone: '',
  dogName: '',
  dogAge: '',
  dogWeight: '',
  comment: '',
  website: '',
}

export function LeadForm() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return

    const nextErrors: Partial<Record<keyof FormData, string>> = {}
    if (!validateName(form.name)) nextErrors.name = 'Введите имя (минимум 2 символа)'
    if (!validatePhone(form.phone)) nextErrors.phone = 'Введите корректный телефон'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <section className="section lead" id="lead">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Контакты</p>
          <h2>Остались вопросы?</h2>
          <p>
            Оставьте контакты — поможем подобрать натуральные лакомства под вашу
            собаку и подскажем по заказу и доставке по Санкт-Петербургу.
          </p>
        </div>
        <div className="lead__wrap">
          {submitted ? (
            <div className="form-success">
              Спасибо. Мы получили заявку в демо-режиме и свяжемся с вами,
              чтобы помочь с подбором и заказом.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => update('website', e.target.value)}
                className="hp-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />
              <div className="lead__grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="lead-name">Имя</label>
                  <input id="lead-name" className="form-input" value={form.name} onChange={(e) => update('name', e.target.value)} />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lead-phone">Телефон</label>
                  <input id="lead-phone" className="form-input" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+7" />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lead-dog">Имя собаки</label>
                  <input id="lead-dog" className="form-input" value={form.dogName} onChange={(e) => update('dogName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lead-age">Возраст собаки</label>
                  <input id="lead-age" className="form-input" value={form.dogAge} onChange={(e) => update('dogAge', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lead-weight">Вес собаки</label>
                  <input id="lead-weight" className="form-input" value={form.dogWeight} onChange={(e) => update('dogWeight', e.target.value)} />
                </div>
                <div className="form-group full">
                  <label className="form-label" htmlFor="lead-comment">Комментарий</label>
                  <textarea id="lead-comment" className="form-textarea" value={form.comment} onChange={(e) => update('comment', e.target.value)} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-wide">
                Оставить заявку
                <IconPaw />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
