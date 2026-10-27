import Image from 'next/image'

export default function CompanyChip({
  name,
  logo,
}: {
  name: string
  logo: string | null
}) {
  return (
    <span className="group/company border-border inline-flex items-center gap-1.5 rounded-md border px-1.5 py-0.5 align-middle text-sm">
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={16}
          height={16}
          className="size-4 rounded-sm object-contain grayscale transition duration-300 group-hover/company:grayscale-0 motion-safe:group-hover/company:scale-110"
        />
      ) : (
        <span
          aria-hidden="true"
          className="bg-secondary group-hover/company:bg-brand grid size-4 place-items-center rounded-sm font-mono text-[10px] transition duration-300 group-hover/company:text-white motion-safe:group-hover/company:scale-110"
        >
          {name[0]}
        </span>
      )}
      {name}
    </span>
  )
}
