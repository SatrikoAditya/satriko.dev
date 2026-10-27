/** A brand's hover colour per theme, swapping in the text colour where the brand colour would vanish. */
export function brandColor(hex: string): { light: string; dark: string } {
  const [r, g, b] = [0, 2, 4].map(
    (i) => parseInt(hex.slice(i, i + 2), 16) / 255,
  )
  const lightness = 0.2126 * r + 0.7152 * g + 0.0722 * b
  const color = `#${hex}`
  return {
    light: lightness > 0.85 ? 'var(--foreground)' : color,
    dark: lightness < 0.25 ? 'var(--foreground)' : color,
  }
}
