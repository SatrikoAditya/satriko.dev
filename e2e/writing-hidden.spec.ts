import { expect, test } from '@playwright/test'

import { hasPublishedArticles } from './support/articles'

// Writing is shown only once an article is published. The only article today is
// a draft, so the production build hides Writing everywhere and /writing is
// noindex. After the first article goes out, the same specs expect Writing in
// the nav, the command menu and the sitemap, and /writing to be indexable.
// The state is read from src/content/articles at test time.

test('the desktop nav matches whether an article is published', async ({
  page,
}) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Main' })
  await expect(nav.getByRole('link', { name: 'Projects' })).toBeVisible()
  await expect(nav.getByRole('link', { name: 'Writing' })).toHaveCount(
    hasPublishedArticles ? 1 : 0,
  )
})

test('the command menu matches whether an article is published', async ({
  page,
}) => {
  await page.goto('/')
  await page.keyboard.press('ControlOrMeta+k')
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('option', { name: 'All projects' })).toBeVisible()
  await expect(
    page.getByRole('option', { name: 'Writing', exact: true }),
  ).toHaveCount(hasPublishedArticles ? 1 : 0)
})

test('the sitemap lists /writing only once an article is published', async ({
  request,
}) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  expect(xml).toContain('https://satriko.dev/projects')
  if (hasPublishedArticles)
    expect(xml).toContain('https://satriko.dev/writing<')
  else expect(xml).not.toContain('/writing')
})

test('/writing always loads and is indexable only once an article is published', async ({
  page,
  request,
}) => {
  const res = await request.get('/writing')
  expect(res.status()).toBe(200)
  await page.goto('/writing')
  await expect(
    page.locator('meta[name="robots"][content*="noindex"]'),
  ).toHaveCount(hasPublishedArticles ? 0 : 1)
})
