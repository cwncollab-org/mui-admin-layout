import { PropsWithChildren, useState } from 'react'
import { LayoutInitialState, LayoutState } from '../layout/Layout'
import { layoutContext } from './layoutContext'

type AdminLayoutProviderProps = PropsWithChildren & {
  initialState?: LayoutInitialState
}

const defaultInitialState: LayoutInitialState = {
  dense: false,
  appBarState: {
    menuOpen: false,
  },
}

export function LayoutProvider(props: AdminLayoutProviderProps) {
  const { children, initialState } = props
  const [state, setState] = useState<LayoutState>(
    initialState ?? defaultInitialState
  )

  return (
    <layoutContext.Provider value={{ state, setState }}>
      {children}
    </layoutContext.Provider>
  )
}
