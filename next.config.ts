import type { NextConfig } from 'next'

const deployTarget = process.env.DEPLOY_TARGET || 'timeweb'
const isGithubPages = deployTarget === 'github-pages'
const basePath = isGithubPages ? '/yumi-site' : ''

const nextConfig: NextConfig = {
  ...(isGithubPages ? { output: 'export' as const } : {}),
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
