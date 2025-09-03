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
    <div className="flex items-center gap-2 border-b overflow-x-auto flex-nowrap -mx-4 px-4" style={{ borderColor: 'var(--border)' }}>
      {tabs.map((t) => {
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={
              'relative -mb-px rounded-t-xl px-3 py-2 text-sm transition whitespace-nowrap flex items-center gap-2 ' +
              (isActive
                ? 'card font-medium border-b-transparent'
                : 'text-[color:var(--muted)] hover:text-[color:var(--text)]')
            }
          >
            {t.icon ? (
              <span
                className="inline-flex items-center justify-center tab-bubble"
                style={{ width: isActive ? 32 : 22, height: isActive ? 32 : 22, transition: 'width 150ms ease, height 150ms ease' }}
              >
                <img src={t.icon} alt="" className="w-full h-full object-cover rounded-full" />
              </span>
            ) : null}
            <span>{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
