import { PropsWithChildren, useEffect } from 'react'
import { Layout, LayoutInitialState, LayoutState } from './layout/Layout'

import { LayoutProvider } from './provider/LayoutProvider'
import { useLayoutState } from './hooks/layoutHooks'
import { NavList } from './layout'
import { useIsMobile } from './hooks/useIsMobile'

type AdminLayoutProps = PropsWithChildren & {
  navList?: NavList | NavList[]
  initialState?: LayoutInitialState
  menuItems?: React.ReactNode[]
  mobileMaxWidth?: number
}

export function AdminLayout(props: AdminLayoutProps) {
  const { children, initialState, navList, menuItems, mobileMaxWidth } = props

  return (
    <LayoutProvider initialState={initialState} mobileMaxWidth={mobileMaxWidth}>
      <Internal navList={navList} menuItems={menuItems}>
        {children}
      </Internal>
    </LayoutProvider>
  )
}

type InternalProps = PropsWithChildren & {
  navList?: NavList | NavList[]
  menuItems?: React.ReactNode[]
}

function Internal(props: InternalProps) {
  const { children, navList, menuItems } = props
  const { state, setState } = useLayoutState()
  const isMobile = useIsMobile()

  return (
    <Layout
      navList={navList}
      dense={!isMobile}
      state={state}
      menuItems={menuItems}
      onStateChange={setState}
    >
      {children}
    </Layout>
  )
}
