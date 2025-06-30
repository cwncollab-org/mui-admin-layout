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
  | 'appBarProps'
  | 'mainProps'
  | 'drawerProps'
  | 'listProps'
  | 'listItemProps'
  | 'listSubheaderProps'
  | 'listItemButtonProps'
  | 'sx'
  | 'drawerWidth'
  | 'collapsedDrawerWidth'
  | 'enableAppBar'
>

export type AdminLayoutProps = PropsWithChildren &
  PickedInternalLayoutProps & {
    avatar?: React.ReactNode
  }

export function AdminLayout(props: AdminLayoutProps) {
  const { children, avatar, ...layoutProps } = props
  const { state, setState } = useLayoutState()
  const isMobile = useIsMobile()

  return (
    <InternalLayout
      {...layoutProps}
      dense={!isMobile}
      state={state}
      onStateChange={setState}
    >
      {children}
    </InternalLayout>
  )
}
