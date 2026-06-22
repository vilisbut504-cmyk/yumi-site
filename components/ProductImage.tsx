'use client'

import { useState } from 'react'
import { asset } from '@/lib/asset'
import { getProductImage, FALLBACK_PRODUCT_IMAGE } from '@/src/lib/assets'

interface ProductImageProps {
  imagePaths: string[]
  alt: string
  className?: string
}

function resolve(src: string): string {
  if (!src) return asset(FALLBACK_PRODUCT_IMAGE)
  if (src.startsWith('http')) return src
  return asset(src)
}

export function ProductImage({ imagePaths, alt, className = '' }: ProductImageProps) {
  const initial = resolve(getProductImage(imagePaths))
  const fallback = asset(FALLBACK_PRODUCT_IMAGE)
  const [src, setSrc] = useState(initial)

  return (
    <span className={`product-image ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => {
          if (src !== fallback) setSrc(fallback)
        }}
      />
    </span>
  )
}
