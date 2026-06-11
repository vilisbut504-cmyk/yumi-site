import { IconCheck, IconEnvelope, IconHeart, IconSliders, IconStar } from '@/components/ui/Icons'

const STEPS = [
  {
    num: '01',
    icon: IconSliders,
    title: 'Пройдите подбор',
    text: 'Ответьте на несколько простых вопросов о вашей собаке.',
  },
  {
    num: '02',
    icon: IconCheck,
    title: 'Получите рекомендацию',
    text: 'Мы подберём подходящую будущую линейку ЮМИ.',
  },
  {
    num: '03',
    icon: IconEnvelope,
    title: 'Узнайте о запуске',
    text: 'Оставьте контакты — мы сообщим, когда корм появится в продаже.',
  },
  {
    num: '04',
    icon: IconStar,
    title: 'Будьте уверены в качестве',
    text: 'Премиальный подход и прозрачная коммуникация на каждом этапе.',
  },
  {
    num: '05',
    icon: IconHeart,
    title: 'Забота каждый день',
    text: 'Ежедневное питание для здоровья, энергии и спокойствия владельца.',
  },
]

export function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="container">
        <div className="section-header center">
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
