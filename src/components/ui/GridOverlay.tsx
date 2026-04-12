/**
 * Editorial column grid overlay.
 *
 * Sits fixed behind all content. Uses the exact same horizontal insets
 * as the content sections (px-6 lg:px-12) so the left and right lines
 * act as a true bounding box for the layout.
 *
 * Structure:
 *   outer — full viewport, fixed
 *   inner — max-w-container, centred, matching content padding
 *     left bounding line  (slightly bolder)
 *     right bounding line (slightly bolder)
 *     5 interior lines → 6 columns
 */
export function GridOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
    >
      <div className="relative h-full max-w-container mx-auto">
        {/*
          Content area — insets match the section padding.
          px-6 = 24px, lg:px-12 = 48px
        */}
        <div className="absolute inset-y-0 left-6 right-6 lg:left-12 lg:right-12">

          {/* Left bounding line */}
          <div
            className="absolute top-0 bottom-0 left-0 w-px"
            style={{ backgroundColor: 'rgba(24,22,20,0.1)' }}
          />

          {/* Right bounding line */}
          <div
            className="absolute top-0 bottom-0 right-0 w-px"
            style={{ backgroundColor: 'rgba(24,22,20,0.1)' }}
          />

          {/* 5 interior lines → 6 equal columns */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: `${(i / 6) * 100}%`,
                backgroundColor: 'rgba(24,22,20,0.045)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
