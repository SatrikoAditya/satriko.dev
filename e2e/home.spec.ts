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

test('a project name without a live site opens its card on /projects', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .locator('#projects')
    .getByRole('link', { name: 'DataX Pipeline Builder' })
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

test('a live project name opens its site in a new tab', async ({ page }) => {
  await page.goto('/')
  const link = page
    .locator('#projects')
    .getByRole('link', { name: 'Sativa Trip Indonesia (opens in a new tab)' })
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('href', 'https://sativatripindonesia.com/')
})

test('tapping a long project description expands it without navigating', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('/')
  const sativa = page.locator('#projects article', {
    hasText: 'Sativa Trip Indonesia',
  })
  const text = sativa.locator('p[id$="-summary"]')
  const button = sativa.getByRole('button', { name: /read more|show less/i })
  await expect(button).toHaveText('Read more')
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  const url = page.url()
  await text.click()
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await expect(button).toHaveText('Show less')
  expect(await text.evaluate((el) => el.scrollHeight <= el.clientHeight)).toBe(
    true,
  )
  expect(page.url()).toBe(url)
  expect(page.context().pages()).toHaveLength(1)
  await button.click()
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  expect(page.url()).toBe(url)
})

for (const width of [375, 1280]) {
  test(`a short project description has no Read more at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 })
    await page.goto('/')
    const room = page.locator('#projects article', {
      hasText: "Satriko's Room",
    })
    await expect(room.locator('p[id$="-summary"]')).toBeVisible()
    // The toggle appears only after hydration measures the text; give it a beat.
    await page.waitForTimeout(500)
    await expect(room.getByRole('button')).toHaveCount(0)
  })
}
