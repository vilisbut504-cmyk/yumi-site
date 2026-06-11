import Image from 'next/image'
import { asset } from '@/lib/asset'
import { IconEnvelope, IconLaunch, IconLines, IconPaw, IconSliders, IconStar } from '@/components/ui/Icons'

const FEATURES = [
  { icon: IconSliders, label: 'Подбор по параметрам' },
  { icon: IconLines, label: 'Будущие линейки' },
  { icon: IconStar, label: 'Премиальный подход' },
  { icon: IconLaunch, label: 'Запуск в Санкт-Петербурге' },
]

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg-shape" aria-hidden />
      <div className="hero__bg-arc" aria-hidden />
      <div className="hero__bg-city" aria-hidden />

      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow">Здоровый корм для собак · Санкт-Петербург</p>
          <h1 className="hero__title">ЮМИ — премиальный сухой корм для собак</h1>
          <p className="hero__sub">
            Понятные рационы для ежедневного питания: по возрасту, размеру, активности
            и особенностям вашей собаки.
          </p>
          <div className="hero__btns">
            <a href="#quiz" className="btn btn-primary">
              Подобрать корм
              <IconPaw />
            </a>
            <a href="#lead" className="btn btn-secondary">
              Узнать о запуске
              <IconEnvelope />
            </a>
          </div>
          <div className="hero__features">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="hero__feature">
                <span className="hero__feature-icon"><Icon /></span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__dog-glow" aria-hidden />
          <Image
            src={asset('/hero-dog.png')}
            alt="Золотистый ретривер"
            width={800}
            height={1131}
            className="hero__dog"
            priority
          />
        </div>
      </div>
    </section>
  )
}
