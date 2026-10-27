import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

import type { IArticle } from '@models/article'

export const ARTICLES_DIR = path.join(process.cwd(), 'src/content/articles')

function requireString(
  data: Record<string, unknown>,
  key: string,
  file: string,
) {
  const value = data[key]
  if (typeof value !== 'string' || !value.trim())
    throw new Error(`${file}: "${key}" is required`)
  return value
}

// YAML turns `date: 2026-01-10` into a Date, so accept both forms.
function toDay(value: unknown, file: string) {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value))
    return value
  throw new Error(`${file}: "date" must be YYYY-MM-DD`)
}

export function readArticles(
  dir = ARTICLES_DIR,
  includeDrafts = process.env.NODE_ENV !== 'production',
): IArticle[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
      return {
        slug: file.replace(/\.mdx$/, ''),
        title: requireString(data, 'title', file),
        date: toDay(data.date, file),
        summary: requireString(data, 'summary', file),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        draft: data.draft === true,
      }
    })
    .filter((article) => includeDrafts || !article.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getArticle(slug: string) {
  return readArticles().find((article) => article.slug === slug)
}
