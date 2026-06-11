#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const tmp = join(tmpdir(), `yumi-pages-${Date.now()}`)

try {
  execSync('npm run build', {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, GITHUB_PAGES: 'true' },
  })

  const remote = execSync('git remote get-url origin', { cwd: root, encoding: 'utf8' }).trim()
  cpSync(join(root, 'out'), tmp, { recursive: true })
  writeFileSync(join(tmp, '.nojekyll'), '')

  execSync('git init && git checkout -b gh-pages', { cwd: tmp, stdio: 'inherit' })
  execSync('git add -A && git commit -m "Deploy static site to GitHub Pages"', { cwd: tmp, stdio: 'inherit' })
  execSync(`git remote add origin ${remote}`, { cwd: tmp, stdio: 'inherit' })
  execSync('git -c http.postBuffer=524288000 push -f origin gh-pages', { cwd: tmp, stdio: 'inherit' })

  console.log('\nDeployed: https://vilisbut504-cmyk.github.io/yumi-site/')
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
