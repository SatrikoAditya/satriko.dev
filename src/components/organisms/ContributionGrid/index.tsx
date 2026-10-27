import type { IContributionCalendar } from '@utils/github'

const CELL = 9
const GAP = 2
const STEP = CELL + GAP
// Literal class names so Tailwind generates them.
const LEVEL_CLASS = [
  'fill-gh-0',
  'fill-gh-1',
  'fill-gh-2',
  'fill-gh-3',
  'fill-gh-4',
] as const

export default function ContributionGrid({
  calendar,
}: {
  calendar: IContributionCalendar
}) {
  const width = calendar.weeks.length * STEP - GAP
  const height = 7 * STEP - GAP
  return (
    // rtl makes the scroll start at the newest weeks on narrow screens.
    <div
      dir="rtl"
      role="region"
      aria-label="Contribution graph"
      tabIndex={0}
      className="focus-visible:ring-ring overflow-x-auto rounded-sm pb-2 outline-none focus-visible:ring-2"
    >
      <svg
        style={{ direction: 'ltr' }}
        role="img"
        aria-label={`${calendar.total} contributions in the last year`}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {calendar.weeks.map((week, w) =>
          week.map((day) => (
            <rect
              key={day.date}
              x={w * STEP}
              y={new Date(`${day.date}T00:00:00Z`).getUTCDay() * STEP}
              width={CELL}
              height={CELL}
              rx={2}
              className={LEVEL_CLASS[day.level]}
            >
              <title>{`${day.count} contributions on ${day.date}`}</title>
            </rect>
          )),
        )}
      </svg>
    </div>
  )
}
