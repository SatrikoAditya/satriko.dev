export interface IArticle {
  slug: string
  title: string
  /** YYYY-MM-DD */
  date: string
  summary: string
  tags: string[]
  /** Drafts show in `yarn dev` only. */
  draft: boolean
}
