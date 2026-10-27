import { expect, test } from '@playwright/test'

// The production build ships no published article (the only one is a draft),
// so Writing stays out of the navigation and the sitemap and the page is noindex.

test('the desktop nav has no Writing link', async ({ page }) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Main' })
  await expect(nav.getByRole('link', { name: 'Projects' })).toBeVisible()
  await expect(nav.getByRole('link', { name: 'Writing' })).toHaveCount(0)
})

test('the command menu has no Writing shortcut', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('ControlOrMeta+k')
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('option', { name: 'All projects' })).toBeVisible()
  await expect(page.getByRole('option', { name: 'Writing' })).toHaveCount(0)
})

test('the sitemap leaves out /writing', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  expect(xml).toContain('https://satriko.dev/projects')
  expect(xml).not.toContain('/writing')
})

test('/writing still loads but asks not to be indexed', async ({
  page,
  request,
}) => {
  const res = await request.get('/writing')
  expect(res.status()).toBe(200)
  await page.goto('/writing')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  )
})
