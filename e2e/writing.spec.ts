import { expect, test } from '@playwright/test'

import { hasPublishedArticles } from './support/articles'

// Writing is always linked: desktop nav, mobile menu, command menu and 404.
// Search engines only see it once an article is published: until then /writing
// shows a "coming soon" page with noindex and the sitemap leaves it out.
// The state is read from src/content/articles at test time.

test('the desktop nav always links to Writing', async ({ page }) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Main' })
  await expect(nav.getByRole('link', { name: 'Projects' })).toBeVisible()
  await expect(nav.getByRole('link', { name: 'Writing' })).toBeVisible()
})

test('the command menu always lists Writing', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('ControlOrMeta+k')
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('option', { name: 'All projects' })).toBeVisible()
  await expect(
    page.getByRole('option', { name: 'Writing', exact: true }),
  ).toBeVisible()
})

test('the mobile menu always links to Writing', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(
    page
      .getByRole('navigation', { name: 'Mobile' })
      .getByRole('link', { name: 'Writing' }),
  ).toBeVisible()
})

test('the 404 page always links to Writing', async ({ page }) => {
  await page.goto('/nope')
  await expect(
    page.locator('main').getByRole('link', { name: 'Writing', exact: true }),
  ).toBeVisible()
})

test('/writing loads and its content matches whether an article is published', async ({
  page,
  request,
}) => {
  const res = await request.get('/writing')
  expect(res.status()).toBe(200)
  await page.goto('/writing')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Writing' }),
  ).toBeVisible()
  const noindex = page.locator('meta[name="robots"][content*="noindex"]')
  const comingSoon = page.getByText('Coming soon', { exact: true })
  if (hasPublishedArticles) {
    await expect(noindex).toHaveCount(0)
    await expect(comingSoon).toHaveCount(0)
    await expect(
      page.locator('main').locator('a[href^="/writing/"]').first(),
    ).toBeVisible()
  } else {
    await expect(noindex).toHaveCount(1)
    await expect(comingSoon).toBeVisible()
    await expect(page.locator('a[href^="/writing/"]')).toHaveCount(0)
  }
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
