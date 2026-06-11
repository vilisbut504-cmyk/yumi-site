import Image from 'next/image'

const LOGO_FULL = '/logo-yumi-full.png'
const LOGO_MARK = '/logo-yumi-mark.png'

interface BrandLogoProps {
  variant?: 'full' | 'mark'
  className?: string
  height?: number
  priority?: boolean
}

export function BrandLogo({
  variant = 'full',
  className = '',
  height,
  priority = false,
}: BrandLogoProps) {
  const src = variant === 'mark' ? LOGO_MARK : LOGO_FULL
  const defaultHeight = variant === 'mark' ? 72 : 56
  const h = height ?? defaultHeight
  const w = variant === 'mark' ? h : Math.round(h * 2.8)

  return (
    <Image
      src={src}
      alt="ЮМИ"
      width={w}
      height={h}
      className={className}
      priority={priority}
    />
  )
}

export function BrandLogoText({ className = '' }: { className?: string }) {
  return <span className={`brand-logo-text ${className}`}>ЮМИ</span>
}
