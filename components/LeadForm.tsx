'use client'

import { useState } from 'react'
import { validateName, validatePhone } from '@/lib/quiz'

interface FormData {
  name: string
  phone: string
  dogName: string
  dogAge: string
  dogWeight: string
  comment: string
}

const INITIAL: FormData = {
  name: '',
  phone: '',
  dogName: '',
  dogAge: '',
  dogWeight: '',
  comment: '',
}

export function LeadForm() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
    <section className="section lead" id="contacts">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Контакты</p>
          <h2>Оставить заявку на запуск ЮМИ</h2>
        </div>
        <div className="lead__wrap">
          {submitted ? (
            <div className="form-success">
              Спасибо. Мы сохранили заявку в демо-режиме и сообщим о запуске ЮМИ
              в Санкт-Петербурге.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="lead__grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="lead-name">Имя</label>
                  <input
                    id="lead-name"
                    className="form-input"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Ваше имя"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lead-phone">Телефон</label>
                  <input
                    id="lead-phone"
                    className="form-input"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lead-dog">Имя собаки</label>
                  <input
                    id="lead-dog"
                    className="form-input"
                    value={form.dogName}
                    onChange={(e) => update('dogName', e.target.value)}
                    placeholder="Кличка"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lead-age">Возраст собаки</label>
                  <input
                    id="lead-age"
                    className="form-input"
                    value={form.dogAge}
                    onChange={(e) => update('dogAge', e.target.value)}
                    placeholder="Например, 2 года"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lead-weight">Вес собаки</label>
                  <input
                    id="lead-weight"
                    className="form-input"
                    value={form.dogWeight}
                    onChange={(e) => update('dogWeight', e.target.value)}
                    placeholder="Например, 12 кг"
                  />
                </div>
                <div className="form-group full">
                  <label className="form-label" htmlFor="lead-comment">Комментарий</label>
                  <textarea
                    id="lead-comment"
                    className="form-textarea"
                    value={form.comment}
                    onChange={(e) => update('comment', e.target.value)}
                    placeholder="Пожелания, вопросы, особенности собаки"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
                Оставить заявку
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
