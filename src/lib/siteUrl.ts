/**
 * Единый источник канонического origin сайта.
 * Кириллица юми-корм.рф и Punycode xn----otbhfdlo0i.xn--p1ai — один hostname.
 * Для URL API используем Punycode-форму (стабильнее в Node/Next metadata).
 */

const PRODUCTION_ORIGIN = 'https://xn----otbhfdlo0i.xn--p1ai'
const GITHUB_PAGES_ORIGIN = 'https://vilisbut504-cmyk.github.io/yumi-site'

export const SITE_DOMAIN_CYRILLIC = 'https://юми-корм.рф'
export const SITE_DOMAIN_PUNYCODE = PRODUCTION_ORIGIN

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '')
}

/** Публичный origin без завершающего слэша. */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) return stripTrailingSlash(fromEnv)

  if (process.env.DEPLOY_TARGET === 'github-pages') {
    return GITHUB_PAGES_ORIGIN
  }

  return PRODUCTION_ORIGIN
}

/** metadataBase для Next.js Metadata API. */
export function getMetadataBase(): URL {
  return new URL(`${getSiteOrigin()}/`)
}
