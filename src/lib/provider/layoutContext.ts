import { createContext } from 'react'
import { LayoutState } from '../layout/Layout'

type LayoutContext = {
  mobileMaxWidth?: number
  state: LayoutState
  setState: (state: LayoutState) => void
}

export const layoutContext = createContext<LayoutContext>(null!)
