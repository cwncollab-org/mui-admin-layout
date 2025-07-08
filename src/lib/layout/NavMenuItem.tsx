import { MenuItem as MuiMenuItem } from '@mui/material'
import type { MenuItemProps } from '@mui/material'
import {
  createLink,
  ValidateToPath,
  LinkComponent,
} from '@tanstack/react-router'
import { forwardRef } from 'react'

export type NavMenuItemProps = MenuItemProps & {
  to?: ValidateToPath | (string & {})
}

type MUIMenuItemLinkProps = Omit<MenuItemProps<'a'>, 'component'>

const MUIMenuItemLinkComponent = forwardRef<
  HTMLAnchorElement,
  MUIMenuItemLinkProps
>((props, ref) => <MuiMenuItem ref={ref} component='a' {...props} />)

const CreatedMenuItemLinkComponent = createLink(
  MUIMenuItemLinkComponent
)

type CustomMenuItemLinkProps = Omit<MUIMenuItemLinkProps, 'ref'>

const CustomMenuItemLink: LinkComponent<
  typeof MUIMenuItemLinkComponent
> = props => {
  return <CreatedMenuItemLinkComponent preload={'intent'} {...props} />
}

export function NavMenuItem(props: NavMenuItemProps) {
  const { to, children, ...rest } = props

  if (to) {
    return (
      <CustomMenuItemLink
        {...(rest as CustomMenuItemLinkProps)}
        to={to}
      >
        {children}
      </CustomMenuItemLink>
    )
  }

  return <MuiMenuItem {...rest}>{children}</MuiMenuItem>
}