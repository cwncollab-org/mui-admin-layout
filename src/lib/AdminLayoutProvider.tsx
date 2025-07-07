import { PropsWithChildren } from 'react'
import { LayoutInitialState } from './layout/Layout'
import { LayoutProvider } from './provider/LayoutProvider'

export type AdminLayoutProviderProps = PropsWithChildren & {
  mobileMaxWidth?: number
  initialState?: LayoutInitialState
}

export function AdminLayoutProvider(props: AdminLayoutProviderProps) {
  const { children, mobileMaxWidth, initialState } = props

  return (
    <LayoutProvider
      initialState={{ submenuOpen: {}, ...initialState }}
      mobileMaxWidth={mobileMaxWidth}
    >
      {children}
    </LayoutProvider>
  )
}
