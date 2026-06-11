type IconProps = { className?: string }

export function IconPaw({ className = '' }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="8" cy="7" rx="2.2" ry="2.6" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="5.5" rx="2.2" ry="2.6" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="16" cy="7" rx="2.2" ry="2.6" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="6.5" cy="11" rx="1.8" ry="2.2" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="17.5" cy="11" rx="1.8" ry="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 12.5c1.2 3.5 4.8 3.5 6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function IconSliders({ className = '' }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h10M4 17h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconCrown({ className = '' }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 17h16v2H4v-2zm2-9 3 4 3-6 3 6 3-4 2 9H6l2-9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

export function IconCheck({ className = '' }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconBuilding({ className = '' }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 20V8l6-4 6 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 20v-5h4v5M9 11h1M14 11h1M9 14h1M14 14h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function IconEnvelope({ className = '' }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconHeart({ className = '' }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconPin({ className = '' }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconLines({ className = '' }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="4" y="13" width="16" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function IconStar({ className = '' }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l2.2 5.8L20 10l-4.5 3.8L17 20l-5-3.2L7 20l1.5-6.2L4 10l5.8-1.2L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

export function IconLaunch({ className = '' }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19l4-9 9-4-4 9-9 4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
