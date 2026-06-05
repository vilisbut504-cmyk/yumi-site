'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#about', label: 'О бренде' },
  { href: '#lines', label: 'Линейки' },
  { href: '#quiz', label: 'Подбор' },
  { href: '#quality', label: 'Качество' },
  { href: '#delivery', label: 'Доставка' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contacts', label: 'Контакты' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#" className="header__logo" onClick={closeMenu}>ЮМИ</a>

        <nav className="header__nav" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="header__link">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#quiz" className="btn btn-primary header__cta">Подобрать корм</a>

        <button
          type="button"
          className={`header__burger${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`header__mobile${menuOpen ? ' open' : ''}`}
        aria-label="Мобильная навигация"
        hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="header__mobile-link"
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <a href="#quiz" className="btn btn-gold header__mobile-cta" onClick={closeMenu}>
          Подобрать корм
        </a>
      </nav>
    </header>
  )
}
