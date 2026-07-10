/**
 * Синхронизация наличия/предзаказа из цветов колонки A в
 * data/import/Проект ЮМА.xlsx → src/data/product-availability.generated.json
 *
 * Зелёный (#00B050) = in_stock
 * Красный (theme accent2 / #EA4335) = preorder
 *
 * Запуск: node scripts/sync-availability.mjs
 * Требует: npm i -D exceljs (одноразово) или уже установленный exceljs.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PRICE_XLSX = path.join(ROOT, 'data', 'import', 'Проект ЮМА.xlsx')
const PRODUCTS_TS = path.join(ROOT, 'src', 'data', 'products.ts')
const OUT = path.join(ROOT, 'src', 'data', 'product-availability.generated.json')

function isGreenFill(cell) {
  const fg = cell.fill?.fgColor
  if (!fg?.argb) return false
  const hex = String(fg.argb).toUpperCase().slice(-6)
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return g > r + 30 && g > b + 30
}

function cellName(cell) {
  const v = cell.value
  if (v == null) return ''
  if (typeof v === 'object' && v.richText) return v.richText.map((x) => x.text).join('').trim()
  if (typeof v === 'object' && v.text) return String(v.text).trim()
  return String(v).trim()
}

async function main() {
  let ExcelJS
  try {
    ExcelJS = require('exceljs')
  } catch {
    console.error('Нужен exceljs: npm i -D exceljs')
    process.exit(1)
  }

  const src = await fs.readFile(PRODUCTS_TS, 'utf8')
  const rawMatch = src.match(/const RAW = (\[[\s\S]*?\n\])/)
  if (!rawMatch) throw new Error('RAW not found in products.ts')
  const products = JSON.parse(rawMatch[1].replace(/,\s*]/g, ']'))

  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(PRICE_XLSX)
  const ws = wb.worksheets[0]

  const excelRows = []
  for (let r = 3; r <= 80; r++) {
    const a = ws.getCell(r, 1)
    const b = ws.getCell(r, 2)
    const name = cellName(b)
    if (typeof a.value !== 'number' || !name) continue
    excelRows.push({
      name,
      availability: isGreenFill(a) ? 'in_stock' : 'preorder',
    })
  }

  if (products.length !== excelRows.length) {
    console.warn(`⚠ count mismatch: products=${products.length}, excel=${excelRows.length}`)
  }

  const map = {}
  const n = Math.min(products.length, excelRows.length)
  for (let i = 0; i < n; i++) {
    map[products[i].slug] = excelRows[i].availability
  }

  await fs.writeFile(OUT, JSON.stringify(map, null, 2) + '\n')
  const stock = Object.values(map).filter((v) => v === 'in_stock').length
  const pre = Object.values(map).filter((v) => v === 'preorder').length
  console.log(`✅ ${OUT}`)
  console.log(`   in_stock: ${stock}, preorder: ${pre}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
