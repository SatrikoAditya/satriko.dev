import type { IRecommendation } from '@models/recommendation'

// Copied by hand from LinkedIn (there is no public API for recommendations).
// Paste the full text from LinkedIn's "Recommendations → Received" when it changes.
export const recommendations: readonly IRecommendation[] = [
  {
    id: 'amjad-ali',
    name: 'Amjad Ali',
    headline:
      'Senior AI Engineer leveraging Full-Stack Development for innovative solutions',
    relationship: 'Worked with Satriko on the same team',
    date: '2024-09-30',
    paragraphs: [
      'I had the pleasure of working closely with Satriko at CharCentric, where we collaborated on multiple projects as Software Engineers. Satriko consistently demonstrated excellent technical skills and a deep understanding of software development. His contributions to key projects like RMG LMS, AI Dashboard Apps, and the APCO UI Library were invaluable.',
      "Satriko's ability to solve complex problems efficiently and his collaborative approach ensured the success of every project we worked on.",
    ],
  },
  {
    id: 'gilang-pratama',
    name: 'Gilang Pratama',
    headline: 'Software Engineer at Samsung',
    relationship: 'Worked with Satriko on the same team',
    date: '2024-08-15',
    paragraphs: [
      "I had the pleasure of working with Satriko Aditya, and I can confidently say that he is one of the best colleagues I've ever had. Satriko's humbleness and willingness to learn are truly commendable. He consistently went above and beyond, consistently devoting his time to ensure the success of our projects. His kindness is unmatched, he was always there to lend a helping hand whenever I needed support.",
      'Working with Satriko was not just professionally rewarding but also personally uplifting.',
    ],
  },
]
