import { BrandLogo } from '@/components/BrandLogo'
import { IconEnvelope, IconHeart, IconPin } from '@/components/ui/Icons'

const NAV = [
  { href: '#about', label: 'О бренде' },
  { href: '#lines', label: 'Линейки' },
  { href: '#quiz', label: 'Подбор' },
  { href: '#quality', label: 'Качество' },
  { href: '#delivery', label: 'Доставка' },
  { href: '#faq', label: 'FAQ' },
  { href: '#lead', label: 'Контакты' },
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
            <span>Будущие линейки — уже скоро</span>
          </div>
          <div className="footer__premium-item">
            <IconEnvelope />
            <span>Следите за запуском</span>
          </div>
        </div>

        <div className="footer__grid">
          <div>
            <p className="footer__brand-name">ЮМИ</p>
            <p className="footer__desc">Премиальный сухой корм для собак</p>
            <p className="footer__city">Санкт-Петербург</p>
          </div>
          <div>
            <p className="footer__heading">Навигация</p>
            {NAV.map((link) => (
              <a key={link.href} href={link.href} className="footer__link">{link.label}</a>
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
            Сайт является концепцией бренда на этапе подготовки запуска. Ассортимент,
            цены и условия доставки будут опубликованы после утверждения.
          </p>
          <p>© {new Date().getFullYear()} ЮМИ</p>
        </div>
      </div>
    </footer>
  )
}
