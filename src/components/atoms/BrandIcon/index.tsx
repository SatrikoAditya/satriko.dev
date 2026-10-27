export default function BrandIcon({
  path,
  title,
  className = 'size-4',
}: {
  path: string
  title?: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      <path d={path} />
    </svg>
  )
}
