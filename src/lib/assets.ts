export function getAssetUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_ASSETS_BASE_URL || ''
  if (!path) return '/fallback-product.webp'
  if (path.startsWith('http')) return path
  return `${base}${path}`
}

/** Первое фото товара или fallback, если фото ещё нет. */
export function getProductImage(imagePaths: string[] | undefined) {
  const first = imagePaths && imagePaths.length > 0 ? imagePaths[0] : ''
  return getAssetUrl(first)
}

export const FALLBACK_PRODUCT_IMAGE = '/fallback-product.webp'
