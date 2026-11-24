import { createContext, useContext } from 'react'

// When the user asks for less motion in Settings, every figure in the app
// freezes on its clearest frame. System reduced-motion is handled separately
// inside ExerciseFigure.
export const MotionContext = createContext(false)

export function useForceStill() {
  return useContext(MotionContext)
}
