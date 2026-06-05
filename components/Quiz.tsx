'use client'

import { useState } from 'react'
import {
  recommendLine,
  validateName,
  validatePhone,
  type DogActivity,
  type DogAge,
  type DogFeature,
  type DogWeight,
  type QuizAnswers,
} from '@/lib/quiz'

const TOTAL_STEPS = 6

const AGE_OPTIONS: { value: DogAge; label: string }[] = [
  { value: 'puppy', label: 'Щенок' },
  { value: 'adult', label: 'Взрослая' },
  { value: 'senior', label: 'Пожилая' },
]

const WEIGHT_OPTIONS: { value: DogWeight; label: string }[] = [
  { value: 'under5', label: 'До 5 кг' },
  { value: '5to15', label: '5–15 кг' },
  { value: '15to30', label: '15–30 кг' },
  { value: 'over30', label: '30+ кг' },
]

const ACTIVITY_OPTIONS: { value: DogActivity; label: string }[] = [
  { value: 'low', label: 'Низкая' },
  { value: 'medium', label: 'Средняя' },
  { value: 'high', label: 'Высокая' },
]

const FEATURE_OPTIONS: { value: DogFeature; label: string }[] = [
  { value: 'sensitive', label: 'Чувствительное пищеварение' },
  { value: 'weight_gain', label: 'Склонность к набору веса' },
  { value: 'active_sport', label: 'Активные прогулки или спорт' },
  { value: 'none', label: 'Особенностей нет' },
]

const FOOD_OPTIONS = [
  'Сухой корм',
  'Влажный корм',
  'Натуральное питание',
  'Смешанное питание',
  'Только выбираю',
]

const INITIAL: QuizAnswers = {
  age: null,
  weight: null,
  activity: null,
  feature: null,
  currentFood: null,
  name: '',
  phone: '',
  comment: '',
}

export function Quiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const progress = ((step + 1) / TOTAL_STEPS) * 100
  const recommendation = recommendLine(answers)

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!validateName(answers.name)) nextErrors.name = 'Введите имя (минимум 2 символа)'
    if (!validatePhone(answers.phone)) nextErrors.phone = 'Введите корректный телефон'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  const selectOption = <T extends string>(field: keyof QuizAnswers, value: T, autoAdvance = true) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
    if (autoAdvance && step < 4) setTimeout(goNext, 200)
  }

  if (submitted) {
    return (
      <section className="section quiz" id="quiz">
        <div className="container">
          <div className="quiz__wrap">
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
    <section className="section quiz" id="quiz">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Подбор рациона</p>
          <h2>Подберите будущий рацион ЮМИ за 2 минуты</h2>
        </div>
        <div className="quiz__wrap">
          <div className="quiz__progress">
            <div className="quiz__progress-bar" style={{ width: `${progress}%` }} />
          </div>

          {step === 0 && (
            <div className="quiz__step">
              <h3 className="quiz__question">Возраст собаки</h3>
              <div className="quiz__options quiz__options--grid">
                {AGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`quiz__option${answers.age === opt.value ? ' selected' : ''}`}
                    onClick={() => selectOption('age', opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="quiz__step">
              <h3 className="quiz__question">Вес собаки</h3>
              <div className="quiz__options quiz__options--grid">
                {WEIGHT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`quiz__option${answers.weight === opt.value ? ' selected' : ''}`}
                    onClick={() => selectOption('weight', opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="quiz__step">
              <h3 className="quiz__question">Активность</h3>
              <div className="quiz__options">
                {ACTIVITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`quiz__option${answers.activity === opt.value ? ' selected' : ''}`}
                    onClick={() => selectOption('activity', opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="quiz__step">
              <h3 className="quiz__question">Есть ли особенности?</h3>
              <div className="quiz__options">
                {FEATURE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`quiz__option${answers.feature === opt.value ? ' selected' : ''}`}
                    onClick={() => selectOption('feature', opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="quiz__step">
              <h3 className="quiz__question">Чем кормите сейчас?</h3>
              <div className="quiz__options">
                {FOOD_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`quiz__option${answers.currentFood === opt ? ' selected' : ''}`}
                    onClick={() => selectOption('currentFood', opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="quiz__step quiz__result">
              <h3>Вам может подойти линейка: {recommendation.name}</h3>
              <p>
                {recommendation.tagline} Оставьте контакт — мы сообщим о запуске
                и поможем подобрать первую фасовку.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="quiz-name">Имя</label>
                  <input
                    id="quiz-name"
                    className="form-input"
                    value={answers.name}
                    onChange={(e) => setAnswers((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Как к вам обращаться"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="quiz-phone">Телефон</label>
                  <input
                    id="quiz-phone"
                    className="form-input"
                    type="tel"
                    value={answers.phone}
                    onChange={(e) => setAnswers((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+7 (___) ___-__-__"
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="quiz-comment">Комментарий</label>
                  <textarea
                    id="quiz-comment"
                    className="form-textarea"
                    value={answers.comment}
                    onChange={(e) => setAnswers((p) => ({ ...p, comment: e.target.value }))}
                    placeholder="Расскажите о собаке, если хотите"
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Отправить заявку
                </button>
              </form>
            </div>
          )}

          {step < 5 && (
            <div className="quiz__nav">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={goBack}
                disabled={step === 0}
                style={{ opacity: step === 0 ? 0.4 : 1 }}
              >
                Назад
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={goNext}
                disabled={
                  (step === 0 && !answers.age) ||
                  (step === 1 && !answers.weight) ||
                  (step === 2 && !answers.activity) ||
                  (step === 3 && !answers.feature) ||
                  (step === 4 && !answers.currentFood)
                }
                style={{
                  opacity:
                    (step === 0 && !answers.age) ||
                    (step === 1 && !answers.weight) ||
                    (step === 2 && !answers.activity) ||
                    (step === 3 && !answers.feature) ||
                    (step === 4 && !answers.currentFood)
                      ? 0.4
                      : 1,
                }}
              >
                Далее
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="quiz__nav">
              <button type="button" className="btn btn-ghost" onClick={goBack}>
                Назад
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
