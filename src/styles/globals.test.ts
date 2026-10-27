import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(join(process.cwd(), 'src/styles/globals.css'), 'utf8')
const block = (selector: string) => {
  const start = css.indexOf(`${selector} {`)
  return css.slice(start, css.indexOf('}', start))
}

describe('theme tokens', () => {
  it('uses the Medium-inspired light palette', () => {
    const root = block(':root')
    for (const [token, hex] of [
      ['--background', '#ffffff'],
      ['--foreground', '#242424'],
      ['--muted-foreground', '#6b6b6b'],
      ['--border', '#f2f2f2'],
      ['--card', '#ffffff'],
      ['--primary', '#191919'],
      ['--brand', '#1a8917'],
    ])
      expect(root).toContain(`${token}: ${hex};`)
  })
  it('uses the dark palette under .dark', () => {
    const dark = block('.dark')
    for (const [token, hex] of [
      ['--background', '#121212'],
      ['--foreground', '#e6e6e6'],
      ['--muted-foreground', '#a8a8a8'],
      ['--border', '#2a2a2a'],
      ['--card', '#1a1a1a'],
      ['--primary', '#f2f2f2'],
      ['--brand', '#3fb24f'],
    ])
      expect(dark).toContain(`${token}: ${hex};`)
  })
  it('only animates when the visitor allows motion', () => {
    const motion = css.slice(
      css.indexOf('@media (prefers-reduced-motion: no-preference)'),
    )
    expect(motion).toContain('.hero-in')
    expect(motion).toContain('.reveal')
    expect(css.indexOf('.reveal')).toBeGreaterThan(
      css.indexOf('@media (prefers-reduced-motion: no-preference)'),
    )
  })
})
