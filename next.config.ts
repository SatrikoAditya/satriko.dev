import path from 'node:path'
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Pages read the articles folder at runtime (ISR), so keep it in the trace.
  outputFileTracingIncludes: {
    '/*': ['./src/content/articles/**/*'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
  turbopack: {
    root: path.resolve(__dirname),
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

// Turbopack needs plugins as names with serialisable options.
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-gfm'],
    rehypePlugins: [
      [
        'rehype-pretty-code',
        {
          theme: { light: 'github-light', dark: 'github-dark-dimmed' },
          keepBackground: false,
        },
      ],
    ],
  },
})

export default withMDX(nextConfig)
