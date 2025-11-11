import React, { forwardRef } from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  type ListItemProps,
  type ListItemButtonProps,
  type ListItemIconProps,
  type ListItemTextProps,
  type SxProps,
} from '@mui/material'
import { NavListItemButton } from './NavListItemButton'
import { type NavItem } from './types'

export type NavListItemProps = {
  item: NavItem
  expanded: boolean
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  endIcon?: React.ReactNode
  navListItemProps?: ListItemProps
  navListItemButtonProps?: Omit<ListItemButtonProps, 'to' | 'onClick'>
  navListItemIconProps?: ListItemIconProps
  navListItemTextProps?: ListItemTextProps
  sx?: SxProps<any>
}

export const NavListItem = forwardRef<HTMLDivElement, NavListItemProps>(
  function NavListItem(
    {
      item,
      expanded,
      onClick,
      endIcon,
      navListItemProps,
      navListItemButtonProps,
      navListItemIconProps,
      navListItemTextProps,
      sx,
    },
    ref
  ) {
    return (
      <ListItem
        disablePadding
        {...navListItemProps}
        data-collapsed={!expanded ? 'collapsed' : undefined}
      >
        <Tooltip
          title={expanded ? '' : item.label}
          placement='right'
          slotProps={{
            popper: {
              modifiers: [{ name: 'offset', options: { offset: [0, -12] } }],
            },
          }}
        >
          <NavListItemButton
            {...navListItemButtonProps}
            ref={ref}
            to={item.path}
            params={item.params}
            onClick={onClick}
            data-collapsed={!expanded ? 'collapsed' : undefined}
            sx={{
              '&[data-collapsed]': {
                justifyContent: 'center',
              },
              ...({ ...sx, ...navListItemButtonProps?.sx } as SxProps),
            }}
          >
            <ListItemIcon
              {...navListItemIconProps}
              data-collapsed={!expanded ? 'collapsed' : undefined}
              sx={{
                '&[data-collapsed]': {
                  minWidth: 24,
                },
                ...navListItemIconProps?.sx,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              {...navListItemTextProps}
              primary={item.label}
              data-collapsed={!expanded ? 'collapsed' : undefined}
              sx={{
                textOverflow: 'clip',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                '&[data-collapsed]': {
                  display: 'none',
                },
                ...navListItemTextProps?.sx,
              }}
            />

            {endIcon}
          </NavListItemButton>
        </Tooltip>
      </ListItem>
    )
  }
)
