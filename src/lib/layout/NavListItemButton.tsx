import { ListItemButton as MuiListItemButton } from '@mui/material'
import type { ListItemButtonProps } from '@mui/material'
import {
  createLink,
  ValidateToPath,
  LinkComponent,
} from '@tanstack/react-router'
import { forwardRef } from 'react'

export type NavListItemButtonProps = ListItemButtonProps & {
  to?: ValidateToPath | (string & {})
  params?: Record<string, string | number>
}

type MUIListItemButtonLinkProps = Omit<ListItemButtonProps<'a'>, 'component'>

const MUIListItemButtonLinkComponent = forwardRef<
  HTMLAnchorElement,
  MUIListItemButtonLinkProps
>((props, ref) => <MuiListItemButton ref={ref} component='a' {...props} />)

const CreatedListItemButtonLinkComponent = createLink(
  MUIListItemButtonLinkComponent
)

type CustomListItemButtonLinkProps = Omit<MUIListItemButtonLinkProps, 'ref'>

const CustomListItemButtonLink: LinkComponent<
  typeof MUIListItemButtonLinkComponent
> = props => {
  return <CreatedListItemButtonLinkComponent preload={'intent'} {...props} />
}

export function NavListItemButton(props: NavListItemButtonProps) {
  const { to, params, children, ...rest } = props

  if (to) {
    return (
      <CustomListItemButtonLink
        {...(rest as CustomListItemButtonLinkProps)}
        to={to}
        params={params as any}
      >
        {children}
      </CustomListItemButtonLink>
    )
  }

  return <MuiListItemButton {...rest}>{children}</MuiListItemButton>
}
