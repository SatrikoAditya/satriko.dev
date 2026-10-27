export interface IAbout {
  name: string
  title: string
  location: string
  /** One line under the title in the hero. */
  pitch: string
  /** Shown as separate paragraphs in About. */
  summary: readonly string[]
}
