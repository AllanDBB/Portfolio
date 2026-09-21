import { useI18n } from '../i18n'
import { research } from '../content'
import { Container, Reveal } from '../components/primitives'
import { ResearchCard } from '../components/cards'
import { PageHead } from './Work'

export default function Research() {
  const { t } = useI18n()

  const order = { paper: 0, line: 1, experiment: 2 } as const
  const sorted = [...research].sort((a, b) => order[a.kind] - order[b.kind])

  return (
    <Container className="pt-12">
      <Reveal>
        <PageHead label={t('nav.research')} title={t('research.title')} lead={t('research.lead')} />
      </Reveal>

      <div className="mt-4">
        {sorted.map((item, i) => (
          <Reveal key={item.id} delay={Math.min(i, 4) * 60}>
            <ResearchCard item={item} index={i} />
          </Reveal>
        ))}
      </div>
    </Container>
  )
}
