import type { ReactNode } from 'react'

import { cn } from '@components/shadcn/utils'

export default function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[640px] px-6', className)}>
      {children}
    </div>
  )
}
