import { useState } from 'react'
import { useI18n } from '../i18n'

interface Letter {
  id: string
  author: string
  position: string
  organization: string
  date: string
  file: string
}

const letters: Letter[] = [
  {
    id: 'letter1',
    author: 'Samanta Ramijan Carmiol',
    position: 'Directora General',
    organization: 'Petziclub',
    date: 'Septiembre 2025',
    file: '/Recommendationletters/carta_sam.pdf'
  },
  {
    id: 'letter2',
    author: 'Martín Solís Salazar',
    position: 'Profesor e Investigador',
    organization: 'Tecnológico de Costa Rica',
    date: 'Septiembre 2025',
    file: '/Recommendationletters/carta_martin.pdf'
  },
  {
    id: 'letter3',
    author: 'Esteban Arias Méndez',
    position: 'Profesor e Investigador',
    organization: 'Tecnológico de Costa Rica',
    date: 'Septiembre 2025',
    file: '/Recommendationletters/carta_esteban.pdf'
  }
]

export default function RecommendationLetters() {
  const { locale, t } = useI18n()
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {letters.map((letter) => (
          <div
            key={letter.id}
            onClick={() => setSelectedLetter(letter)}
            className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all hover:border-[color:var(--accent)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[color:var(--accent)] to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 text-[color:var(--text)]">{t('recommendationLetter')}</h3>
                <p className="text-sm font-medium text-[color:var(--text)] mb-1">{letter.author}</p>
                <p className="text-xs text-[color:var(--muted)]">{letter.position}</p>
                <p className="text-xs text-[color:var(--muted)] mb-2">{letter.organization}</p>
                <div className="flex items-center gap-2 mt-3">
                  <svg className="w-4 h-4 text-[color:var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs font-medium text-[color:var(--accent)]">{letter.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedLetter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedLetter(null)}
        >
          <div
            className="bg-[color:var(--card)] rounded-lg w-full max-w-4xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-[color:var(--border)]">
              <div>
                <h2 className="text-xl font-semibold text-[color:var(--text)]">{t('recommendationLetter')}</h2>
                <p className="text-sm text-[color:var(--muted)]">{selectedLetter.author} - {selectedLetter.organization}</p>
              </div>
              <button
                onClick={() => setSelectedLetter(null)}
                className="p-2 hover:bg-[color:var(--bg-alt)] rounded-lg transition-colors text-[color:var(--text)]"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={selectedLetter.file}
                className="w-full h-full"
                title={selectedLetter.author}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
