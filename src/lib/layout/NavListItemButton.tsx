import { ListItemButton as MuiListItemButton, SxProps } from '@mui/material'
import type { ListItemButtonProps } from '@mui/material'
import {
  createLink,
  ValidateToPath,
  LinkComponent,
} from '@tanstack/react-router'
import { PropsWithChildren, forwardRef } from 'react'

export type NavListItemButtonProps = PropsWithChildren & {
  to?: ValidateToPath | (string & {})
  onClick?: (evt: React.MouseEvent) => void
  sx?: SxProps
}

interface MUIListItemButtonLinkProps extends ListItemButtonProps<'a'> {
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
  const { to, onClick, children, sx } = props

  return to ? (
    <CustomListItemButtonLink to={to} sx={sx}>
      {children}
    </CustomListItemButtonLink>
  ) : (
    <MuiListItemButton onClick={onClick} sx={sx}>
      {children}
    </MuiListItemButton>
  )
}
