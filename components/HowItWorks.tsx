import { IconCheck, IconHeart, IconPaw, IconSliders, IconStar } from '@/components/ui/Icons'

const STEPS = [
  {
    num: '01',
    icon: IconSliders,
    title: 'Выберите лакомства',
    text: 'Подберите продукты в каталоге по типу мяса, размеру собаки и назначению.',
  },
  {
    num: '02',
    icon: IconPaw,
    title: 'Добавьте в корзину',
    text: 'Соберите заказ из нескольких позиций и выберите удобные фасовки.',
  },
  {
    num: '03',
    icon: IconCheck,
    title: 'Оформите заказ',
    text: 'Укажите контакты и адрес. Оплата при получении, без онлайн-оплаты.',
  },
  {
    num: '04',
    icon: IconStar,
    title: 'Доставка по СПб',
    text: 'Привезём заказ по Санкт-Петербургу или согласуем самовывоз.',
  },
  {
    num: '05',
    icon: IconHeart,
    title: 'Радуйте собаку',
    text: 'Используйте лакомства как дополнение к рациону для поощрения и жевания.',
  },
]

export function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="container">
        <div className="section-header center">
          <p className="eyebrow">Как заказать</p>
          <h2>Как это работает</h2>
        </div>
        <div className="how__track">
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <article key={step.title} className="how__step">
                <div className="how__step-num">{step.num}</div>
                <div className="how__step-icon"><Icon /></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
