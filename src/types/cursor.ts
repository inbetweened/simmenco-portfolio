export type CursorState =
  | 'default'
  | 'hover-button'  // merges with button; ring expands and fades
  | 'hover-text'    // flat marker underline shape
  | 'hover-card'    // large expanded ring with "view" label
  | 'hidden'        // cursor left the window

export interface CursorContextValue {
  cursorState: CursorState
  setCursorState: (state: CursorState) => void
  mouseX: import('framer-motion').MotionValue<number>
  mouseY: import('framer-motion').MotionValue<number>
}
