import type { ReactNode } from 'react'

import Providers from '@components/templates/providers'

import { geistMono, geistSans, sourceSerif } from '@constants/fonts'

import '@styles/globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
