import type { ReactNode } from 'react'

import SectionLabel from '@components/atoms/SectionLabel'

export default function Section({
  id,
  label,
  action,
  children,
}: {
  id: string
  label: string
  /** A link shown on the right of the label, e.g. "View all". */
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="reveal py-12">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <SectionLabel id={`${id}-label`}>{label}</SectionLabel>
        {action}
      </div>
      {children}
    </section>
  )
}
