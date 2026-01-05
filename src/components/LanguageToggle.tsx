import { useI18n } from '../i18n'
import type { Locale } from '../types'

export function LanguageToggle() {
  const { locale, setLocale } = useI18n()

  const btn = (code: Locale, label: string) => (
    <button
      onClick={() => setLocale(code)}
      className={
        'px-3 py-1.5 rounded-full text-xs font-medium transition-all ' +
        (locale === code 
            ? 'bg-[color:var(--text)] text-[color:var(--bg)] shadow-md' 
            : 'text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--bg-alt)]')
      }
      aria-pressed={locale === code}
    >
      {label}
    </button>
  )

  return (
    <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[color:var(--border)] shadow-sm">
      {btn('es', 'ES')}
      {btn('en', 'EN')}
    </div>
  )
}
