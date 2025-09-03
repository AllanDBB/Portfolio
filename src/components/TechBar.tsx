interface Props {
  tech?: string[]
  imageUrl?: string
  title?: string
}

export function TechBar({ tech, imageUrl, title = 'Technologies' }: Props) {
  return (
    <section className="mt-3">
      <h3 className="mb-2 text-sm font-medium text-neutral-200 drop-shadow-sm">{title}</h3>
      <div className="px-0 py-0">
        {imageUrl ? (
          // framed pill with soft gradient border
          <div className="gradient-frame soft-shadow">
            <div className="pill-inner px-4 py-2 flex items-center justify-center">
              <img
                src={imageUrl}
                alt="Technologies"
                className="mx-auto h-10 sm:h-12 md:h-14 object-contain max-w-full"
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
