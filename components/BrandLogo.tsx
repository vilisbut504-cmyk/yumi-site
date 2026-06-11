import Image from 'next/image'

const LOGO_SRC = '/logo.png'

interface BrandLogoProps {
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export function BrandLogo({
  className = '',
  width = 120,
  height = 120,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="ЮМИ — премиальный сухой корм для собак"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
