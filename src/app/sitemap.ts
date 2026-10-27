import type { MetadataRoute } from 'next'

import { site } from '@constants/site'
import { readArticles } from '@utils/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = readArticles()
  return [
    { url: site.url, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/projects`, changeFrequency: 'monthly', priority: 0.8 },
    {
      url: `${site.url}/writing`,
      lastModified: articles[0]?.date,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articles.map((a) => ({
      url: `${site.url}/writing/${a.slug}`,
      lastModified: a.date,
      priority: 0.6,
    })),
  ]
}
