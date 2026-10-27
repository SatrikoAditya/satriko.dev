import { expect, test } from '@playwright/test'

const paths = ['/', '/projects', '/writing', '/nope']
const widths = [360, 375]

for (const path of paths) {
  for (const width of widths) {
    test(`${path} at ${width}px: no sideways scroll, tap targets at least 40x40`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto(path)

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)

      const tooSmall = await page.evaluate(() => {
        const small: string[] = []
        const els = document.querySelectorAll<HTMLElement>(
          'a, button, [tabindex="0"]',
        )
        for (const el of els) {
          if (el.closest('#stack') && !el.matches('a, button')) continue
          if (el.textContent?.trim() === 'Skip to content') continue
          const style = getComputedStyle(el)
          if (style.display === 'none' || style.visibility === 'hidden')
            continue
          const rect = el.getBoundingClientRect()
          if (rect.width === 0 || rect.height === 0) continue
          if (rect.width < 40 || rect.height < 40) {
            small.push(
              `${el.tagName.toLowerCase()} "${(el.getAttribute('aria-label') ?? el.textContent ?? '').trim().slice(0, 40)}" ${Math.round(rect.width)}x${Math.round(rect.height)}`,
            )
          }
        }
        return small
      })
      expect(tooSmall).toEqual([])
    })
  }
}

test('mobile menu reaches a section', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  const close = await page.getByRole('button', { name: 'Close' }).boundingBox()
  expect(close!.width).toBeGreaterThanOrEqual(40)
  expect(close!.height).toBeGreaterThanOrEqual(40)
  await page
    .getByRole('navigation', { name: 'Mobile' })
    .getByRole('link', { name: 'Projects' })
    .click()
  await expect(page).toHaveURL(/#projects$/)
})
