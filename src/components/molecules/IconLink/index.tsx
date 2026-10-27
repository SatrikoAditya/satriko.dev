import BrandIcon from '@components/atoms/BrandIcon'

export default function IconLink({
  href,
  label,
  path,
}: {
  href: string
  label: string
  path: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="text-muted-foreground hover:text-foreground hover:bg-accent inline-grid size-10 place-items-center rounded-full transition-colors"
    >
      <BrandIcon path={path} className="size-4" />
    </a>
  )
}
