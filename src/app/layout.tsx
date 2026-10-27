import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'

import SiteFooter from '@components/organisms/SiteFooter'
import SiteNav from '@components/organisms/SiteNav'
import Providers from '@components/templates/providers'

import { geistMono, geistSans, sourceSerif } from '@constants/fonts'
import { site } from '@constants/site'

import '@styles/globals.css'

const defaultTitle = `${site.name} · ${site.title}`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: site.description,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
}

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
