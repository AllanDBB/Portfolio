interface TabDef { id: string; label: string; icon?: string }

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: TabDef[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className="relative group">
        {/* ScrollFade Indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[color:var(--bg-alt)] to-transparent pointer-events-none z-10 opacity-0 transition-opacity" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[color:var(--bg-alt)] to-transparent pointer-events-none z-10" />

        <div className="flex items-center gap-6 border-b border-[color:var(--border)] overflow-x-auto flex-nowrap pb-0 scrollbar-hide">
        {tabs.map((t) => {
            const isActive = t.id === active
            return (
            <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={
                'relative pb-3 text-sm font-medium transition-all whitespace-nowrap outline-none select-none ' +
                (isActive
                    ? 'text-[color:var(--accent)]'
                    : 'text-[color:var(--muted)] hover:text-[color:var(--text)]')
                }
            >
                {t.label}
                {/* Active Indicator */}
                {isActive && (
                    <span 
                        className="absolute bottom-0 left-0 w-full h-[3px] bg-[color:var(--accent)] rounded-t-full" 
                        // layoutId for smooth transition if using framer-motion, but pure CSS is fine for now
                    />
                )}
            </button>
            )
        })}
        </div>
    </div>
  )
}
