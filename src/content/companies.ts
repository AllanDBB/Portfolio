import type { Company } from '../types'

/** Logos come from each company's own site or brand kit. */
export const companies: Record<string, Company> = {
  noddle: {
    id: 'noddle',
    name: 'Noddle',
    domain: 'noddleapp.com',
    info: { es: 'Startup · app y POS para restaurantes', en: 'Startup · app and POS for restaurants' },
    location: { es: 'Costa Rica', en: 'Costa Rica' },
    logo: '/logos/noddle.svg',
    logoBg: '#111111',
  },
  tec: {
    id: 'tec',
    name: 'Tecnológico de Costa Rica',
    domain: 'tec.ac.cr',
    info: { es: 'Universidad pública · investigación', en: 'Public university · research' },
    location: { es: 'Cartago, Costa Rica', en: 'Cartago, Costa Rica' },
    logo: '/logos/tec-mark.svg',
    logoBg: '#0A2A5C',
  },
  petziclub: {
    id: 'petziclub',
    name: 'PetziClub',
    domain: 'petziclub.com',
    info: { es: 'Productos y servicios para mascotas', en: 'Products and services for pets' },
    location: { es: 'Costa Rica', en: 'Costa Rica' },
    logo: '/logos/petziclub-mark.png',
    logoBg: '#FFFFFF',
  },
  ccal: {
    id: 'ccal',
    name: 'Colegio Científico de Alajuela',
    domain: 'ccalajuela.ed.cr',
    info: { es: 'Colegio científico', en: 'Science high school' },
    location: { es: 'Alajuela, Costa Rica', en: 'Alajuela, Costa Rica' },
    logo: '/logos/ccal.svg',
    logoBg: '#FFFFFF',
  },
  centennial: {
    id: 'centennial',
    name: 'Centennial Partners',
    url: 'https://www.linkedin.com/company/centennial-partnerstwr/',
    info: { es: 'Empresa en Panamá', en: 'Company based in Panama' },
    location: { es: 'Panamá', en: 'Panama' },
    logoBg: '#1F1F1D',
  },
}

export function companyUrl(c: Company) {
  return c.url ?? (c.domain ? `https://${c.domain}` : undefined)
}
