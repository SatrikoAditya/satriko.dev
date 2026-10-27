import { Geist, Geist_Mono, Source_Serif_4 } from 'next/font/google'

export const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})
// Only article pages use the serif, so don't preload it on every page.
export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
  preload: false,
})
