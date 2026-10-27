import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const path of ['/', '/projects', '/writing']) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`axe: ${path} (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme })
      await page.goto(path)
      // Axe reads the colours it sees, so let the hero fade-up finish first.
      await page.evaluate(() =>
        Promise.all(
          document
            .getAnimations()
            .filter((a) => a.timeline instanceof DocumentTimeline)
            .map((a) => a.finished),
        ),
      )
      const results = await new AxeBuilder({ page }).analyze()
      expect(
        results.violations.filter(
          (v) => v.impact === 'serious' || v.impact === 'critical',
        ),
      ).toEqual([])
    })
  }
}
