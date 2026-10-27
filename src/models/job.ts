export type JobId = 'jitera' | 'charcentric' | 'immobi'
export interface IJob {
  id: JobId
  company: string
  /** Under `public/images/companies/`; null shows the company's initial. */
  logo: string | null
  role: string
  kind: 'full-time' | 'internship'
  location: string
  remote: boolean
  start: string
  end: string | 'present'
  /** One line on what the role was, shown above the highlights. */
  summary?: string
  highlights: string[]
  tools: string[]
}
