import { SITE } from '@/lib/constants'

/**
 * Minimal footer — name, year, and a subtle location note.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="max-w-container mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="text-body-sm font-sans font-medium text-text-primary">
          {SITE.name}
        </span>
        <div className="flex items-center gap-6">
          <span className="text-body-sm font-sans font-light text-text-tertiary">
            {SITE.location}
          </span>
          <span className="text-body-sm font-sans font-light text-text-tertiary tabular-nums">
            © {year}
          </span>
        </div>
      </div>
    </footer>
  )
}
