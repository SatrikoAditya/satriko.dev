# satriko.dev

My personal site: who I am, where I've worked, what I've built and, soon, what I write. It's deliberately plain, fast and easy to read, so the work comes first. If you'd rather explore, there's a playful version too: a cozy 3D room at [room.satriko.dev](https://room.satriko.dev).

**Live:** [satriko.dev](https://satriko.dev)

## What's on it

| Page | What you'll find |
| --- | --- |
| Home | A short intro with my status, local time in Bogor and contact links, then About, my stack, work experience, featured projects, education, LinkedIn recommendations and my GitHub activity |
| [Projects](https://satriko.dev/projects) | Every project I've shipped, with my role, the tech used and a link where the site is live |
| Writing | Articles written in MDX. The section stays hidden until the first one is published |

Press <kbd>⌘K</kbd> (or <kbd>Ctrl K</kbd>) anywhere to jump to a section, copy my email, download my resume or switch theme.

## What I paid attention to

- **Reading comfort.** One centred column and a Medium-inspired palette in light and dark (it follows your system, with a toggle). Text grows smoothly from 16px on phones to 18px on large screens. Articles are set in a serif for long reads.
- **Every screen size.** Phones, tablets and desktops each get a layout that fits, without sideways scrolling, and every tap target is at least 40px.
- **Accessibility.** Keyboard navigation with visible focus, a skip link, labelled landmarks, text that meets contrast in both themes, and motion that switches off when you ask your system to reduce it.
- **Speed.** Pages are rendered on the server and served as static HTML. Only a handful of small interactive pieces (the theme toggle, mobile menu, clock and ⌘K palette) ship JavaScript. Animations are plain CSS.
- **Search.** Per-page titles, descriptions and share previews, structured data that describes me as a person, a sitemap and a generated social image.
- **Privacy.** Visitor stats come from Vercel Web Analytics, which uses no cookies.

## How it's built

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript
- **Styling:** Tailwind CSS 4, shadcn/ui on Radix, Geist and Source Serif fonts, Lucide and Simple Icons
- **Content:** typed data files for the profile, projects and experience; MDX for articles, with code highlighted at build time by Shiki
- **GitHub activity:** the contribution grid comes from GitHub's GraphQL API and refreshes once a day through incremental static regeneration. If the API is unavailable, the section falls back to a link to my profile.
- **Recommendations:** copied from LinkedIn by hand, since LinkedIn has no public API for them
- **Testing:** Vitest and Testing Library for units; Playwright for end-to-end flows, layout checks at phone, tablet and desktop widths, and axe accessibility audits in both themes
- **Hosting:** Vercel

```text
src/
  app/          routes, metadata, sitemap, robots, icons and OG image
  components/   atoms, molecules, organisms and templates, plus generated shadcn/ui
  content/      everything the site says, including articles/*.mdx
  constants/    site details, navigation and fonts
  hooks/, models/, utils/
e2e/            Playwright specs
```

## Running it locally

You need Node 24 (see `.nvmrc`) and Yarn 1. Run `yarn install` and `yarn dev`, then open <http://localhost:3000>. Copy `.env.example` to `.env.local` and add a GitHub token to see the contribution grid. `yarn test` runs the unit tests and `yarn e2e` the end-to-end suite.
