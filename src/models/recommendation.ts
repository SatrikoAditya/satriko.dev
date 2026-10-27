export interface IRecommendation {
  id: string
  name: string
  headline: string
  /** How LinkedIn describes the relationship. */
  relationship: string
  /** YYYY-MM-DD */
  date: string
  paragraphs: readonly string[]
}
