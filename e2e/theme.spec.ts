import { expect, test } from '@playwright/test'

test('follows the system theme, then remembers the toggle', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await page.reload()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
})

test('the toggle reveals the new theme through a view transition', async ({
  page,
}) => {
  await page.emulateMedia({
    colorScheme: 'light',
    reducedMotion: 'no-preference',
  })
  await page.goto('/')
  await page.evaluate(() => {
    Object.assign(window, { __classAtSnapshot: [] as boolean[] })
    const original = document.startViewTransition.bind(document)
    document.startViewTransition = (update) =>
      original(async () => {
        if (typeof update === 'function') await update()
        ;(
          window as unknown as { __classAtSnapshot: boolean[] }
        ).__classAtSnapshot.push(
          document.documentElement.classList.contains('dark'),
        )
      })
  })
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  // The class must already be applied when the transition's update callback finishes.
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { __classAtSnapshot: boolean[] })
          .__classAtSnapshot,
    ),
  ).toEqual([true])
})
