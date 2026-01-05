import type { Locale, Stat } from '../types'

type Profile = {
  name: string
  about: Record<Locale, string>
  techBanner: string
  languages: Record<Locale, Stat[]>
  avatars?: string[]
}

export const profile: Profile = {
  name: 'Allan Bolaños B.',
  about: {
    en:
      "I'm a Computer Engineering student at ITCR and a builder at heart. I enjoy designing systems, playing with data and algorithms, and exploring the frontiers between science and software — from bioinformatics to a bit of quantum curiosity. I love technology, science and gastronomy; I learn fast, iterate faster, and keep things simple. From Costa Rica 🦥.",
    es:
      'Soy estudiante de Ingeniería en Computación en el TEC y, sobre todo, un builder. Disfruto diseñar sistemas, jugar con datos y algoritmos, y explorar la frontera entre ciencia y software — de la bioinformática a un poco de curiosidad cuántica. Amo la tecnología, la ciencia y la gastronomía; aprendo rápido, itero más rápido y mantengo las cosas simples. Desde Costa Rica 🦥.',
  },
  techBanner:
    'https://skillicons.dev/icons?i=python,java,cpp,html,css,js,react,vue,astro,django,nodejs,express,github,vscode,solidity&perline=20',
  languages: {
    es: [
      { label: 'Español', value: 'Nativo', icon: '🇪🇸' },
      { label: 'Inglés', value: 'Profesional', icon: '🇬🇧' },
      { label: 'Coreano', value: 'Empezando', icon: '🇰🇷' },
      { label: 'Portugués', value: 'Empezando', icon: '🇵🇹' },
    ],
    en: [
      { label: 'Spanish', value: 'Native', icon: '🇪🇸' },
      { label: 'English', value: 'Professional', icon: '🇬🇧' },
      { label: 'Korean', value: 'Beginner', icon: '🇰🇷' },
      { label: 'Portuguese', value: 'Beginner', icon: '🇵🇹' },
    ],
  },
  // Coloca tus imágenes en public/avatars/1.jpg,2.jpg,3.jpg
  avatars: ['/avatars/1.png'],
}
