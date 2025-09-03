import type { Stat } from '../types'

export function StatsPanel({ title = 'Stats', stats }: { title?: string; stats: Stat[] }) {
  return (
    <aside className="sticky top-4 space-y-3">
      <div className="rounded-xl p-4 card">
        <h2 className="text-xs uppercase tracking-wide mb-3" style={{color:'var(--muted)'}}>{title}</h2>
        <ul className="space-y-2">
          {stats.map((s) => (
            <li key={s.label} className="flex justify-between gap-4">
              <span style={{color:'var(--muted)'}} className="inline-flex items-center gap-2">
                {s.icon ? <span aria-hidden className="text-base leading-none">{s.icon}</span> : null}
                {s.label}
              </span>
              <span className="font-semibold">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
