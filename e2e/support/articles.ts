import { readArticles } from '../../src/utils/articles'

// Mirrors the production build: drafts are left out, so this is true only once
// an article without `draft: true` exists in src/content/articles.
// The specs read the same folder the build did, so run them against a build of
// the current checkout.
export const hasPublishedArticles = readArticles(undefined, false).length > 0
