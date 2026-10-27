import type { ReactNode } from 'react'

export default function SectionLabel({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  return (
    <h2
      id={id}
      className="text-muted-foreground font-mono text-xs tracking-widest uppercase"
    >
      {children}
    </h2>
  )
}
