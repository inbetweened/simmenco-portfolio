'use client'

import { Alignment, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas'

export interface RiveCanvasConfig {
  src: string
  artboard: string
  animation?: string
  stateMachine?: string
  hoverInput?: string
}

interface RiveCanvasProps extends RiveCanvasConfig {
  className?: string
}

export function RiveCanvas({
  src,
  artboard,
  animation,
  stateMachine,
  hoverInput,
  className = '',
}: RiveCanvasProps) {
  const { rive, RiveComponent } = useRive({
    src,
    artboard,
    animations: stateMachine ? undefined : animation,
    stateMachines: stateMachine,
    autoplay: true,
    shouldDisableRiveListeners: false,
    dispatchPointerExit: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  })
  const hoverState = useStateMachineInput(rive, stateMachine, hoverInput, false)

  return (
    <div
      className={`${className} rive-canvas-shell`}
      onPointerEnter={() => {
        if (hoverState) hoverState.value = true
      }}
      onPointerLeave={() => {
        if (hoverState) hoverState.value = false
      }}
    >
      <RiveComponent className="w-full h-full" />
    </div>
  )
}
