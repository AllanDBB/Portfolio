import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { awards, experience, featuredProjects, profile, research } from '../content'
import { ArrowLink, Container, Reveal, SectionHead } from '../components/primitives'
import { ProjectCard } from '../components/cards'

export default function Home() {
  const { t, locale } = useI18n()

  const current = experience.filter((e) => e.end === null)
  const featuredResearch = research.filter((r) => r.featured)

  return (
    <>
      <Hero />

      {/* ---- Two tracks ---- */}
      <Container className="pt-24">
        <Reveal>
          <SectionHead
            label={t('home.twoTracks')}
            title={locale === 'es' ? 'Cómo se conecta' : 'How it connects'}
            lead={profile.intro[locale]}
          />
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
          <TrackPanel
            index="01"
            title={t('home.researchTrack')}
            body={
              locale === 'es'
                ? 'Detección de puntos de cambio y anomalías en señales biomédicas. Benchmarks bajo ruido real, no bajo datos de laboratorio.'
                : 'Change point and anomaly detection in biomedical signals. Benchmarks under real noise, not laboratory data.'
            }
            items={featuredResearch.map((r) => r.title)}
            to="/research"
            cta={t('home.seeAllResearch')}
          />
          <TrackPanel
            index="02"
            title={t('home.engineeringTrack')}
            body={
              locale === 'es'
                ? 'Arquitectura backend, APIs y productos que se despliegan y se miden. Docker, microservicios y rendimiento verificado.'
                : 'Backend architecture, APIs and products that ship and get measured. Docker, microservices and verified performance.'
            }
            items={['Petziclub — backend & arquitectura', 'Colegio Científico de Alajuela', 'GourmetGo · LogiEvents']}
            to="/work"
            cta={t('home.seeAllWork')}
          />
        </div>
      </Container>

      {/* ---- Currently ---- */}
      <Container className="pt-28">
        <Reveal>
          <SectionHead
            label={t('home.currently')}
            title={locale === 'es' ? 'En qué estoy ahora' : 'What I am on now'}
            action={<ArrowLink to="/work">{t('home.seeAllWork')}</ArrowLink>}
          />
        </Reveal>
        <div className="mt-2">
          {current.map((item, i) => (
            <Reveal key={item.id} delay={i * 60}>
              <Link
                to="/work"
                className="row-item flex flex-col gap-2 border-b border-line py-6 md:flex-row md:items-baseline md:gap-8"
              >
                <span className="index-num md:w-12">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-base text-fg">{item.role[locale]}</span>
                <span className="font-mono text-xs text-faint md:w-56">{item.org}</span>
                <span className="font-mono text-xs text-jade">
                  {item.start.split('-')[0]} — {t('work.present')}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* ---- Selected projects ---- */}
      <Container className="pt-28">
        <Reveal>
          <SectionHead
            label={t('home.selectedWork')}
            title={locale === 'es' ? 'Proyectos destacados' : 'Selected projects'}
            action={<ArrowLink to="/projects">{t('home.seeAllProjects')}</ArrowLink>}
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 80}>
              <ProjectCard item={project} />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* ---- Recognition ---- */}
      <Container className="pt-28">
        <Reveal>
          <SectionHead label={t('home.recognition')} title={locale === 'es' ? 'Reconocimientos' : 'Recognition'} />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {awards.map((award, i) => (
            <Reveal key={award.id} delay={i * 80}>
              <div className="card-lift h-full rounded-lg border border-line bg-elev p-6">
                <div className="display text-4xl text-jade/80">{award.year}</div>
                <h3 className="mt-3 text-base font-medium text-fg">{award.title}</h3>
                <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-jade">
                  {award.place[locale]}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{award.summary[locale]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  )
}

/* ------------------------------------------------------------------ */

function Hero() {
  const { t, locale } = useI18n()

  return (
    <section className="relative overflow-hidden">
      {/* Jade atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[70vh] w-[130vw] -translate-x-1/2 opacity-[0.28]"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, var(--c-jade-deep) 0%, transparent 68%)',
        }}
      />

      <Container className="relative pt-16 pb-8 md:pt-24">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-jade" />
          </span>
          <span className="label">{t('hero.available')}</span>
        </div>

        <h1 className="display mt-8 text-[clamp(3rem,10vw,8.5rem)]">
          Allan
          <br />
          Bolaños B.
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="jade-rule" />
            <p className="mt-6 max-w-xl text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.45] text-fg">
              {profile.thesis[locale]}
            </p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">{profile.role[locale]}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <ArrowLink to="/research">{t('nav.research')}</ArrowLink>
              <ArrowLink to="/projects">{t('nav.projects')}</ArrowLink>
              <ArrowLink href="/AllanBolanos_CV.pdf">CV</ArrowLink>
            </div>
          </div>

          <div className="md:col-span-5 md:justify-self-end">
            <dl className="grid grid-cols-2 gap-x-10 gap-y-6 font-mono text-xs">
              <Fact label={locale === 'es' ? 'Ubicación' : 'Location'} value="Costa Rica" />
              <Fact label={locale === 'es' ? 'Formación' : 'Education'} value="TEC · 2027" />
              <Fact
                label={locale === 'es' ? 'Investigación' : 'Research'}
                value={locale === 'es' ? 'Series temporales' : 'Time series'}
              />
              <Fact
                label={locale === 'es' ? 'Ingeniería' : 'Engineering'}
                value={locale === 'es' ? 'Backend · Full-stack' : 'Backend · Full-stack'}
              />
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="mt-1.5 text-sm text-fg">{value}</dd>
    </div>
  )
}

function TrackPanel({
  index,
  title,
  body,
  items,
  to,
  cta,
}: {
  index: string
  title: string
  body: string
  items: string[]
  to: string
  cta: string
}) {
  return (
    <div className="flex flex-col bg-bg p-8 md:p-10">
      <div className="flex items-center gap-3">
        <span className="index-num">{index}</span>
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-fg">{title}</h3>
      </div>
      <p className="prose-body mt-5 text-[0.95rem]">{body}</p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-muted">
            <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-jade/60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ArrowLink to={to}>{cta}</ArrowLink>
      </div>
    </div>
  )
}
