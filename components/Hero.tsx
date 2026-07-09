import Link from 'next/link'
import { asset } from '@/lib/asset'
import { IconPaw } from '@/components/ui/Icons'

const HERO_DESKTOP = asset('/images/hero/yumi-hero-dog.webp')
const HERO_TABLET = asset('/images/hero/yumi-hero-dog-tablet.webp')
const HERO_MOBILE = asset('/images/hero/yumi-hero-dog-mobile.webp')

export function Hero() {
  return (
    <section className="hero" id="top">
      <picture className="hero__media">
        <source media="(max-width: 600px)" srcSet={HERO_MOBILE} type="image/webp" />
        <source media="(max-width: 1024px)" srcSet={HERO_TABLET} type="image/webp" />
        <img
          src={HERO_DESKTOP}
          alt="Собака с натуральными лакомствами ЮМИ"
          className="hero__media-img"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
        />
      </picture>
      <div className="hero__overlay" aria-hidden />

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">Скидка первым клиентам — до 19% в корзине</span>
          <h1 className="hero__title">Натуральные лакомства для собак</h1>
          <p className="hero__sub">
            Сушёные мясные лакомства для прогулок, поощрения и заботы о питомце.
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
          <p className="hero__trust">
            Оплата при получении · Самовывоз или курьер · Санкт-Петербург
          </p>
        </div>
      </div>
    </section>
  )
}
