/** Base path — только для GitHub Pages (DEPLOY_TARGET=github-pages). На Timeweb пусто. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function asset(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${BASE_PATH}${normalized}`
}
