'use client'

import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
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
  { href: '/#top', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/#categories', label: 'Категории' },
  { href: '/#picker', label: 'Подбор' },
  { href: '/knowledge', label: 'База знаний' },
  { href: '/#delivery', label: 'Доставка' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/cart', label: 'Корзина' },
]

function CartLink({ onClick, className = '' }: { onClick?: () => void; className?: string }) {
  const { count, mounted } = useCart()
  return (
    <Link href="/cart" className={`header__cart ${className}`.trim()} onClick={onClick}>
      <span className="header__cart-label">Корзина</span>
      {mounted && count > 0 && <span className="header__cart-count">{count}</span>}
    </Link>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, closeMenu])

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <Link href="/" className="header__logo" onClick={closeMenu} aria-label="ЮМИ — на главную">
            <BrandLogo variant="mark" height={36} priority />
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
            <CartLink className="header__cart--bar" onClick={closeMenu} />
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
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="presentation">
          <button
            type="button"
            className="mobile-menu__backdrop"
            aria-label="Закрыть меню"
            onClick={closeMenu}
          />
          <nav className="mobile-menu__panel" aria-label="Мобильное меню">
            <ul className="mobile-menu__list">
              {MOBILE_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="mobile-menu__link" onClick={closeMenu}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/catalog" className="btn btn-primary mobile-menu__cta" onClick={closeMenu}>
              Перейти в каталог
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
