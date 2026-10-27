import { describe, expect, it } from 'vitest'

import { formatHHMM, zonedTime } from './time'

describe('zonedTime', () => {
  it('converts to Bogor time (UTC+7)', () => {
    expect(zonedTime(new Date('2026-10-27T09:20:05Z'), 'Asia/Jakarta')).toEqual(
      { h: 16, m: 20, s: 5 },
    )
  })
  it('wraps past midnight', () => {
    expect(zonedTime(new Date('2026-10-27T17:05:00Z'), 'Asia/Jakarta').h).toBe(
      0,
    )
  })
})

describe('formatHHMM', () => {
  it('zero-pads', () => {
    expect(formatHHMM({ h: 7, m: 5, s: 0 })).toBe('07:05')
  })
})
