import { expect, test } from '@playwright/test'

test('home shows every section in order', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { level: 1, name: "Hi, I'm Satriko Aditya" }),
  ).toBeVisible()
  await expect(page.getByText('Open to work & collaboration')).toBeVisible()
  const ids = await page
    .locator('main section[id], footer[id]')
    .evaluateAll((els) => els.map((el) => el.id))
  expect(ids).toEqual([
    'about',
    'stack',
    'experience',
    'education',
    'projects',
    'recommendations',
    'github',
    'contact',
  ])
})

test('nav jumps to a section and the résumé downloads', async ({
  page,
  request,
}) => {
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Experience' })
    .click()
  await expect(page).toHaveURL(/#experience$/)
  await expect(page.locator('#experience')).toBeInViewport()
  const href = await page
    .getByRole('link', { name: /résumé/i })
    .first()
    .getAttribute('href')
  expect((await request.get(href!)).status()).toBe(200)
})

test('stack logos take their brand colour on hover', async ({ page }) => {
  await page.goto('/')
  const logo = page.getByRole('img', { name: 'TypeScript' })
  const before = await logo.evaluate((el) => getComputedStyle(el).color)
  await logo.hover()
  await expect
    .poll(() => logo.evaluate((el) => getComputedStyle(el).color))
    .not.toBe(before)
})
