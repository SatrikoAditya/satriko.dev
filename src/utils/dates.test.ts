import { describe, expect, it } from 'vitest'

import { formatDay, formatRange } from './dates'

describe('formatRange', () => {
  it('formats open and closed ranges', () => {
    expect(formatRange({ start: '2024-10', end: 'present' })).toBe(
      'Oct 2024 – Present',
    )
    expect(formatRange({ start: '2022-01', end: '2024-10' })).toBe(
      'Jan 2022 – Oct 2024',
    )
  })
})

describe('formatDay', () => {
  it('formats a day in Bogor time', () => {
    expect(formatDay('2024-08-15')).toBe('15 Aug 2024')
    expect(formatDay('2026-10-20T12:00:00Z')).toBe('20 Oct 2026')
    // 20:00 UTC is already the next day in Bogor (UTC+7).
    expect(formatDay('2026-10-20T20:00:00Z')).toBe('21 Oct 2026')
  })

  it('abbreviates September as "Sep" on every ICU version', () => {
    expect(formatDay('2024-09-30')).toBe('30 Sep 2024')
  })
})
