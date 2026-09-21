import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { Container } from '../components/primitives'

export default function NotFound() {
  const { t } = useI18n()

  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <span className="index-num">404</span>
      <h1 className="display mt-4 text-[clamp(2.5rem,8vw,6rem)]">{t('common.notFound')}</h1>
      <p className="prose-body mt-4 max-w-md">{t('common.notFoundLead')}</p>
      <Link
        to="/"
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-jade px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-on-jade transition-opacity hover:opacity-90"
      >
        {t('common.goHome')} →
      </Link>
    </Container>
  )
}
