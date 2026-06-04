"use client";

import { Layout, Fit, Alignment, useRive } from "@rive-app/react-canvas";

export function RivePreview({
  artboard,
  src,
  stateMachine,
}: {
  artboard?: string;
  src: string;
  stateMachine?: string;
}) {
  const { RiveComponent } = useRive({
    src,
    artboard,
    stateMachines: stateMachine,
    autoplay: true,
    automaticallyHandleEvents: true,
    dispatchPointerExit: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  }, {
    shouldResizeCanvasToContainer: true,
  });

  return (
    <div className="rive-preview">
      <RiveComponent className="rive-canvas" />
    </div>
  );
}
