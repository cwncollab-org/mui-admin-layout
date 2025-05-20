import { PropsWithChildren } from 'react'
import { Layout, LayoutInitialState } from './layout/Layout'

import { LayoutProvider } from './provider/LayoutProvider'
import { useLayoutState } from './provider/layoutHooks'
import { NavList } from './layout'

type AdminLayoutProps = PropsWithChildren & {
  navList?: NavList | NavList[]
  initialState?: LayoutInitialState
  menuItems?: React.ReactNode[]
}

export function AdminLayout(props: AdminLayoutProps) {
  const { children, initialState, navList, menuItems } = props

  return (
    <LayoutProvider initialState={initialState}>
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
  return (
    <Layout
      navList={navList}
      state={state}
      menuItems={menuItems}
      onStateChange={setState}
    >
      {children}
    </Layout>
  )
}
