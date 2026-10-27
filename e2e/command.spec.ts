import { expect, test } from '@playwright/test'

test('⌘K navigates and switches theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  await page.keyboard.press('ControlOrMeta+k')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.type('All projects')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('dialog')).toBeHidden()
  await page.keyboard.press('ControlOrMeta+k')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.type('Switch to dark')
  await page.keyboard.press('Enter')
  await expect(page.locator('html')).toHaveClass(/dark/)
})
