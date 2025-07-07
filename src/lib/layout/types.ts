import { ValidateToPath } from '@tanstack/react-router'
import { MouseEvent } from 'react'

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
  subItems?: NavSubItem[]
}

export type NavSubItem = Omit<NavItem, 'subItems'>
