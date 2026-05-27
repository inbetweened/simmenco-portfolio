export interface RiveArtboardInfo {
  file: string
  fileLabel: string
  name: string
  width: number
  height: number
  animations: string[]
  stateMachine?: string
  inputs?: string[]
}

export const RIVE_FILES = {
  cursorGaze: '/rive/cursor_gaze.riv',
  isoToy: '/rive/iso_toy_001.riv',
}

export const RIVE_ARTBOARDS: RiveArtboardInfo[] = [
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'redSquare', width: 500, height: 500, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'blue', width: 250, height: 500, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'EyesStreched', width: 250, height: 500, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'greenSmall', width: 250, height: 250, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'EyesGreen', width: 157, height: 123, animations: ['Timeline 2', 'Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'EyesRed', width: 157, height: 123, animations: ['Timeline 2', 'Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'yellowShort', width: 500, height: 250, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'EyesYellow', width: 157, height: 124, animations: ['Timeline 2', 'Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'Main', width: 754, height: 754, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'redVertical', width: 500, height: 800, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'yellowSquare', width: 500, height: 500, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'redWide', width: 800, height: 500, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'yellowWide', width: 800, height: 250, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'greenWide', width: 500, height: 250, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'greenVertical', width: 250, height: 550, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'greenSquare', width: 500, height: 500, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'blueWide', width: 500, height: 500, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.cursorGaze, fileLabel: 'cursor_gaze', name: 'EyesRed-2', width: 157, height: 124, animations: ['Timeline 2', 'Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.isoToy, fileLabel: 'iso_toy_001', name: 'Artboard', width: 1080, height: 1080, animations: ['Timeline 1'], stateMachine: 'State Machine 1' },
  { file: RIVE_FILES.isoToy, fileLabel: 'iso_toy_001', name: 'isocube', width: 584, height: 650, animations: ['Hovered', 'Default'], stateMachine: 'State Machine 1', inputs: ['Hovered'] },
]
