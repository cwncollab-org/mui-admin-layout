import { ValidateToPath } from '@tanstack/react-router'
import { MouseEvent } from 'react'
import { AppBarInitialState, AppBarState } from './AppBar'
import { SvgIconProps } from '@mui/material'

export type PlaceholderNavList = {
  isPlaceholder: true
  title?: string
}

type NavItemIcon =
  | {
      icon: React.ReactNode
    }
  | {
      Icon: React.ComponentType<SvgIconProps>
      iconProps?: SvgIconProps
    }

export type NavList =
  | {
      items: NavItem[]
      title?: string
    }
  | PlaceholderNavList

export type NavItem = {
  key?: string
  label: string
  path?: ValidateToPath | (string & {})
  params?: Record<string, string | number>
  onClick?: (evt: MouseEvent) => void
  subitems?: NavSubitem[]
} & NavItemIcon

export type NavSubitem = Omit<NavItem, 'subitems'> & NavItemIcon

export type KeyedNavList = {
  title?: string
} & (
  | {
      items: KeyedNavItem[]
    }
  | {
      isPlaceholder: true
    }
)
export type KeyedNavItem = Required<Pick<NavItem, 'key'>> &
  Omit<NavItem, 'key'> &
  NavItemIcon
export type KeyedNavSubitem = Omit<KeyedNavItem, 'subitems'> & NavItemIcon

export type LayoutState = {
  sidebarOpen: boolean
  appBarState: AppBarState
  submenuOpen: Record<string, boolean>
}

export type LayoutInitialState = {
  sidebarOpen?: boolean
  appBarState?: AppBarInitialState
  submenuOpen?: Record<string, boolean>
}
