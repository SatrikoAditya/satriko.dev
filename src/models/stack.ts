export interface IStackItem {
  name: string
  /** SVG path on a 24×24 viewBox. */
  path: string
  /** Hover colours; `var(--foreground)` where the brand colour would vanish. */
  color: { light: string; dark: string }
}
