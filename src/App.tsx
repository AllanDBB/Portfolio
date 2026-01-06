import { useEffect, useMemo, useState } from 'react'
import { Hero } from './components/Hero'
import { TechBar } from './components/TechBar'
import { StatsPanel } from './components/StatsPanel'
import { Tabs } from './components/Tabs'
import { ProjectBoard } from './components/ProjectBoard'
import type { Project } from './types'
import { profile } from './data/profile'
import { useI18n } from './i18n'
import { LanguageToggle } from './components/LanguageToggle'
import { Footer } from './components/Footer'
import { NavBar } from './components/NavBar'
import { ProjectModal } from './components/ProjectModal'
import RecommendationLetters from './components/RecommendationLetters'

export default function App() {
  const { locale, t } = useI18n()
  const [active, setActive] = useState<string>('laborales')
  const [selected, setSelected] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])

  const categories = useMemo(
    () => [
      { id: 'laborales', label: t('tabs.laborales') },
      { id: 'proyectos', label: t('tabs.proyectos') },
      { id: 'cartas', label: t('tabs.cartas') },
      { id: 'papers', label: t('tabs.papers') },
      { id: 'voluntariados', label: t('tabs.voluntariados') },
      { id: 'conferencias', label: t('tabs.conferencias') },
      { id: 'premios', label: t('tabs.premios') },
    ],
    [t]
  )

  useEffect(() => {
    fetch('/projects.json')
      .then((r) => r.json())
      .then((data: Project[]) => setProjects(data))
      .catch(() => setProjects([]))
  }, [])

  const filtered = projects.filter((p) => p.category === active)
  const note = t(`notes.${active}`)

  return (
    <div className="min-h-screen flex flex-col font-sans text-[color:var(--text)] bg-[color:var(--bg)]">
      
      {/* Section 1: Header & Intro (White) */}
      <section className="w-full bg-[color:var(--bg)] pb-10">
        <NavBar />
        <div className="max-w-6xl mx-auto px-4 pt-4" style={selected ? { filter: 'blur(4px)' } : undefined}>
          <div className="flex justify-end mb-6">
            <LanguageToggle />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-9">
              <Hero name={profile.name} about={profile.about[locale]} avatars={profile.avatars} />
            </div>
            <div className="hidden md:block md:col-span-3">
              <StatsPanel title={t('languages')} stats={profile.languages[locale]} />
            </div>
            <div className="col-span-12">
              <TechBar title={t('technologies')} imageUrl={profile.techBanner} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Projects & Content (Alt Background) */}
      <section className="w-full flex-1 bg-[color:var(--bg-alt)] py-12 border-t border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-4 space-y-12" style={selected ? { filter: 'blur(4px)' } : undefined}>
          
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <Tabs tabs={categories} active={active} onChange={setActive} />
            </div>
            <div className="col-span-12">
              {active === 'cartas' ? (
                <RecommendationLetters />
              ) : (
                <ProjectBoard projects={filtered} note={note} onOpen={(p) => setSelected(p)} />
              )}
            </div>
          </div>

        </div>
      </section>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  )
}
