import { expect, test } from '@playwright/test'

test('nothing animates when the visitor prefers reduced motion', async ({
  page,
}) => {
  await page.goto('/')
  for (const selector of ['.hero-in', '.reveal'])
    expect(
      await page
        .locator(selector)
        .first()
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe('none')
})
