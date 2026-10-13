import { useI18n } from '../i18n'
import { Pill, Split } from '../components/primitives'
import { SignalField } from '../components/SignalField'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-[var(--gutter)] pb-16">
      <div className="absolute inset-0 opacity-50">
        <SignalField />
      </div>
      <div className="relative">
        <p className="label">404 · {t('common.notFound')}</p>
        <h1 className="display h-xl mt-6">
          <Split text="404" />
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted">{t('common.notFoundLead')}</p>
        <div className="mt-8">
          <Pill to="/" solid>
            {t('common.goHome')}
          </Pill>
        </div>
      </div>
    </section>
  )
}
