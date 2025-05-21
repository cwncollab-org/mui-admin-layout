import { PropsWithChildren } from 'react'
import {
  Layout as InternalLayout,
  LayoutInitialState,
  LayoutProps as InternalLayoutProps,
} from './layout/Layout'

import { LayoutProvider } from './provider/LayoutProvider'
import { useLayoutState } from './hooks/layoutHooks'
import { useIsMobile } from './hooks/useIsMobile'

type PickedInternalLayoutProps = Pick<
  InternalLayoutProps,
  | 'title'
  | 'navList'
  | 'menuItems'
  | 'sx'
  | 'drawerWidth'
  | 'collapsedDrawerWidth'
  | 'slotProps'
>

type AdminLayoutProps = PropsWithChildren &
  PickedInternalLayoutProps & {
    mobileMaxWidth?: number
    initialState?: LayoutInitialState
    avatar?: React.ReactNode
  }

export function AdminLayout(props: AdminLayoutProps) {
  const { children, mobileMaxWidth, initialState, avatar, ...layoutProps } =
    props

  const slotProps = {
    ...layoutProps.slotProps,
    appBar: {
      ...layoutProps.slotProps?.appBar,
      avatar,
    },
  }

  return (
    <LayoutProvider initialState={initialState} mobileMaxWidth={mobileMaxWidth}>
      <Layout {...layoutProps} slotProps={slotProps}>
        {children}
      </Layout>
    </LayoutProvider>
  )
}

type LayoutProps = PropsWithChildren & PickedInternalLayoutProps

function Layout(props: LayoutProps) {
  const { children, ...layoutProps } = props
  const { state, setState } = useLayoutState()
  const isMobile = useIsMobile()

  return (
    <InternalLayout
      dense={!isMobile}
      {...layoutProps}
      state={state}
      onStateChange={setState}
    >
      {children}
    </InternalLayout>
  )
}
