import Section from '@components/molecules/Section'
import ContributionGrid from '@components/organisms/ContributionGrid'

import { site } from '@constants/site'
import { getContributions, type IContributionCalendar } from '@utils/github'

export function GithubActivityView({
  calendar,
}: {
  calendar: IContributionCalendar | null
}) {
  return (
    <Section
      id="github"
      label="GitHub activity"
      action={
        calendar && (
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand -my-3 inline-flex min-h-10 items-center font-mono text-xs transition-colors"
          >
            @{site.githubLogin} ↗
          </a>
        )
      }
    >
      {calendar ? (
        <>
          <ContributionGrid calendar={calendar} />
          <p className="text-muted-foreground mt-3 text-sm">
            {calendar.total.toLocaleString('en-US')} contributions in the last
            year
          </p>
        </>
      ) : (
        <p className="text-muted-foreground text-sm">
          See what I&apos;m building on{' '}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:text-brand -my-2.5 inline-flex min-h-10 items-center underline underline-offset-4"
          >
            GitHub →
          </a>
        </p>
      )}
    </Section>
  )
}

export default async function GithubActivity() {
  return <GithubActivityView calendar={await getContributions()} />
}
