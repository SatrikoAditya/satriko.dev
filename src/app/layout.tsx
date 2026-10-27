import type { ReactNode } from 'react'

import SiteFooter from '@components/organisms/SiteFooter'
import SiteNav from '@components/organisms/SiteNav'
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
        <Providers>
          <a
            href="#main"
            className="focus:bg-background sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-3 focus:py-2"
          >
            Skip to content
          </a>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  )
}
