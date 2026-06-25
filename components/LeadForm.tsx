'use client'

import { useState } from 'react'
import { validateName, validatePhone } from '@/lib/quiz'
import { PhoneInput } from '@/components/PhoneInput'
import { PHONE_INITIAL } from '@/lib/phone'
import { submitLead } from '@/lib/orderSubmit'
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
  phone: PHONE_INITIAL,
  dogName: '',
  dogAge: '',
  dogWeight: '',
  comment: '',
  website: '',
}

export function LeadForm() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website || submitting) return

    const nextErrors: Partial<Record<keyof FormData, string>> = {}
    if (!validateName(form.name)) nextErrors.name = 'Введите имя (минимум 2 символа)'
    if (!validatePhone(form.phone)) nextErrors.phone = 'Введите корректный телефон'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setSubmitError('')
    try {
      await submitLead({
        customer: {
          name: form.name,
          phone: form.phone,
          comment: form.comment || undefined,
        },
        dog: {
          name: form.dogName || undefined,
          age: form.dogAge || undefined,
          weight: form.dogWeight || undefined,
        },
      })
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Не удалось отправить заявку')
    } finally {
      setSubmitting(false)
    }
  }

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (submitError) setSubmitError('')
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
              Заявка отправлена. Менеджер свяжется с вами для подтверждения состава
              заказа, доставки и способа оплаты.
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
                  <PhoneInput id="lead-phone" value={form.phone} onChange={(v) => update('phone', v)} />
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
              {submitError && <p className="form-error">{submitError}</p>}
              <button type="submit" className="btn btn-primary btn-wide" disabled={submitting}>
                {submitting ? 'Отправляем…' : 'Оставить заявку'}
                <IconPaw />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
