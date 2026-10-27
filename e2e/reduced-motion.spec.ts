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

test('the theme still flips, instantly, when the visitor prefers reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  await page.goto('/')
  await page.evaluate(() => {
    const spy = { started: 0 }
    Object.assign(window, { __viewTransitions: spy })
    const original = document.startViewTransition?.bind(document)
    if (original)
      document.startViewTransition = (...args) => {
        spy.started += 1
        return original(...args)
      }
  })
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { __viewTransitions: { started: number } })
          .__viewTransitions.started,
    ),
  ).toBe(0)
})
