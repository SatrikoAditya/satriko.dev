export const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Writing', href: '/writing' },
] as const

export const writingHref = '/writing'

// Writing only has somewhere to go once an article is published.
export const visibleNavLinks = (hasArticles: boolean) =>
  navLinks.filter((link) => hasArticles || link.href !== writingHref)
