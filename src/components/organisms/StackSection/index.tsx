import type { CSSProperties } from 'react'

import BrandIcon from '@components/atoms/BrandIcon'
import Section from '@components/molecules/Section'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { stack } from '@content/stack'

export default function StackSection() {
  return (
    <Section id="stack" label="Stack">
      <TooltipProvider delayDuration={150}>
        <ul className="grid grid-cols-8 gap-y-5 md:flex md:justify-between">
          {stack.map((item) => (
            <li key={item.name} className="justify-self-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    tabIndex={0}
                    role="img"
                    aria-label={item.name}
                    style={
                      {
                        '--logo-light': item.color.light,
                        '--logo-dark': item.color.dark,
                      } as CSSProperties
                    }
                    className="text-foreground/70 block rounded-sm transition duration-200 ease-out hover:text-(--logo-light) focus-visible:text-(--logo-light) motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-110 dark:hover:text-(--logo-dark) dark:focus-visible:text-(--logo-dark)"
                  >
                    <BrandIcon path={item.path} className="size-7" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>{item.name}</TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </TooltipProvider>
    </Section>
  )
}
