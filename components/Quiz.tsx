'use client'

import { useState } from 'react'
import { BrandLogo } from '@/components/BrandLogo'
import { IconPaw } from '@/components/ui/Icons'
import {
  recommendLine,
  validateName,
  validatePhone,
  type DogActivity,
  type DogAge,
  type DogFeature,
  type DogSize,
  type QuizAnswers,
} from '@/lib/quiz'

const INITIAL: QuizAnswers = {
  age: null,
  size: null,
  activity: null,
  feature: null,
  name: '',
  phone: '',
  comment: '',
}

const AGE: { value: DogAge; label: string }[] = [
  { value: 'puppy', label: 'Щенок' },
  { value: 'adult', label: 'Взрослая' },
  { value: 'senior', label: 'Пожилая' },
]

const SIZE: { value: DogSize; label: string }[] = [
  { value: 'small', label: 'Малый' },
  { value: 'medium', label: 'Средний' },
  { value: 'large', label: 'Крупный' },
]

const ACTIVITY: { value: DogActivity; label: string }[] = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
]

const FEATURES: { value: DogFeature; label: string }[] = [
  { value: 'sensitive', label: 'Чувствительное пищеварение' },
  { value: 'weight_gain', label: 'Склонность к набору веса' },
  { value: 'active_sport', label: 'Активные прогулки' },
  { value: 'none', label: 'Особенностей нет' },
]

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: T; label: string }[]
  value: T | null
  onChange: (v: T) => void
}) {
  return (
    <div className="quiz__group">
      <p className="quiz__label">{label}</p>
      <div className="quiz__chips">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`quiz__chip${value === opt.value ? ' selected' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Quiz() {
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL)
  const [showResult, setShowResult] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const recommendation = recommendLine(answers)

  const canSubmit =
    answers.age &&
    answers.size &&
    answers.activity &&
    answers.feature

  const handleGetRecommendation = () => {
    if (!canSubmit) return
    setShowResult(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!validateName(answers.name)) nextErrors.name = 'Введите имя'
    if (!validatePhone(answers.phone)) nextErrors.phone = 'Введите корректный телефон'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="section quiz-section" id="quiz">
        <div className="container">
          <div className="quiz-shell">
            <div className="form-success">
              Спасибо. Заявка сохранена в демо-режиме. После подключения CRM данные
              будут передаваться менеджеру.
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section quiz-section" id="quiz">
      <div className="container">
        <div className="quiz-shell">
          <div className="quiz-shell__intro">
            <h2>Подберите рацион за 2 минуты</h2>
            <p>
              Ответьте на несколько вопросов — и мы подберём будущую линейку ЮМИ
              под вашу собаку.
            </p>
            <div className="quiz-shell__mark">
              <BrandLogo variant="mark" height={88} />
            </div>
            <p className="quiz-shell__micro">Без регистрации и спама</p>
          </div>

          <div className="quiz-shell__form">
            {!showResult ? (
              <>
                <ChipGroup label="Возраст собаки" options={AGE} value={answers.age} onChange={(v) => setAnswers((p) => ({ ...p, age: v }))} />
                <ChipGroup label="Размер" options={SIZE} value={answers.size} onChange={(v) => setAnswers((p) => ({ ...p, size: v }))} />
                <ChipGroup label="Уровень активности" options={ACTIVITY} value={answers.activity} onChange={(v) => setAnswers((p) => ({ ...p, activity: v }))} />
                <ChipGroup label="Особенности" options={FEATURES} value={answers.feature} onChange={(v) => setAnswers((p) => ({ ...p, feature: v }))} />
                <button
                  type="button"
                  className="btn btn-primary btn-wide"
                  disabled={!canSubmit}
                  onClick={handleGetRecommendation}
                >
                  Получить рекомендации
                  <IconPaw />
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="quiz__result-form">
                <div className="quiz__result">
                  <h3>Вам может подойти линейка {recommendation.name}</h3>
                  <p>
                    Мы сообщим о запуске и поможем подобрать первую фасовку.
                  </p>
                  <p className="quiz__disclaimer">
                    Рекомендация предварительная. Финальный состав, фасовки и цены
                    будут опубликованы после утверждения линейки.
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="quiz-name">Имя</label>
                  <input id="quiz-name" className="form-input" value={answers.name} onChange={(e) => setAnswers((p) => ({ ...p, name: e.target.value }))} />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="quiz-phone">Телефон</label>
                  <input id="quiz-phone" className="form-input" type="tel" value={answers.phone} onChange={(e) => setAnswers((p) => ({ ...p, phone: e.target.value }))} placeholder="+7" />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="quiz-comment">Комментарий</label>
                  <textarea id="quiz-comment" className="form-textarea" value={answers.comment} onChange={(e) => setAnswers((p) => ({ ...p, comment: e.target.value }))} />
                </div>
                <button type="submit" className="btn btn-primary btn-wide">
                  Отправить заявку
                  <IconPaw />
                </button>
                <button type="button" className="btn btn-ghost btn-wide" onClick={() => setShowResult(false)}>
                  Изменить ответы
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
