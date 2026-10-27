import { BASE_ZONE } from '@constants/timezones'

export function formatRange(range: { start: string; end: string }) {
  const f = (ym: string) =>
    new Date(`${ym}-01T00:00:00Z`).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
  return `${f(range.start)} – ${range.end === 'present' ? 'Present' : f(range.end)}`
}

/** "20 Oct 2026", as the day falls in Bogor. */
export function formatDay(iso: string) {
  // en-US month abbreviations ("Sep"), not en-GB, which newer ICU renders as "Sept".
  const parts = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: BASE_ZONE,
  }).formatToParts(new Date(iso))
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value
  return `${part('day')} ${part('month')} ${part('year')}`
}
