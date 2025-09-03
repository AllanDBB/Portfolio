import { useEffect, useMemo, useState } from 'react'
import { Hero } from './components/Hero'
import { TechBar } from './components/TechBar'
import { StatsPanel } from './components/StatsPanel'
import { Tabs } from './components/Tabs'
import { ProjectBoard } from './components/ProjectBoard'
import type { Project } from './types'
import { profile } from './data/profile'
import { StartupsSection } from './components/StartupsSection'
import { startups } from './data/startups'
import { useI18n } from './i18n'
import { LanguageToggle } from './components/LanguageToggle'
import { Footer } from './components/Footer'
import { NavBar } from './components/NavBar'
import { ProjectModal } from './components/ProjectModal'
import { BackgroundDecor } from './components/BackgroundDecor'

export default function App() {
  const { locale, t } = useI18n()
  const [active, setActive] = useState<string>('laborales')
  const [selected, setSelected] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])

  const categories = useMemo(
    () => [
      { id: 'laborales', label: t('tabs.laborales'), icon: '/figures/Trabajando.png' },
      { id: 'tecnologicos', label: t('tabs.tecnologicos'), icon: '/figures/Programando.png' },
      { id: 'cientificos', label: t('tabs.cientificos'), icon: '/figures/Cientifico.png' },
      { id: 'gastronomia', label: t('tabs.gastronomia'), icon: '/figures/Cocinando.png' },
      { id: 'voluntariados', label: t('tabs.voluntariados'), icon: '/figures/Voluntariado.png' },
      { id: 'conferencias', label: t('tabs.conferencias'), icon: '/figures/Conferencia.png' },
      { id: 'premios', label: t('tabs.premios'), icon: '/figures/Premios.png' },
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
    <div className="min-h-screen relative">
      {/* Top container: night sky behind navbar and hero */}
      <div className="relative mb-6">
        <BackgroundDecor active={active} scope="section" cutoff="top" />
        <div className="relative z-10">
          <NavBar />
          <div className="max-w-6xl mx-auto px-4 py-6" style={selected ? { filter: 'blur(4px)' } : undefined}>
            <div className="flex justify-end mb-4">
              <LanguageToggle />
            </div>
            <div className="grid grid-cols-12 gap-4">
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
        </div>
      </div>

      {/* Rest of the page on light background */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6" style={selected ? { filter: 'blur(4px)' } : undefined}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <StartupsSection title={t('startups')} seeAllLabel={t('seeAll')} items={startups as any} />
          </div>
          <div className="col-span-12">
            <Tabs tabs={categories} active={active} onChange={setActive} />
          </div>
          <div className="col-span-12">
            <ProjectBoard projects={filtered} note={note} onOpen={(p) => setSelected(p)} />
          </div>
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  )
}
