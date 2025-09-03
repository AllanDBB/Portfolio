import { useI18n } from '../i18n'
import type { Locale } from '../types'

export function LanguageToggle() {
  const { locale, setLocale } = useI18n()

  const btn = (code: Locale, label: string) => (
    <button
      onClick={() => setLocale(code)}
      className={
        'px-2 py-1 rounded-full text-xs transition ' +
        (locale === code ? 'card font-medium' : 'chip hover:opacity-90')
      }
      aria-pressed={locale === code}
    >
      {label}
    </button>
  )

  return (
    <div className="flex items-center gap-2">
      {btn('es', 'ES')}
      {btn('en', 'EN')}
    </div>
  )
}
