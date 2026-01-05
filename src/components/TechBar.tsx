interface Props {
  tech?: string[]
  imageUrl?: string
  title?: string
}

export function TechBar({ tech, imageUrl, title = 'Technologies' }: Props) {
  return (
    <section className="mt-8">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[color:var(--muted)]">{title}</h3>
      <div className="px-0 py-0">
        {imageUrl ? (
          // framed pill with simple border
          <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] soft-shadow overflow-hidden">
            <div className="px-6 py-5 flex items-center justify-center">
              <img
                src={imageUrl}
                alt="Technologies"
                className="mx-auto h-12 sm:h-14 md:h-16 object-contain max-w-full"
              />
            </div>
          </div>
        ) : (
          // keep icons in a single row, allow horizontal scroll on smaller screens
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-1">
            {tech?.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs chip flex-shrink-0"
              >
                <span className="size-2 rounded-full flex-shrink-0" style={{background:'var(--accent)'}} />
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
