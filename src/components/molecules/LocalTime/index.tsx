'use client'

import { useBogorTime } from '@hooks/useBogorTime'

import { site } from '@constants/site'
import { formatHHMM } from '@utils/time'

/** The server can't know the visitor's "now", so the time appears after hydration. */
export default function LocalTime() {
  const time = useBogorTime()
  return (
    <p className="text-muted-foreground font-mono text-xs">
      {site.location} ·{' '}
      <time aria-label="Local time in Bogor">
        {time ? formatHHMM(time) : '--:--'}
      </time>{' '}
      (UTC+7)
    </p>
  )
}
