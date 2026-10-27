import RecommendationCard from '@components/molecules/RecommendationCard'
import Section from '@components/molecules/Section'

import { linkedinRecommendationsUrl } from '@constants/site'
import { recommendations } from '@content/recommendations'

export default function RecommendationsSection() {
  return (
    <Section
      id="recommendations"
      label="Recommendations"
      action={
        <a
          href={linkedinRecommendationsUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-brand text-sm font-medium transition-colors"
        >
          View on LinkedIn ↗
        </a>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {recommendations.map((r) => (
          <RecommendationCard key={r.id} recommendation={r} />
        ))}
      </div>
    </Section>
  )
}
