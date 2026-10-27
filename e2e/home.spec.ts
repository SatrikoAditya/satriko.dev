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
    'projects',
    'education',
    'recommendations',
    'github',
    'contact',
  ])
})

test('nav jumps to a section and the resume downloads', async ({
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
    .getByRole('link', { name: /resume/i })
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

test('a project card without a live site opens its card on /projects', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .locator('#projects')
    .getByRole('link', { name: /datax pipeline builder/i })
    .click()
  await expect(page).toHaveURL(/\/projects#datax-pipeline-builder$/)
  const card = page.locator('#datax-pipeline-builder')
  await expect(card).toBeInViewport()
  // Smooth scrolling is still settling right after the click; the card ends up
  // just under the sticky nav (about 4.5rem tall).
  await expect
    .poll(() =>
      card.evaluate((el) => {
        const top = Math.round(el.getBoundingClientRect().top)
        return top >= 64 && top <= 120
      }),
    )
    .toBe(true)
})

test('a live project card opens its site in a new tab', async ({ page }) => {
  await page.goto('/')
  const card = page
    .locator('#projects')
    .getByRole('link', { name: /sativa trip indonesia/i })
  await expect(card).toHaveAttribute('target', '_blank')
  await expect(card).toHaveAttribute('href', 'https://sativatripindonesia.com/')
})
