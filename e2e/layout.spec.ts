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

for (const [width, maxRows] of [
  [375, 2],
  [768, 1],
  [1024, 1],
  [1280, 1],
]) {
  test(`#stack at ${width}px: logos fill whole rows, never a lone one`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const tops = await page
      .locator('#stack li')
      .evaluateAll((els) =>
        els.map((el) => Math.round(el.getBoundingClientRect().top)),
      )
    const perRow = new Map<number, number>()
    for (const top of tops) perRow.set(top, (perRow.get(top) ?? 0) + 1)
    expect(perRow.size).toBeLessThanOrEqual(maxRows)
    if (width >= 768) expect(perRow.size).toBe(1)
    for (const count of perRow.values()) expect(count).toBeGreaterThan(1)
  })
}

test('GitHub grid fills the content width at desktop', async ({ page }) => {
  await page.goto('/')
  const label = await page.locator('#github-label').boundingBox()
  const link = await page
    .locator('#github a[href*="github.com"]')
    .first()
    .boundingBox()
  const svg = await page.locator('#github svg').boundingBox()
  expect(Math.abs(svg!.x - label!.x)).toBeLessThanOrEqual(2)
  expect(
    Math.abs(svg!.x + svg!.width - (link!.x + link!.width)),
  ).toBeLessThanOrEqual(2)
})

test('GitHub grid opens on the newest weeks on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('/')
  const box = await page.locator('#github [role="region"]').boundingBox()
  const rects = page.locator('#github svg rect')
  const last = await rects.last().boundingBox()
  expect(last!.x + last!.width).toBeLessThanOrEqual(box!.x + box!.width + 1)
  expect(last!.x).toBeGreaterThanOrEqual(box!.x)
  const scrollable = await page
    .locator('#github [role="region"]')
    .evaluate((el) => el.scrollWidth > el.clientWidth)
  expect(scrollable).toBe(true)
})
