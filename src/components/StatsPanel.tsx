import type { Stat } from '../types'

export function StatsPanel({ title = 'Stats', stats }: { title?: string; stats: Stat[] }) {
  return (
    <aside className="sticky top-4 space-y-3">
      <div className="rounded-xl p-4 card">
        <h2 className="text-xs uppercase tracking-wide mb-3" style={{color:'var(--muted)'}}>{title}</h2>
        <ul className="space-y-2">
          {stats.map((s) => {
            // Determine proficiency level (1-5) based on keywords in value string
            // "Nativo" -> 5, "Profesional" -> 4, "Intermedio" -> 3, "Básico" -> 2, "Empezando" -> 1
            let level = 1
            const v = s.value.toLowerCase()
            if (v.includes('natim')) level = 5 // Typo in source? Handle "Nativo"
            else if (v.includes('nativ')) level = 5
            else if (v.includes('profes')) level = 4
            else if (v.includes('fluent')) level = 4
            else if (v.includes('interm')) level = 3
            else if (v.includes('básic') || v.includes('basic')) level = 2
            
            return (
            <li key={s.label} className="flex flex-col gap-1.5 py-1">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-[color:var(--text)] inline-flex items-center gap-2">
                    {s.icon ? <span aria-hidden className="text-base leading-none opacity-80">{s.icon}</span> : null}
                    {s.label}
                </span>
                <span className="text-xs text-[color:var(--muted)] font-medium">{s.value}</span>
              </div>
              {/* Progress dots */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                        key={i} 
                        className={`h-1.5 flex-1 rounded-full transition-colors ${i <= level ? 'bg-[color:var(--accent)]' : 'bg-[color:var(--border)]'}`}
                    />
                ))}
              </div>
            </li>
          )})}
        </ul>
      </div>
    </aside>
  )
}
