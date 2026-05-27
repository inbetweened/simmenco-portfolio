import Link from 'next/link'
import { PlainRive } from '@/components/rive/PlainRive'

export default function RiveMainTestPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <Link href="/projects/rive-gaze-system" className="mb-6 inline-flex text-body-sm text-text-tertiary hover:text-text-primary">
        Back to Gaze project
      </Link>
      <div className="h-[82vh] w-full rounded-xl border border-border bg-background">
        <PlainRive
          src="/rive/cursor_gaze.riv"
          artboard="Main"
          stateMachine="State Machine 1"
          className="h-full w-full"
        />
      </div>
    </main>
  )
}
