import Link from 'next/link'
import { BrandLogo } from '@/components/BrandLogo'
import { IconEnvelope, IconHeart, IconPin } from '@/components/ui/Icons'

const NAV = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/#categories', label: 'Категории' },
  { href: '/#picker', label: 'Подбор лакомства' },
  { href: '/knowledge', label: 'База знаний' },
  { href: '/#delivery', label: 'Доставка' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/cart', label: 'Корзина' },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__premium">
          <div className="footer__premium-item">
            <IconPin />
            <span>Санкт-Петербург</span>
          </div>
          <div className="footer__premium-item">
            <IconHeart />
            <span>Сделано с любовью к собакам</span>
          </div>
          <div className="footer__premium-logo">
            <BrandLogo variant="mark" height={64} />
          </div>
          <div className="footer__premium-item">
            <span>Натуральная сушка и жевательные продукты</span>
          </div>
          <div className="footer__premium-item">
            <IconEnvelope />
            <span>Поможем с подбором</span>
          </div>
        </div>

        <div className="footer__grid">
          <div>
            <p className="footer__brand-name">ЮМИ</p>
            <p className="footer__desc">Натуральные сушёные лакомства и жевательные продукты для собак</p>
            <p className="footer__city">Санкт-Петербург</p>
          </div>
          <div>
            <p className="footer__heading">Навигация</p>
            {NAV.map((link) => (
              <Link key={link.href} href={link.href} className="footer__link">{link.label}</Link>
            ))}
          </div>
          <div>
            <p className="footer__heading">Документы</p>
            <a href="#" className="footer__link">Политика конфиденциальности</a>
            <a href="#" className="footer__link">Пользовательское соглашение</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            Лакомство не является заменой основного рациона. Наблюдайте за собакой
            во время жевания. При чувствительном пищеварении вводите новый продукт
            постепенно.
          </p>
          <p>© {new Date().getFullYear()} ЮМИ</p>
        </div>
      </div>
    </footer>
  )
}
