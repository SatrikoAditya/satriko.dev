'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowUpRight,
  Copy,
  Download,
  FileText,
  Hash,
  Search,
  SunMoon,
} from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import { navLinks } from '@constants/navigation'
import { site } from '@constants/site'

export default function CommandPalette({
  articles,
}: {
  articles: readonly { slug: string; title: string }[]
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const run = (action: () => void) => {
    setOpen(false)
    action()
  }
  const go = (href: string) => run(() => router.push(href))
  const visit = (url: string) =>
    run(() => window.open(url, '_blank', 'noopener,noreferrer'))
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setOpen(false)
      }, 900)
    } catch {
      run(() => window.open(`mailto:${site.email}`))
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        aria-label="Open command menu, ⌘K"
        aria-keyshortcuts="Meta+K Control+K"
        className="text-muted-foreground h-10 min-w-10 gap-2"
      >
        <Search className="size-3.5" />
        <kbd className="hidden font-mono text-xs sm:inline">⌘K</kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command menu"
        description="Jump to a section, an article or an action"
        className="**:data-[slot=command-input-wrapper]:pr-12 **:data-[slot=dialog-close]:top-1 **:data-[slot=dialog-close]:right-1 **:data-[slot=dialog-close]:flex **:data-[slot=dialog-close]:size-10 **:data-[slot=dialog-close]:items-center **:data-[slot=dialog-close]:justify-center"
      >
        <CommandInput
          placeholder="Type a command or search…"
          className="text-base md:text-sm"
        />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Go to">
            <CommandItem onSelect={() => go('/')}>
              <Hash />
              Home
            </CommandItem>
            {navLinks.map((link) => (
              <CommandItem key={link.href} onSelect={() => go(link.href)}>
                <Hash />
                {link.label}
              </CommandItem>
            ))}
            <CommandItem onSelect={() => go('/projects')}>
              <Hash />
              All projects
            </CommandItem>
            <CommandItem onSelect={() => go('/#contact')}>
              <Hash />
              Contact
            </CommandItem>
          </CommandGroup>
          {articles.length > 0 && (
            <CommandGroup heading="Articles">
              {articles.map((a) => (
                <CommandItem
                  key={a.slug}
                  onSelect={() => go(`/writing/${a.slug}`)}
                >
                  <FileText />
                  {a.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading="Actions">
            <CommandItem onSelect={copyEmail}>
              <Copy />
              {copied ? 'Copied!' : 'Copy email'}
            </CommandItem>
            <CommandItem onSelect={() => visit(site.linkedin)}>
              <ArrowUpRight />
              LinkedIn
            </CommandItem>
            <CommandItem onSelect={() => visit(site.github)}>
              <ArrowUpRight />
              GitHub
            </CommandItem>
            <CommandItem onSelect={() => visit(site.resumePdf)}>
              <Download />
              Download résumé
            </CommandItem>
            <CommandItem
              onSelect={() =>
                run(() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'))
              }
            >
              <SunMoon />
              Switch to {resolvedTheme === 'dark' ? 'light' : 'dark'} theme
            </CommandItem>
            <CommandItem onSelect={() => visit(site.roomUrl)}>
              <ArrowUpRight />
              Visit the room
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
