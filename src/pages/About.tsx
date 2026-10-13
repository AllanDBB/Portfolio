import { useI18n } from '../i18n'
import { languages, profile, skillGroups, ventures } from '../content'
import { Eyebrow, Pill, Reveal, Split } from '../components/primitives'
import { opt } from '../lib/img'

const PRINCIPLES = [
  {
    es: ['Ciencia con ambición de startup', 'Me encantan las startups. La investigación da las preguntas; fundar obliga a responderlas con algo que exista.'],
    en: ['Science with startup ambition', 'I love startups. Research gives the questions; founding forces you to answer them with something that exists.'],
  },
  {
    es: ['Medir antes de opinar', 'Un benchmark honesto vale más que una intuición elegante. Si no está medido, todavía es una hipótesis.'],
    en: ['Measure before opining', 'An honest benchmark beats an elegant hunch. If it is not measured, it is still a hypothesis.'],
  },
  {
    es: ['Ruido real, no de laboratorio', 'Los modelos se rompen en el mundo. Pruebo bajo ruido, artefactos y datos faltantes desde el principio.'],
    en: ['Real noise, not lab noise', 'Models break in the world. I test under noise, artefacts and missing data from day one.'],
  },
  {
    es: ['Que llegue a producción', 'La investigación que nadie usa es un borrador. Diseño para que el resultado termine en código desplegado.'],
    en: ['Make it ship', 'Research nobody uses is a draft. I design so the result ends up as deployed code.'],
  },
  {
    es: ['Complejo, a propósito', 'No creo en KISS. Los problemas que me importan — el cerebro, el corazón, los sistemas vivos — no son simples, y fingir que lo son es la forma más rápida de resolver el problema equivocado.'],
    en: ['Complex, on purpose', 'I do not believe in KISS. The problems I care about — the brain, the heart, living systems — are not simple, and pretending they are is the fastest way to solve the wrong problem.'],
  },
]

export default function About() {
  const { t, locale } = useI18n()

  return (
    <>
      <section className="grid gap-12 px-[var(--gutter)] pt-36 md:grid-cols-12 md:pt-48">
        <div className="md:col-span-7">
          <Eyebrow index="A">{t('about.title')}</Eyebrow>
          <h1 className="display h-lg mt-8">
            <Split text={locale === 'es' ? 'Hola, soy\n_Allan._' : "Hi, I'm\n_Allan._"} />
          </h1>
          <Reveal delay={200} className="prose-body mt-12 max-w-2xl">
            {profile.about[locale].split('\n\n').map((p, i) => (
              <p key={i} className={i === 0 ? 'text-[1.3rem] leading-snug text-fg' : ''}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={260} className="mt-10 flex flex-wrap gap-3">
            <Pill href="/AllanBolanos_CV.pdf" solid>
              {t('about.downloadCV')}
            </Pill>
            <Pill href={`mailto:${profile.email}`}>Email</Pill>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <Reveal clip className="overflow-hidden rounded-[2px] md:sticky md:top-24">
            <img
              src={opt('/avatars/1.jpg')}
              alt={profile.fullName}
              className="aspect-[4/5] w-full object-cover object-[60%_40%]"
            />
            <div className="label mt-3 flex justify-between">
              <span>{profile.fullName}</span>
              <span>Costa Rica</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Principles ---- */}
      <section className="px-[var(--gutter)] pt-36">
        <Eyebrow index="01">{t('about.principles')}</Eyebrow>
        <div className="mt-10 grid border-t border-line md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={i} delay={i * 80} className="border-b border-line py-10 md:px-8 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:pl-0 md:last:col-span-2 md:last:border-r-0">
              <span className="label text-signal-ink">0{i + 1}</span>
              <h3 className="display mt-4 text-[clamp(1.75rem,3vw,2.75rem)] tracking-[-0.03em]">{p[locale][0]}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">{p[locale][1]}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Skills ---- */}
      <section className="px-[var(--gutter)] pt-36">
        <Eyebrow index="02">{t('about.skills')}</Eyebrow>
        <div className="mt-10 border-t border-line">
          {skillGroups.map((g, i) => (
            <Reveal key={i} delay={i * 60} className="grid gap-4 border-b border-line py-8 md:grid-cols-12">
              <span className="label md:col-span-3">{g.label[locale]}</span>
              <p className="display text-[clamp(1.4rem,2.6vw,2.4rem)] leading-[1.1] tracking-[-0.03em] md:col-span-9">
                {g.items.map((item, k) => (
                  <span key={item}>
                    {item}
                    {k < g.items.length - 1 && <span className="serif px-2 text-faint">/</span>}
                  </span>
                ))}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Languages, education, ventures ---- */}
      <section className="grid gap-16 px-[var(--gutter)] pt-36 md:grid-cols-3">
        <div>
          <Eyebrow index="03">{t('about.languages')}</Eyebrow>
          <ul className="mt-8 space-y-6">
            {languages.map((l) => (
              <Reveal as="li" key={l.name.en}>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg">{l.name[locale]}</span>
                  <span className="label">{l.level[locale]}</span>
                </div>
                <div className="mt-3 h-px bg-line">
                  <div className="h-px bg-signal-ink" style={{ width: `${l.proficiency}%` }} />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <Eyebrow index="04">{t('about.education')}</Eyebrow>
          <Reveal className="mt-8">
            <p className="display text-[2.25rem] leading-[0.95] tracking-[-0.03em]">{profile.education.degree[locale]}</p>
            <p className="mt-3 text-muted">{profile.education.school}</p>
            <p className="label mt-2">{profile.education.period}</p>
          </Reveal>
        </div>
        <div>
          <Eyebrow index="05">{t('about.ventures')}</Eyebrow>
          <ul className="mt-8 space-y-6">
            {ventures.map((v) => (
              <Reveal as="li" key={v.id}>
                {v.href ? (
                  <a href={v.href} target="_blank" rel="noreferrer" className="link-line display text-[2.25rem] tracking-[-0.03em]">
                    {v.name}
                  </a>
                ) : (
                  <span className="display text-[2.25rem] tracking-[-0.03em]">{v.name}</span>
                )}
                <p className="mt-2 text-sm text-muted">{v.tagline[locale]}</p>
                <p className="label mt-2">{v.stage[locale]}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
