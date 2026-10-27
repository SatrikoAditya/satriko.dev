import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const path of ['/', '/projects', '/writing']) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`axe: ${path} (${colorScheme})`, async ({ page }) => {
      // Reduced motion renders every section in its final state, so axe checks them all.
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
      await page.goto(path)
      const results = await new AxeBuilder({ page }).analyze()
      expect(
        results.violations.filter(
          (v) => v.impact === 'serious' || v.impact === 'critical',
        ),
      ).toEqual([])
    })
  }
}
