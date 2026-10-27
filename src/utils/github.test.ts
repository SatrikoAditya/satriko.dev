// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getContributions, toCalendar, type RawCalendar } from './github'

const raw: RawCalendar = {
  totalContributions: 5,
  weeks: [
    {
      contributionDays: [
        { date: '2026-10-25', contributionCount: 0, contributionLevel: 'NONE' },
        {
          date: '2026-10-26',
          contributionCount: 5,
          contributionLevel: 'FOURTH_QUARTILE',
        },
      ],
    },
  ],
}

afterEach(() => vi.unstubAllGlobals())

describe('toCalendar', () => {
  it('maps GitHub levels to 0–4', () => {
    expect(toCalendar(raw)).toEqual({
      total: 5,
      weeks: [
        [
          { date: '2026-10-25', count: 0, level: 0 },
          { date: '2026-10-26', count: 5, level: 4 },
        ],
      ],
    })
  })
})

describe('getContributions', () => {
  it('returns null without a token and never calls GitHub', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    expect(await getContributions(undefined)).toBeNull()
    expect(fetchMock).not.toHaveBeenCalled()
  })
  it('returns null on an HTTP error, a GraphQL error or a network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    expect(await getContributions('t')).toBeNull()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ errors: [{ message: 'nope' }] }),
      }),
    )
    expect(await getContributions('t')).toBeNull()
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    expect(await getContributions('t')).toBeNull()
  })
  it('asks for the login with the token and caches for a day', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          user: { contributionsCollection: { contributionCalendar: raw } },
        },
      }),
    })
    vi.stubGlobal('fetch', fetchMock)
    const calendar = await getContributions('secret', 'someone')
    expect(calendar?.total).toBe(5)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.github.com/graphql')
    expect(init.headers.Authorization).toBe('bearer secret')
    expect(JSON.parse(init.body).variables).toEqual({ login: 'someone' })
    expect(init.next).toEqual({ revalidate: 86400 })
  })
})
