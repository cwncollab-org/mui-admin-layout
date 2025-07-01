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
}

interface MUIListItemButtonLinkProps
  extends Omit<ListItemButtonProps<'a'>, 'component'> {
  // Add any additional props you want to pass to the ListItemButton
}

const MUIListItemButtonLinkComponent = forwardRef<
  HTMLAnchorElement,
  MUIListItemButtonLinkProps
>((props, ref) => <MuiListItemButton ref={ref} component='a' {...props} />)

const CreatedListItemButtonLinkComponent = createLink(
  MUIListItemButtonLinkComponent
)

export const CustomListItemButtonLink: LinkComponent<
  typeof MUIListItemButtonLinkComponent
> = props => {
  return <CreatedListItemButtonLinkComponent preload={'intent'} {...props} />
}

export function NavListItemButton(props: NavListItemButtonProps) {
  const { to, children, ...rest } = props

  if (to) {
    return (
      <CustomListItemButtonLink {...(rest as any)} to={to}>
        {children}
      </CustomListItemButtonLink>
    )
  }

  return <MuiListItemButton {...rest}>{children}</MuiListItemButton>
}
