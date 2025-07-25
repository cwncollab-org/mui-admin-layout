import { PropsWithChildren, useState } from 'react'
import { LayoutInitialState, LayoutState } from '../layout/types'
import { layoutContext } from './layoutContext'

type AdminLayoutProviderProps = PropsWithChildren & {
  initialState?: LayoutInitialState
  mobileMaxWidth?: number
}

const defaultInitialState: LayoutState = {
  sidebarOpen: true,
  appBarState: {
    menuOpen: false,
  },
  submenuOpen: {},
}

export function LayoutProvider(props: AdminLayoutProviderProps) {
  const { children, initialState, mobileMaxWidth } = props
  const [state, setState] = useState<LayoutState>(
    initialState
      ? { ...defaultInitialState, ...initialState }
      : defaultInitialState
  )

  return (
    <layoutContext.Provider value={{ state, setState, mobileMaxWidth }}>
      {children}
    </layoutContext.Provider>
  )
}
