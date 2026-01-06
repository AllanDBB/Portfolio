import { useI18n } from '../i18n'

export function CVViewer() {
  const { t } = useI18n()

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/AllanBolanos_CV.pdf'
    link.download = 'AllanBolanos_CV.pdf'
    link.click()
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-[color:var(--border)] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[color:var(--accent)] to-teal-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="size-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-semibold text-white">Currículum Vitae</h2>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-white text-[color:var(--accent)] rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {t('downloadCV')}
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="w-full h-[800px] bg-gray-50">
        <iframe
          src="/AllanBolanos_CV.pdf#toolbar=0&navpanes=0&scrollbar=1"
          className="w-full h-full border-none"
          title="CV Preview"
        />
      </div>
    </div>
  )
}
