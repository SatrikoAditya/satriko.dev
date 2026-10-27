import { describe, expect, it } from 'vitest'

import { articleStructuredData, homeStructuredData } from './structuredData'

describe('homeStructuredData', () => {
  it('describes Satriko as the person behind the site', () => {
    const graph = (
      homeStructuredData() as { '@graph': Record<string, unknown>[] }
    )['@graph']
    const person = graph.find((n) => n['@type'] === 'Person')!
    expect(person).toMatchObject({
      name: 'Satriko Aditya',
      alternateName: 'Satriko',
      jobTitle: 'Full Stack Software Engineer',
      url: 'https://satriko.dev',
      worksFor: { '@type': 'Organization', name: 'Jitera' },
    })
    expect(person.sameAs).toEqual([
      'https://www.linkedin.com/in/satriko-aditya-0313631ab/',
      'https://github.com/SatrikoAditya',
      'https://room.satriko.dev',
    ])
    expect((person.alumniOf as { name: string }[]).map((o) => o.name)).toEqual([
      'BINUS (Bina Nusantara) University',
      'Hacktiv8',
    ])
    expect(graph.map((n) => n['@type'])).toEqual([
      'WebSite',
      'ProfilePage',
      'Person',
    ])
  })
})

describe('articleStructuredData', () => {
  it('describes an article as a BlogPosting by Satriko', () => {
    expect(
      articleStructuredData({
        slug: 'hi',
        title: 'Hi',
        date: '2026-10-27',
        summary: 'S',
        tags: ['x'],
        draft: false,
      }),
    ).toMatchObject({
      '@type': 'BlogPosting',
      headline: 'Hi',
      datePublished: '2026-10-27',
      url: 'https://satriko.dev/writing/hi',
      author: { '@type': 'Person', name: 'Satriko Aditya' },
      keywords: ['x'],
    })
  })
})
