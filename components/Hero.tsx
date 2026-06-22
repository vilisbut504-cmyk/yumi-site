import Image from 'next/image'
import Link from 'next/link'
import { asset } from '@/lib/asset'
import { IconCheck, IconHeart, IconPaw, IconStar } from '@/components/ui/Icons'

const FEATURES = [
  { icon: IconCheck, label: '100% натуральный состав' },
  { icon: IconStar, label: 'Сушка без соли и консервантов' },
  { icon: IconHeart, label: 'Для поощрения и жевания' },
  { icon: IconPaw, label: 'Доставка по Санкт-Петербургу' },
]

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow">Натуральные лакомства · Санкт-Петербург</p>
          <h1 className="hero__title">ЮМИ — натуральные сушёные лакомства для собак</h1>
          <p className="hero__sub">
            Сушёные мясные продукты и жевательные лакомства из качественного сырья.
            Дополнение к основному рациону для поощрения, дрессировки и долгого жевания.
          </p>
          <div className="hero__btns">
            <Link href="/catalog" className="btn btn-primary">
              Перейти в каталог
              <IconPaw />
            </Link>
            <Link href="/#picker" className="btn btn-secondary">
              Подобрать лакомство
            </Link>
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
          <div className="hero__arc" aria-hidden />
          <div className="hero__glow" aria-hidden />
          <Image
            src={asset('/hero-dog.jpg')}
            alt="Собака с натуральным лакомством ЮМИ"
            width={700}
            height={705}
            className="hero__dog"
            priority
          />
        </div>
      </div>
    </section>
  )
}
