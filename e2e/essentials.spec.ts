import { expect, test } from '@playwright/test'

test('favicon and apple touch icon are served', async ({ page, request }) => {
  await page.goto('/')
  const iconHref = await page
    .locator('link[rel="icon"]')
    .first()
    .getAttribute('href')
  const icon = await request.get(iconHref!)
  expect(icon.status()).toBe(200)
  expect(icon.headers()['content-type']).toContain('image/png')

  const appleHref = await page
    .locator('link[rel="apple-touch-icon"]')
    .getAttribute('href')
  expect(appleHref).toBeTruthy()
  expect((await request.get(appleHref!)).status()).toBe(200)
})

test('theme colour is set for light and dark', async ({ page }) => {
  await page.goto('/')
  const metas = page.locator('meta[name="theme-color"]')
  await expect(metas).toHaveCount(2)
  await expect(metas.nth(0)).toHaveAttribute('media', /light/)
  await expect(metas.nth(1)).toHaveAttribute('media', /dark/)
})

test('responses carry security headers', async ({ request }) => {
  const headers = (await request.get('/')).headers()
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  expect(headers['x-frame-options']).toBe('DENY')
  expect(headers['permissions-policy']).toBe(
    'camera=(), microphone=(), geolocation=()',
  )
})

test('the 404 page links to the main pages', async ({ page }) => {
  const res = await page.goto('/nope')
  expect(res?.status()).toBe(404)
  await expect(page).toHaveTitle(/Page not found/)
  for (const name of ['Home', 'Projects'])
    await expect(
      page.locator('main').getByRole('link', { name, exact: true }),
    ).toBeVisible()
  // No published article on the production build, so no Writing link.
  await expect(
    page.locator('main').getByRole('link', { name: 'Writing', exact: true }),
  ).toHaveCount(0)
})
