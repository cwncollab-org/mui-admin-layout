import { PropsWithChildren, useEffect } from 'react'
import { Layout, LayoutInitialState, LayoutState } from './layout/Layout'

import { LayoutProvider } from './provider/LayoutProvider'
import { useLayoutState } from './hooks/layoutHooks'
import { NavList } from './layout'
import { useIsMobile } from './hooks/useIsMobile'

type AdminLayoutProps = PropsWithChildren & {
  title?: string | React.ReactNode
  navList?: NavList | NavList[]
  menuItems?: React.ReactNode[]
  mobileMaxWidth?: number
  initialState?: LayoutInitialState
}

export function AdminLayout(props: AdminLayoutProps) {
  const { title, navList, menuItems, mobileMaxWidth, initialState, children } =
    props

  return (
    <LayoutProvider initialState={initialState} mobileMaxWidth={mobileMaxWidth}>
      <Internal title={title} navList={navList} menuItems={menuItems}>
        {children}
      </Internal>
    </LayoutProvider>
  )
}

type InternalProps = PropsWithChildren & {
  title?: string | React.ReactNode
  navList?: NavList | NavList[]
  menuItems?: React.ReactNode[]
}

function Internal(props: InternalProps) {
  const { title, navList, menuItems, children } = props
  const { state, setState } = useLayoutState()
  const isMobile = useIsMobile()

  return (
    <Layout
      dense={!isMobile}
      title={title}
      navList={navList}
      menuItems={menuItems}
      state={state}
      onStateChange={setState}
    >
      {children}
    </Layout>
  )
}
