import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 1280, height: 900 } })

for (const id of ['about', 'experience', 'projects', 'stack']) {
  test(`#${id}: label stays above the content`, async ({ page }) => {
    await page.goto('/')
    const label = await page.locator(`#${id}-label`).boundingBox()
    const content = await page
      .locator(`#${id} > :not(:first-child)`)
      .first()
      .boundingBox()
    expect(label!.y + label!.height).toBeLessThanOrEqual(content!.y)
  })
}

test('hovering a job highlights its timeline dot', async ({ page }) => {
  await page.goto('/')
  const item = page.locator('#experience ol > li').first()
  const dot = item.locator('span[aria-hidden] > span').nth(1)
  await item.scrollIntoViewIfNeeded()
  const before = await dot.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  )
  await item.hover()
  await expect
    .poll(() => dot.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(before)
})

test('root font size is fluid: 18px on large screens, 16px on phones', async ({
  page,
}) => {
  const size = () =>
    page.evaluate(() => getComputedStyle(document.documentElement).fontSize)
  await page.goto('/')
  expect(await size()).toBe('18px')
  await page.setViewportSize({ width: 375, height: 800 })
  expect(await size()).toBe('16px')
})

for (const path of ['/', '/projects', '/writing']) {
  for (const width of [360, 375, 768, 1024]) {
    test(`${path} at ${width}px: no sideways scroll`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)
    })
  }
}
