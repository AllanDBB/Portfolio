import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { awards, companyUrl, experienceByCompany, featuredProjects, profile, projects, research, skillGroups, ventures } from '../content'
import { Arrow, CompanyLogo, Eyebrow, Marquee, Pill, PubChip, Reveal, Roll, SignalCover, Split } from '../components/primitives'
import { SignalField } from '../components/SignalField'
import { CpdDemo } from '../components/CpdDemo'
import { NoddleMocks } from '../components/NoddleMocks'
import { loadGsap } from '../lib/scroll'
import { opt } from '../lib/img'
import { tr } from '../types'

export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceSection />
      <Manifesto />
      <ResearchSection />
      <SelectedWork />
      <Founder />
      <Recognition />
      <StackMarquee />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const { t, locale } = useI18n()
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[44%] md:h-[68%]">
        <SignalField />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(0deg, var(--c-bg) 0%, transparent 30%), linear-gradient(180deg, var(--c-bg) 0%, transparent 18%)' }}
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-end px-[var(--gutter)] pt-28 pb-8 md:justify-between">
        <div className="hero-delay hidden flex-wrap items-start justify-between gap-6 md:flex">
          <Reveal className="label max-w-[16rem]">
            {t('hero.index')}
            <br />
            <span className="text-fg">{profile.role[locale]}</span>
          </Reveal>
          <Reveal className="label text-right" delay={120}>
            09°56′N 84°05′W
            <br />
            San José, Costa Rica
          </Reveal>
        </div>

        <div>
          <h1 className="hero-delay display text-[19vw] md:text-[clamp(3.25rem,13.5vw,15rem)]">
            <Split text="Allan" as="span" className="block" />
            <span className="block pl-[0.06em] md:pl-[8vw]">
              <Split text="Bolaños _B._" />
            </span>
          </h1>

          <div className="hero-delay mt-10 grid items-end gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-5" delay={300}>
              <p className="max-w-md text-[clamp(1.05rem,1.5vw,1.35rem)] leading-snug text-fg">{profile.thesis[locale]}</p>
            </Reveal>
            <Reveal className="flex flex-wrap gap-3 md:col-span-4" delay={420}>
              <Pill to="/research" solid>
                {locale === 'es' ? 'Ver investigación' : 'See research'}
              </Pill>
              <Pill href="/AllanBolanos_CV.pdf">CV</Pill>
            </Reveal>
            <Reveal className="flex items-center justify-between gap-6 md:col-span-3 md:justify-end" delay={520}>
              <span className="label flex items-center gap-2 text-fg">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                {t('hero.available')}
              </span>
              <span className="label flex items-center gap-2">
                {t('hero.scroll')}
                <span className="relative block h-8 w-px overflow-hidden bg-line-strong">
                  <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_var(--ease-in-out-quart)_infinite] bg-fg" />
                </span>
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Manifesto — words light up as they scroll through the viewport.     */
/* ------------------------------------------------------------------ */

