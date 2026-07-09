import Link from 'next/link'
import Image from 'next/image'
import { asset } from '@/lib/asset'
import { IconPaw } from '@/components/ui/Icons'

const HERO_DESKTOP = asset('/images/hero/yumi-hero-dog.webp')
const HERO_TABLET = asset('/images/hero/yumi-hero-dog-tablet.webp')
const HERO_MOBILE = asset('/images/hero/yumi-hero-dog-mobile.webp')

const TRUST_CHIPS = [
  'Оплата при получении',
  'Самовывоз или курьер',
  'Санкт-Петербург',
]

export function Hero() {
  return (
    <section className="hero" id="top">
      <picture className="hero__media hero__media--desktop" aria-hidden>
        <source media="(min-width: 1024px)" srcSet={HERO_DESKTOP} type="image/webp" />
        <img
          src={HERO_DESKTOP}
          alt=""
          className="hero__media-img"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="hero__overlay hero__overlay--desktop" aria-hidden />

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge hero__badge--full">
            Скидка первым клиентам — до 19% в корзине
          </span>
          <span className="hero__badge hero__badge--short">
            Скидка первым клиентам — до 19%
          </span>

          <h1 className="hero__title">Натуральные лакомства для собак</h1>
          <p className="hero__sub">
            Сушёные мясные лакомства для прогулок, поощрения и заботы о питомце.
          </p>

          <div className="hero__btns">
            <Link href="/catalog" className="btn btn-primary btn-hero">
              <span className="hero__btn-text hero__btn-text--full">Перейти в каталог</span>
              <span className="hero__btn-text hero__btn-text--short">В каталог</span>
              <IconPaw />
            </Link>
            <Link href="/#picker" className="btn btn-secondary btn-hero">
              <span className="hero__btn-text hero__btn-text--full">Подобрать лакомство</span>
              <span className="hero__btn-text hero__btn-text--short">Подобрать</span>
            </Link>
          </div>

          <p className="hero__trust-line">
            Оплата при получении · Самовывоз или курьер · Санкт-Петербург
          </p>
          <div className="hero__trust-chips">
            {TRUST_CHIPS.map((chip) => (
              <span key={chip} className="hero__trust-chip">{chip}</span>
            ))}
          </div>

          <div className="hero__figure hero__figure--mobile">
            <Image
              src={HERO_MOBILE}
              alt="Собака с натуральными лакомствами ЮМИ"
              width={900}
              height={507}
              className="hero__figure-img"
              priority
            />
          </div>
        </div>
      </div>

      <div className="container hero__figure hero__figure--tablet">
        <Image
          src={HERO_TABLET}
          alt="Собака с натуральными лакомствами ЮМИ"
          width={1280}
          height={720}
          className="hero__figure-img"
          priority
        />
      </div>
    </section>
  )
}
