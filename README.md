# satriko.dev

My personal site: who I am, where I've worked, what I've built, and what I write. It's deliberately plain, fast and readable. For the playful version, visit [room.satriko.dev](https://room.satriko.dev).

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui, next-themes, MDX. Tested with Vitest, Testing Library, Playwright and axe. Hosted on Vercel.

## Running it locally

You need Node 24 (see `.nvmrc`) and Yarn 1.

```sh
yarn install
cp .env.example .env.local   # add GITHUB_TOKEN to see the contribution grid
yarn dev
```

| Command | What it does |
| --- | --- |
| `yarn build` / `yarn start` | Build and serve the production site |
| `yarn test` | Unit tests |
| `yarn e2e` | End-to-end and accessibility tests (builds and serves on port 3100) |
| `yarn lint` / `yarn typecheck` | ESLint and TypeScript checks |

## Updating content

Everything the site says lives in `src/content/`:

| File | What it holds |
| --- | --- |
| `about.ts` | Pitch and About paragraphs |
| `experience.ts` | Jobs, each with a `logo` path into `public/images/companies/` (without one, the company's initial is shown) |
| `education.ts`, `projects.ts`, `stack.ts` | The matching sections |
| `recommendations.ts` | LinkedIn recommendations, copied by hand |

When home or project content changes, bump `contentUpdated` in `src/constants/site.ts`. It feeds the sitemap's `lastModified`.

The room project (`personal-project-home-3d`) has its own copy of jobs, education and projects. Update both. Its copy of jobs still lists the IPB internship, which this site no longer shows.

## Writing an article

Add `src/content/articles/<slug>.mdx`:

```mdx
---
title: My article
date: 2026-11-01
summary: One sentence for the list and for search results.
tags: [nextjs]
draft: true
---

Write in Markdown. Code blocks are highlighted at build time.
```

Drafts show only in `yarn dev`. Remove `draft: true`, then commit and push, and Vercel publishes it.

## Launch checklist

1. Vercel: import the repo, set `GITHUB_TOKEN` (a fine-grained token with no extra permissions) in Environment Variables, and add the `satriko.dev` domain. Locally the token lives in `.env.local`, which is git-ignored. Never put it in `.env.example`.
2. Google Search Console: add the `satriko.dev` domain property, verify with the DNS TXT record, submit `https://satriko.dev/sitemap.xml`, and request indexing for `/`.
3. Bing Webmaster Tools: import from Search Console.
4. Set the website field on LinkedIn, the GitHub profile (and its profile README) and other profiles to `https://satriko.dev`.
5. Run Lighthouse on mobile and desktop and aim for 95+ in every category.
6. Vercel: redirect `www.satriko.dev` to `satriko.dev`.
7. Set `GITHUB_TOKEN` for the Production environment too. Preview builds without it show the fallback link instead of the contribution grid.
8. Make sure room.satriko.dev is live at or before launch. The footer, the command palette, the room project card and the Person `sameAs` all link to it.
9. Paste the full LinkedIn recommendation text into `src/content/recommendations.ts`. It currently holds LinkedIn's truncated preview.
10. Check `https://satriko.dev` in Google's Rich Results Test (Person, ProfilePage).
11. Enable Web Analytics in the Vercel project (Analytics tab), then redeploy.
