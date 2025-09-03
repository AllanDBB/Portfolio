export interface Startup {
  id: string
  name: string
  role?: string
  summary: string
  link?: string
  logoUrl?: string
}

export function StartupsSection({ items, title = 'Startups', seeAllLabel = 'See all' }: { items: Startup[]; title?: string; seeAllLabel?: string }) {
  return (
    <section className="mt-6">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a href="#" className="text-sm" style={{color:'var(--accent)'}}>{seeAllLabel}</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((s) => (
          <a key={s.id} href={s.link ?? '#'} target={s.link ? '_blank' : undefined} rel={s.link ? 'noreferrer' : undefined} className="rounded-xl card p-4 transition hover:translate-y-[-2px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-14 rounded-md overflow-hidden flex-shrink-0" style={{background:'#f0efee'}}>
                {s.logoUrl ? <img src={s.logoUrl} alt={s.name} className="w-full h-full object-contain" /> : null}
              </div>
              <div>
                <div className="font-medium">{s.name}</div>
                {s.role ? <div className="text-sm" style={{color:'var(--muted)'}}>{s.role}</div> : null}
              </div>
            </div>
            <p className="text-sm" style={{color:'var(--muted)'}}>{s.summary}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
