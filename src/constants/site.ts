export const site = {
  name: 'Satriko Aditya',
  shortName: 'Satriko',
  title: 'Full Stack Software Engineer',
  location: 'Bogor, Indonesia',
  email: 'satrikoaditya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/satriko-aditya-0313631ab/',
  github: 'https://github.com/SatrikoAditya',
  githubLogin: 'SatrikoAditya',
  url: 'https://satriko.dev',
  roomUrl: 'https://room.satriko.dev',
  resumePdf: '/resume/Satriko-Aditya-Resume.pdf',
  description:
    'Satriko Aditya is a Full Stack Software Engineer in Bogor, Indonesia, building fast web and mobile apps with TypeScript, React, Next.js and NestJS.',
} as const

/** Bump when the home page or project content changes; the sitemap's lastModified for / and /projects. */
export const contentUpdated = '2026-10-31'

export const linkedinRecommendationsUrl = `${site.linkedin}details/recommendations/`
