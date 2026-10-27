import Section from '@components/molecules/Section'

import { about } from '@content/about'

export default function AboutSection() {
  return (
    <Section id="about" label="About">
      <div className="space-y-4 leading-relaxed">
        {about.summary.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  )
}
