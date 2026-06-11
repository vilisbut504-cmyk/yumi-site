'use client'

import { useEffect, useState } from 'react'
import { BrandLogo } from '@/components/BrandLogo'
import { IconPaw } from '@/components/ui/Icons'

const NAV_LINKS = [
  { href: '#about', label: 'О бренде' },
  { href: '#lines', label: 'Линейки' },
  { href: '#quiz', label: 'Подбор' },
  { href: '#quality', label: 'Качество' },
  { href: '#delivery', label: 'Доставка' },
  { href: '#faq', label: 'FAQ' },
  { href: '#lead', label: 'Контакты' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo" onClick={closeMenu} aria-label="ЮМИ — на главную">
          <BrandLogo variant="mark" height={44} priority />
          <span className="header__wordmark">ЮМИ</span>
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="header__link">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#quiz" className="btn btn-primary header__cta">
          Подобрать корм
          <IconPaw />
        </a>

        <button
          type="button"
          className={`header__burger${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <nav className={`header__mobile${menuOpen ? ' open' : ''}`} hidden={!menuOpen}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="header__mobile-link" onClick={closeMenu}>
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
