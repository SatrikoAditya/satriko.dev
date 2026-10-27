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
