const NAV = [
  { href: '#about', label: 'О бренде' },
  { href: '#lines', label: 'Линейки' },
  { href: '#quiz', label: 'Подбор' },
  { href: '#quality', label: 'Качество' },
  { href: '#delivery', label: 'Доставка' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contacts', label: 'Контакты' },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="footer__logo">ЮМИ</div>
            <p className="footer__desc">Премиальный сухой корм для собак</p>
            <p className="footer__city">Санкт-Петербург</p>
          </div>
          <div>
            <p className="footer__heading">Навигация</p>
            {NAV.map((link) => (
              <a key={link.href} href={link.href} className="footer__link">
                {link.label}
              </a>
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
          <div className="footer__legal">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Пользовательское соглашение</a>
          </div>
          <p style={{ marginTop: 16 }}>© {new Date().getFullYear()} ЮМИ</p>
        </div>
      </div>
    </footer>
  )
}
