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
  | 'sidebarTogglePosition'
  | 'navStartSlot'
  | 'navEndSlot'
  | 'appBarProps'
  | 'mainProps'
  | 'navDrawerProps'
  | 'navListProps'
  | 'navListItemProps'
  | 'navListSubheaderProps'
  | 'navListItemButtonProps'
  | 'navDividerProps'
  | 'navListItemIconProps'
  | 'navListItemTextProps'
  | 'navSidebarToggleButtonProps'
  | 'sx'
  | 'drawerWidth'
  | 'collapsedDrawerWidth'
  | 'enableAppBar'
>

export type AdminLayoutProps = PropsWithChildren &
  PickedInternalLayoutProps & {
    avatar?: React.ReactNode
    dense?: boolean | 'auto'
  }

export function AdminLayout(props: AdminLayoutProps) {
  const { children, avatar, dense = 'auto', ...layoutProps } = props
  const { state, setState } = useLayoutState()
  const isMobile = useIsMobile()

  return (
    <InternalLayout
      {...layoutProps}
      dense={dense === 'auto' ? !isMobile : dense}
      state={state}
      onStateChange={setState}
    >
      {children}
    </InternalLayout>
  )
}
