import { ValidateToPath } from '@tanstack/react-router'
import { MouseEvent } from 'react'
import { AppBarInitialState, AppBarState } from './AppBar'

export type NavList = {
  items: NavItem[]
  title?: string
}

export type NavItem = {
  key?: string
  icon?: React.ReactNode
  label: string
  path?: ValidateToPath | (string & {})
  onClick?: (evt: MouseEvent) => void
  subitems?: NavSubitem[]
}

export type NavSubitem = Omit<NavItem, 'subitems'>

export type KeyedNavList = {
  items: KeyedNavItem[]
  title?: string
}
export type KeyedNavItem = Required<Pick<NavItem, 'key'>> & Omit<NavItem, 'key'>
export type KeyedNavSubitem = Omit<KeyedNavItem, 'subitems'>

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
