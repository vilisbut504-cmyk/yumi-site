import Image from 'next/image'
import { asset } from '@/lib/asset'

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
  const src = variant === 'mark' ? asset('/logo-yumi-mark.png') : asset('/logo-yumi-full.png')
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
