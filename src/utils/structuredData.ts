import { site } from '@constants/site'
import { education } from '@content/education'
import { jobs } from '@content/experience'
import { stack } from '@content/stack'
import type { IArticle } from '@models/article'

const personId = `${site.url}/#person`

export function homeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}/#profile`,
        url: site.url,
        name: `${site.name} · ${site.title}`,
        mainEntity: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        alternateName: site.shortName,
        jobTitle: site.title,
        url: site.url,
        email: `mailto:${site.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bogor',
          addressCountry: 'ID',
        },
        worksFor: {
          '@type': 'Organization',
          name: jobs.find((j) => j.end === 'present')?.company,
        },
        alumniOf: education
          .filter((e) => e.kind !== 'school')
          .map((e) => ({
            '@type': 'EducationalOrganization',
            name: e.institution,
          })),
        knowsAbout: stack.map((s) => s.name),
        sameAs: [site.linkedin, site.github, site.roomUrl],
      },
    ],
  }
}

export function articleStructuredData(article: IArticle) {
  const url = `${site.url}/writing/${article.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    url,
    mainEntityOfPage: url,
    keywords: article.tags,
    author: { '@type': 'Person', name: site.name, url: site.url },
  }
}
