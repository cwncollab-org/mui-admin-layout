import { ValidateToPath } from '@tanstack/react-router'

export type NavList = {
  items: NavItem[]
  title?: string
}

export type NavItem = {
  icon: React.ReactNode
  label: string
  path?: ValidateToPath | (string & {})
}
