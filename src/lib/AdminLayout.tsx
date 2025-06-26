import { PropsWithChildren } from 'react'
import {
  Layout as InternalLayout,
  LayoutProps as InternalLayoutProps,
} from './layout/Layout'

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

export type AdminLayoutProps = PropsWithChildren &
  PickedInternalLayoutProps & {
    avatar?: React.ReactNode
  }

export function AdminLayout(props: AdminLayoutProps) {
  const { children, avatar, ...layoutProps } = props
  const { state, setState } = useLayoutState()
  const isMobile = useIsMobile()
  const slotProps = {
    ...layoutProps.slotProps,
    appBar: {
      ...layoutProps.slotProps?.appBar,
      avatar,
    },
  }

  return (
    <InternalLayout
      {...layoutProps}
      dense={!isMobile}
      slotProps={slotProps}
      state={state}
      onStateChange={setState}
    >
      {children}
    </InternalLayout>
  )
}
