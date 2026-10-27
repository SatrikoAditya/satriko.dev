import 'server-only'

import { site } from '@constants/site'

export type ContributionLevel = 0 | 1 | 2 | 3 | 4
export interface IContributionDay {
  date: string
  count: number
  level: ContributionLevel
}
export interface IContributionCalendar {
  total: number
  /** Sunday-first weeks, oldest first, as GitHub returns them. */
  weeks: IContributionDay[][]
}

type RawLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE'
export interface RawCalendar {
  totalContributions: number
  weeks: {
    contributionDays: {
      date: string
      contributionCount: number
      contributionLevel: RawLevel
    }[]
  }[]
}

const LEVELS: Record<RawLevel, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`

export function toCalendar(raw: RawCalendar): IContributionCalendar {
  return {
    total: raw.totalContributions,
    weeks: raw.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVELS[day.contributionLevel],
      })),
    ),
  }
}

/** The last year of contributions, refreshed daily; null when the token is missing or GitHub fails. */
export async function getContributions(
  token = process.env.GITHUB_TOKEN,
  login: string = site.githubLogin,
): Promise<IContributionCalendar | null> {
  if (!token) return null
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const json = await res.json()
    const raw = json?.data?.user?.contributionsCollection?.contributionCalendar
    return raw ? toCalendar(raw) : null
  } catch {
    return null
  }
}
