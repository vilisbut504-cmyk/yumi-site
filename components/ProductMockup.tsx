import Image from 'next/image'
import { asset } from '@/lib/asset'

interface ProductMockupProps {
  slug: string
  bg: string
  alt: string
}

export function ProductMockup({ slug, bg, alt }: ProductMockupProps) {
  return (
    <div className="line-visual" style={{ background: bg }}>
      <Image
        src={asset(`/lines/${slug}.png`)}
        alt={alt}
        width={420}
        height={320}
        className="line-visual__img"
      />
    </div>
  )
}
