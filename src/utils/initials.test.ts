import { describe, expect, it } from 'vitest'

import { initials } from './initials'

describe('initials', () => {
  it('takes the first letter of the first two words', () => {
    expect(initials('Amjad Ali')).toBe('AA')
    expect(initials('Gilang Pratama Putra')).toBe('GP')
    expect(initials('cher')).toBe('C')
  })
})
