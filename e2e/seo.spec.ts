import { expect, test } from '@playwright/test'

test('home has the name in title, canonical and Person data', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page).toHaveTitle(
    'Satriko Aditya · Full Stack Software Engineer',
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /^https:\/\/satriko\.dev\/?$/,
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
  const graph = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent())!,
  )['@graph']
  expect(
    graph.find((n: { '@type': string }) => n['@type'] === 'Person').name,
  ).toBe('Satriko Aditya')
})

test('subpages keep their own canonical and the OG image', async ({ page }) => {
  for (const path of ['/projects', '/writing']) {
    await page.goto(path)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://satriko.dev${path}`,
    )
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
  }
})

test('each page has its own social title', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Satriko Aditya · Full Stack Software Engineer',
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
  await page.goto('/projects')
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Projects · Satriko Aditya',
  )
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    'content',
    'Projects · Satriko Aditya',
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
})

test('sitemap and robots are served', async ({ request }) => {
  expect(await (await request.get('/sitemap.xml')).text()).toContain(
    'https://satriko.dev/projects',
  )
  expect(await (await request.get('/robots.txt')).text()).toContain(
    'Sitemap: https://satriko.dev/sitemap.xml',
  )
})
