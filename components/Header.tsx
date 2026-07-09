'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BrandLogo } from '@/components/BrandLogo'
import { useCart } from '@/components/CartProvider'

const NAV_LINKS = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/#categories', label: 'Категории' },
  { href: '/#picker', label: 'Подбор' },
  { href: '/knowledge', label: 'База знаний' },
  { href: '/#delivery', label: 'Доставка' },
  { href: '/#faq', label: 'FAQ' },
]

const MOBILE_NAV_LINKS = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/knowledge', label: 'База знаний' },
  { href: '/cart', label: 'Корзина' },
]

function CartLink({ onClick, className = '' }: { onClick?: () => void; className?: string }) {
  const { count, mounted } = useCart()
  return (
    <Link href="/cart" className={`header__cart ${className}`.trim()} onClick={onClick}>
      <span>Корзина</span>
      {mounted && count > 0 && <span className="header__cart-count">{count}</span>}
    </Link>
  )
}

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
        <Link href="/" className="header__logo" onClick={closeMenu} aria-label="ЮМИ — на главную">
          <BrandLogo variant="mark" height={40} priority />
          <span className="header__wordmark">ЮМИ</span>
        </Link>

        <nav className="header__nav" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="header__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <CartLink className="header__cart--desktop" />
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
      </div>

      {menuOpen && (
        <button
          type="button"
          className="header__backdrop"
          aria-label="Закрыть меню"
          onClick={closeMenu}
        />
      )}

      <nav
        className={`header__mobile${menuOpen ? ' open' : ''}`}
        aria-label="Мобильное меню"
        aria-hidden={!menuOpen}
      >
        {MOBILE_NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="header__mobile-link" onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        <Link href="/catalog" className="btn btn-gold header__mobile-cta" onClick={closeMenu}>
          Перейти в каталог
        </Link>
      </nav>
    </header>
  )
}
