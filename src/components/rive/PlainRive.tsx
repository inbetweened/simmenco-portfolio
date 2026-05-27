'use client'

import { useRive } from '@rive-app/react-canvas'

interface PlainRiveProps {
  src: string
  artboard: string
  stateMachine?: string
  animation?: string
  className?: string
}

export function PlainRive({
  src,
  artboard,
  stateMachine,
  animation,
  className = '',
}: PlainRiveProps) {
  const { RiveComponent } = useRive({
    src,
    artboard,
    stateMachines: stateMachine,
    animations: stateMachine ? undefined : animation,
    autoplay: true,
  })

  return (
    <div className={className}>
      <RiveComponent className="h-full w-full" />
    </div>
  )
}
