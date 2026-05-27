import Link from 'next/link'
import { RiveCanvas } from '@/components/rive/RiveCanvas'
import { RIVE_ARTBOARDS } from '@/lib/riveManifest'

export default function RiveLabPage() {
  return (
    <main className="min-h-screen px-6 lg:px-12 py-28 max-w-container mx-auto">
      <Link href="/" className="inline-flex mb-10 text-body-sm text-text-tertiary hover:text-text-primary transition-colors">
        Back to portfolio
      </Link>

      <div className="mb-12">
        <p className="text-label font-sans font-semibold uppercase text-text-tertiary mb-4">
          Rive Lab
        </p>
        <h1 className="text-display-lg font-sans font-bold text-text-primary">
          Artboard preview.
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {RIVE_ARTBOARDS.map((artboard) => (
          <article key={`${artboard.fileLabel}-${artboard.name}`} className="rounded-xl border border-border bg-surface/60 p-4">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="font-sans font-bold text-text-primary">{artboard.name}</h2>
                <p className="text-label font-sans uppercase tracking-[0.12em] text-text-tertiary mt-1">
                  {artboard.fileLabel} · {artboard.width}×{artboard.height}
                </p>
              </div>
              {artboard.inputs && (
                <span className="text-label font-sans uppercase tracking-[0.12em] text-text-tertiary">
                  hover
                </span>
              )}
            </div>

            <div className="h-56 rounded-lg border border-border bg-background overflow-hidden">
              <RiveCanvas
                src={artboard.file}
                artboard={artboard.name}
                animation={artboard.inputs?.includes('Hovered') ? undefined : artboard.animations[0]}
                stateMachine={artboard.inputs?.includes('Hovered') ? artboard.stateMachine : undefined}
                hoverInput={artboard.inputs?.includes('Hovered') ? 'Hovered' : undefined}
                className="w-full h-full p-4"
              />
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