function Manifesto() {
  const { t, locale } = useI18n()
  const ref = useRef<HTMLParagraphElement | null>(null)

  const text =
    locale === 'es'
      ? 'Mi foco es la IA y la neuroingeniería. [img] Modelos que leen lo que el cerebro, la voz y el corazón dicen antes de que nadie lo note: memoria para robots que aprenden toda su vida, biomarcadores de ELA en el habla, arritmias antes de que ocurran. No creo en mantenerlo simple: los problemas que valen la pena no lo son.'
      : 'My focus is AI and neuroengineering. [img] Models that read what the brain, the voice and the heart say before anyone notices: memory for robots that learn for a lifetime, ALS biomarkers in speech, arrhythmias before they happen. I do not believe in keeping it simple: the problems worth solving are not.'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = Array.from(el.querySelectorAll<HTMLElement>('.scrub-word'))
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh * 0.92 - r.top) / (r.height + vh * 0.1)))
      const lit = Math.round(p * words.length)
      words.forEach((w, i) => w.classList.toggle('on', i < lit))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [locale])

  return (
    <section className="px-[var(--gutter)] pt-32 pb-24 md:pt-48 md:pb-40">
      <Eyebrow index="02">{t('home.manifesto')}</Eyebrow>
      <p
        ref={ref}
        className="scrub display mt-10 max-w-[22ch] text-[clamp(2rem,5.6vw,5.5rem)] leading-[0.98] tracking-[-0.035em] md:ml-[16.6%]"
      >
        {text.split(' ').map((word, i) =>
          word === '[img]' ? (
            <span
              key={i}
              aria-hidden
              className="mx-[0.12em] inline-block h-[0.8em] w-[1.7em] overflow-hidden rounded-full align-[-0.06em]"
            >
              <img src={opt('/avatars/1.jpg')} alt="" className="h-full w-full object-cover object-[50%_30%]" />
            </span>
          ) : (
            <React.Fragment key={i}>
              <span className="scrub-word">{word}</span>{' '}
            </React.Fragment>
          )
        )}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Research                                                            */
/* ------------------------------------------------------------------ */

function ResearchSection() {
  const { t, locale } = useI18n()
  const paper = research.find((r) => r.kind === 'paper')!
  const others = research.filter((r) => r.kind === 'paper' && r.id !== paper.id)

  return (
    <section className="px-[var(--gutter)] pt-36 md:pt-52">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow index="03">{t('home.research')}</Eyebrow>
          <h2 className="display h-lg mt-6">
            <Split text={t('home.researchTitle')} />
          </h2>
        </div>
        <Pill to="/research">{t('home.seeAllResearch')}</Pill>
      </div>

      <div className="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-signal px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-on-signal">
              {t('research.published')} · {paper.year}
            </span>
            <span className="label">{paper.venue && tr(paper.venue, locale)}</span>
          </div>
          <h3 className="display mt-6 text-[clamp(2rem,3.6vw,3.4rem)] leading-[0.95] tracking-[-0.035em]">{paper.title}</h3>
          <p className="mt-5 text-sm text-muted">{paper.authors}</p>
          <p className="prose-body mt-6 max-w-xl">{paper.abstract[locale]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {paper.links.slice(0, 3).map((l, i) => (
              <Pill key={l.href} href={l.href} solid={i === 0}>
                {l.label}
              </Pill>
            ))}
          </div>
          {paper.doi && <p className="label mt-6">DOI {paper.doi}</p>}
        </Reveal>
        <Reveal className="lg:col-span-6" delay={150}>
          <CpdDemo />
        </Reveal>
      </div>

      <ul className="mt-20 border-t border-line">
        {others.map((r, i) => (
          <Reveal as="li" key={r.id} delay={i * 60}>
            <Link
              to={`/research#${r.id}`}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-3 border-b border-line py-7 md:grid-cols-[9rem_1fr_15rem]"
            >
              <span className="order-2 md:order-none">{r.pub && <PubChip pub={r.pub} />}</span>
              <span className="col-span-2 md:col-span-1">
                <span className="display block text-[clamp(1.35rem,2.3vw,2.2rem)] leading-[1] tracking-[-0.03em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
                  {r.title.split(':')[0]}
                </span>
                {r.authors && <span className="mt-2 block truncate text-sm text-muted">{r.authors}</span>}
              </span>
              <span className="label order-3 md:order-none md:text-right">{r.venue && tr(r.venue, locale).split(' · ')[0]}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Selected work — pinned horizontal gallery on desktop.               */
/* ------------------------------------------------------------------ */

function SelectedWork() {
  const { t, locale } = useI18n()
  const section = useRef<HTMLElement | null>(null)
  const track = useRef<HTMLDivElement | null>(null)

  // Layout effect: GSAP must unpin (and remove its pin-spacer) before React
  // detaches this subtree, or React tries to remove a node that moved.
  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    if (!mq.matches) return
    let ctx: { revert: () => void } | undefined
    let cancelled = false
    loadGsap().then(({ gsap }) => {
      if (cancelled || !section.current || !track.current) return
      ctx = gsap.context(() => {
        const distance = () => track.current!.scrollWidth - window.innerWidth
        gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
      }, section)
    })
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    // Stable wrapper: the pin-spacer GSAP inserts lives inside it, never in React's way.
    <div>
    <section ref={section} className="relative mt-36 overflow-hidden md:mt-52">
      <div className="flex min-h-[100svh] flex-col justify-center py-16">
        <div className="flex flex-wrap items-end justify-between gap-6 px-[var(--gutter)]">
          <div>
            <Eyebrow index="04">{t('home.work')}</Eyebrow>
            <h2 className="display h-lg mt-6">
              <Split text={t('home.workTitle')} />
            </h2>
          </div>
          <span className="label hidden md:inline">{t('home.dragHint')} →</span>
        </div>

        <div
          ref={track}
          className="mt-12 flex w-max gap-[2vw] px-[var(--gutter)] max-[899px]:w-full max-[899px]:snap-x max-[899px]:snap-mandatory max-[899px]:overflow-x-auto max-[899px]:pb-4"
        >
          {featuredProjects.map((p, i) => (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              data-cursor={t('projects.view')}
              className="group block w-[78vw] shrink-0 snap-start sm:w-[54vw] md:w-[38vw]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                {p.image ? (
                  <img
                    src={opt(p.image)}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                ) : (
                  <SignalCover
                    seed={p.id}
                    className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-bg/80 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] backdrop-blur">
                  {String(i + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="display text-[clamp(1.6rem,2.4vw,2.4rem)] tracking-[-0.03em]">{p.title.split(' — ')[0]}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted line-clamp-2">{p.summary[locale]}</p>
                </div>
                <span className="label shrink-0">{p.year}</span>
              </div>
            </Link>
          ))}
          <Link
            to="/projects"
            data-cursor={t('common.open')}
            className="group flex w-[60vw] shrink-0 snap-start flex-col justify-between rounded-[2px] border border-line p-6 sm:w-[40vw] md:w-[26vw]"
          >
            <span className="label">{projects.length} {locale === 'es' ? 'proyectos' : 'projects'}</span>
            <span className="display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.9]">
              {t('home.seeAllProjects')}
              <Arrow className="ml-3 inline h-[0.5em] w-[0.5em] transition-transform duration-700 group-hover:rotate-45" />
            </span>
          </Link>
        </div>
      </div>
    </section>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Founder — Noddle, in Noddle's own gold and charcoal.                 */
/* ------------------------------------------------------------------ */

function Founder() {
  const { t, locale } = useI18n()
  const es = locale === 'es'
  const v = ventures.find((x) => x.id === 'noddle')!
  const record = [
    { k: es ? 'Hackatón nacional → final en Madrid' : 'National hackathon → finals in Madrid', v: 'RetoMarte 2024' },
    { k: es ? '1er lugar, categoría IA' : '1st place, AI category', v: 'WRO International 2023' },
    { k: es ? 'Oro absoluto' : 'Absolute gold', v: es ? 'Olimpiada de Programación 2023' : 'Programming Olympiad 2023' },
    { k: es ? 'Capítulo estudiantil' : 'Student chapter', v: 'Chair · IEEE EMBS TEC' },
  ]
  return (
    <section className="relative mt-36 overflow-hidden bg-[#FFB524] text-[#111111] md:mt-52">
      <div className="px-[var(--gutter)] pt-24 pb-10 md:pt-36">
        <div className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] opacity-70">
          <span>(05)</span>
          <span className="h-px w-8 bg-current" />
          <span>Founder</span>
        </div>
        <h2 className="display h-xl mt-8">
          <Split text={t('home.founderTitle')} />
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-6 md:col-start-7">
            <p className="text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug">{t('home.founderLead')}</p>
          </Reveal>
        </div>
      </div>

      <div className="grid gap-px border-y border-black/15 bg-black/15 lg:grid-cols-12">
        <Reveal className="flex flex-col bg-[#FFB524] px-[var(--gutter)] py-12 md:py-16 lg:col-span-7">
          <div className="flex items-start justify-between gap-6">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em]">{v.stage[locale]}</span>
            <a
              href={v.href}
              target="_blank"
              rel="noreferrer"
              data-cursor={t('common.open')}
              className="roll-host inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em]"
            >
              <Roll>noddleapp.com</Roll>
              <Arrow />
            </a>
          </div>
          <h3 className="display mt-10 text-[clamp(4rem,11vw,11rem)]">{v.name}</h3>
          <p className="serif mt-2 text-[clamp(1.25rem,2vw,1.75rem)]">{v.tagline[locale]}</p>
          <dl className="mt-12 grid gap-8 border-t border-black/15 pt-8 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] opacity-60">{es ? '01 — Problema' : '01 — Problem'}</dt>
              <dd className="mt-3 leading-relaxed">{v.problem[locale]}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] opacity-60">{es ? '02 — Lo que construimos' : '02 — What we built'}</dt>
              <dd className="mt-3 leading-relaxed">{v.bet[locale]}</dd>
            </div>
          </dl>
          <div className="mt-10">
            <Link to="/projects/noddle" className="roll-host inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-[#FAFAF8]">
              <Roll>{es ? 'Ver el caso completo' : 'See the full case'}</Roll>
              <Arrow />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120} className="relative overflow-hidden bg-[#F2EFEA] lg:col-span-5">
          <div className="flex h-full items-center px-6 py-12 lg:px-10">
            <NoddleMocks />
          </div>
        </Reveal>
      </div>

      <div className="px-[var(--gutter)] py-12">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] opacity-60">{es ? 'Historial de competencia' : 'Track record'}</p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {record.map((r) => (
            <li key={r.v} className="border-t border-black/20 pt-4">
              <p className="text-lg font-medium leading-tight">{r.v}</p>
              <p className="mt-1 text-sm opacity-70">{r.k}</p>
            </li>
          ))}
        </ul>
      </div>
      <Marquee
        items={['Stop noodling', 'Start Noddling', es ? 'Hecho en Costa Rica' : 'Made in Costa Rica']}
        speed={30}
        separator="✳"
        className="display border-t border-black/15 py-4 text-[clamp(2.5rem,6vw,6rem)] leading-none [&_.text-signal-ink]:text-[#111111]"
      />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

function ExperienceSection() {
  const { t, locale } = useI18n()
  return (
    <section className="px-[var(--gutter)] pt-24 md:pt-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow index="01">{t('home.experience')}</Eyebrow>
          <h2 className="display h-lg mt-6">
            <Split text={t('home.experienceTitle')} />
          </h2>
        </div>
        <Pill to="/work">{t('home.seeAllWork')}</Pill>
      </div>

      <ul className="mt-16 border-t border-line">
        {experienceByCompany().map(({ company, roles }, i) => {
          const url = companyUrl(company)
          const first = roles[roles.length - 1]
          const last = roles[0]
          return (
            <Reveal as="li" key={company.id} delay={i * 60}>
              <div className="group relative grid gap-x-10 gap-y-8 border-b border-line py-9 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:py-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-0 bg-signal-ink transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
                />
                {/* Company */}
                <div className="flex gap-5">
                  <CompanyLogo company={company} size={60} />
                  <div className="min-w-0">
                    <p className="label">
                      {first.start.slice(0, 4)} — {last.end ? last.end.slice(0, 4) : t('work.present')}
                    </p>
                    <h3 className="display mt-2 text-[clamp(1.75rem,3.2vw,3rem)] leading-[0.95] tracking-[-0.035em]">{company.name}</h3>
                    <p className="mt-2 text-sm text-muted">
                      {company.info[locale]} · {company.location[locale]}
                    </p>
                    {company.domain && url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="roll-host mt-3 inline-flex items-center gap-2 font-mono text-[0.75rem] text-signal-ink"
                      >
                        <Roll>{company.domain}</Roll>
                        <Arrow />
                      </a>
                    )}
                  </div>
                </div>

                {/* Roles, stacked on a timeline when there is more than one */}
                <ol className="relative">
                  {roles.length > 1 && (
                    <span aria-hidden className="absolute left-[5px] top-3 bottom-3 w-px bg-line-strong" />
                  )}
                  {roles.map((r, k) => (
                    <li key={r.id} className={k > 0 ? 'mt-6' : ''}>
                      <Link to={`/work#${company.id}`} className="group/role relative grid grid-cols-[1.5rem_1fr] gap-x-3">
                        <span
                          aria-hidden
                          className={`relative mt-2 h-[11px] w-[11px] rounded-full border ${
                            r.end === null ? 'border-signal-ink bg-signal' : 'border-line-strong bg-bg'
                          }`}
                        />
                        <span>
                          <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                            <span className="text-lg font-medium leading-snug tracking-tight transition-colors group-hover/role:text-signal-ink">
                              {r.role[locale].split(' — ')[0]}
                            </span>
                            <span className="label">
                              {r.start.slice(0, 4)} — {r.end ? r.end.slice(0, 4) : t('work.present')}
                            </span>
                          </span>
                          {r.role[locale].includes(' — ') && (
                            <span className="mt-1 block text-sm text-muted">{r.role[locale].split(' — ')[1]}</span>
                          )}
                          <span className="label mt-2 block">
                            {t(`work.${r.track}`)} · {r.mode[locale]}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Recognition                                                         */
/* ------------------------------------------------------------------ */

function Recognition() {
  const { t, locale } = useI18n()
  const big = [locale === 'es' ? '1º' : '1st', locale === 'es' ? 'Oro' : 'Gold', locale === 'es' ? 'Final' : 'Final']
  return (
    <section className="px-[var(--gutter)] pt-36 md:pt-52">
      <Eyebrow index="06">{t('home.recognition')}</Eyebrow>
      <h2 className="display h-lg mt-6">
        <Split text={t('home.recognitionTitle')} />
      </h2>

      <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
        {awards.map((a, i) => (
          <Reveal key={a.id} delay={i * 100} className="group relative flex min-h-[30rem] flex-col justify-between overflow-hidden bg-bg p-6 md:p-8">
            {a.image && (
              <img
                src={opt(a.image)}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 grayscale transition-[opacity,transform] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-100 group-hover:opacity-25"
              />
            )}
            <div className="relative flex items-center justify-between">
              <span className="label">{a.year}</span>
              <span className="label">{a.org[locale]}</span>
            </div>
            <div className="relative">
              <span className="display block text-[clamp(5rem,10vw,10rem)] text-signal-ink">{big[i]}</span>
              <h3 className="mt-4 text-xl font-medium tracking-tight">{a.title}</h3>
              <p className="label mt-2 text-fg">{a.place[locale]}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{a.summary[locale]}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function StackMarquee() {
  const all = skillGroups.flatMap((g) => g.items)
  const half = Math.ceil(all.length / 2)
  return (
    <section className="py-36 md:py-52" aria-label="Stack">
      <Marquee items={all.slice(0, half)} speed={55} className="display text-[clamp(3rem,8vw,8rem)] leading-[1.05]" />
      <Marquee
        items={all.slice(half)}
        speed={60}
        reverse
        separator="●"
        className="serif text-[clamp(3rem,8vw,8rem)] leading-[1.05] text-muted"
      />
    </section>
  )
}
