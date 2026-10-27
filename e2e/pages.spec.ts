import { expect, test } from '@playwright/test'

test('/projects lists all seven projects', async ({ page }) => {
  await page.goto('/projects')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Projects' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(7)
})

test('/writing renders', async ({ page }) => {
  await page.goto('/writing')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Writing' }),
  ).toBeVisible()
})

test('unknown pages 404', async ({ page }) => {
  const res = await page.goto('/nope')
  expect(res?.status()).toBe(404)
  await expect(page.getByText("This page doesn't exist")).toBeVisible()
})
