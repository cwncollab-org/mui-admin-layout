import { ListItemButton as MUIListItemButton } from '@mui/material'
import type { ListItemButtonProps } from '@mui/material'
import {
  createLink,
  ValidateToPath,
  LinkComponent,
  useLocation,
} from '@tanstack/react-router'
import { forwardRef } from 'react'

export type NavListItemButtonProps = ListItemButtonProps & {
  to?: ValidateToPath | (string & {})
  params?: Record<string, string | number>
  target?: '_blank' | '_self' | '_parent' | '_top' | (string & {})
  activePath?: string
}

type MUIListItemButtonLinkProps = Omit<ListItemButtonProps<'a'>, 'component'>

const MUIListItemButtonLinkComponent = forwardRef<
  HTMLAnchorElement,
  MUIListItemButtonLinkProps
>((props, ref) => <MUIListItemButton ref={ref} component='a' {...props} />)

const Link = createLink(MUIListItemButtonLinkComponent)
type CustomListItemButtonLinkProps = Omit<MUIListItemButtonLinkProps, 'ref'>

const CustomListItemButtonLink: LinkComponent<
  typeof MUIListItemButtonLinkComponent
> = props => {
  return <Link preload={'intent'} {...props} />
}

export function NavListItemButton(props: NavListItemButtonProps) {
  const { to, params, target, children, activePath, ...rest } = props
  const location = useLocation()

  let selected = rest.selected

  if (activePath) {
    if (
      location.pathname === activePath ||
      location.pathname.startsWith(`${activePath}/`)
    ) {
      selected = true
    }
  } else {
    selected = location.pathname === to
  }

  if (to) {
    return (
      <CustomListItemButtonLink
        {...(rest as CustomListItemButtonLinkProps)}
        to={to}
        params={params as any}
        target={target}
        selected={selected}
        activeProps={{ selected: true, className: 'active' }}
      >
        {children}
      </CustomListItemButtonLink>
    )
  }

  return (
    <MUIListItemButton selected={selected} {...rest}>
      {children}
    </MUIListItemButton>
  )
}
