import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Collapse,
  CollapseProps,
  List,
  ListItem,
  ListItemButtonProps,
  ListItemIconProps,
  ListItemProps,
  ListItemTextProps,
  ListProps,
  ListSubheader,
  ListSubheaderProps,
  Menu,
  Skeleton,
  SxProps,
} from '@mui/material'
import { Fragment, useRef } from 'react'
import { KeyedNavItem, KeyedNavList, LayoutState } from './types'
import { NavListItem } from './NavListItem'
import { NavMenuItem } from './NavMenuItem'

export type NavListProps = {
  navList: KeyedNavList
  expanded: boolean
  layoutState: LayoutState
  onToggleSubmenu: (item: KeyedNavItem) => void
  dense?: boolean
  navListProps?: ListProps
  navListSubheaderProps?: ListSubheaderProps
  navListItemProps?: ListItemProps
  navListItemButtonProps?: Omit<ListItemButtonProps, 'to' | 'onClick'>
  navListItemIconProps?: ListItemIconProps
  navListItemTextProps?: ListItemTextProps
  navListSubitemButtonProps?: Pick<ListItemButtonProps, 'sx'>
  navCollapseProps?: Omit<CollapseProps, 'in'>
}

export function NavList({
  navList,
  expanded,
  layoutState,
  onToggleSubmenu,
  dense,
  navListProps,
  navListSubheaderProps,
  navListItemProps,
  navListItemButtonProps,
  navListItemIconProps,
  navListItemTextProps,
  navListSubitemButtonProps,
  navCollapseProps,
}: NavListProps) {
  return (
    <List
      dense={dense}
      {...navListProps}
      data-collapsed={!expanded ? 'collapsed' : undefined}
    >
      {navList.title && (
        <ListSubheader
          data-subheader={navList.title}
          data-collapsed={!expanded ? 'collapsed' : undefined}
          {...navListSubheaderProps}
          sx={{
            lineHeight: dense ? '35px' : undefined,
            '&[data-collapsed]': {
              display: 'none',
            },
            ...(navListSubheaderProps?.sx as SxProps),
          }}
        >
          {navList.title}
        </ListSubheader>
      )}
      {!('isPlaceholder' in navList)
        ? navList.items.map((item, index) => (
            <NavListItemWithSubmenu
              key={`nav-item-${index}`}
              item={item}
              index={index}
              expanded={expanded}
              dense={dense}
              layoutState={layoutState}
              onToggleSubmenu={onToggleSubmenu}
              navListItemProps={navListItemProps}
              navListItemButtonProps={navListItemButtonProps}
              navListItemIconProps={navListItemIconProps}
              navListItemTextProps={navListItemTextProps}
              navListSubitemButtonProps={navListSubitemButtonProps}
              navCollapseProps={navCollapseProps}
            />
          ))
        : [1, 2, 3].map((_, index) => (
            <Fragment key={`nav-placeholder-${index}`}>
              <ListItem>
                <Skeleton variant='text' sx={{ width: 1 }} />
              </ListItem>
            </Fragment>
          ))}
    </List>
  )
}

type NavListItemWithSubmenuProps = {
  item: KeyedNavItem
  index: number
  expanded: boolean
  dense?: boolean
  layoutState: LayoutState
  onToggleSubmenu: (item: KeyedNavItem) => void
  navListItemProps?: ListItemProps
  navListItemButtonProps?: Omit<ListItemButtonProps, 'to' | 'onClick'>
  navListItemIconProps?: ListItemIconProps
  navListItemTextProps?: ListItemTextProps
  navListSubitemButtonProps?: Pick<ListItemButtonProps, 'sx'>
  navCollapseProps?: Omit<CollapseProps, 'in'>
}

function NavListItemWithSubmenu({
  item,
  index,
  expanded,
  dense,
  layoutState,
  onToggleSubmenu,
  navListItemProps,
  navListItemButtonProps,
  navListItemIconProps,
  navListItemTextProps,
  navListSubitemButtonProps,
  navCollapseProps,
}: NavListItemWithSubmenuProps) {
  const itemKey = item.key
  const hasSubmenu = Boolean(item.subitems?.length)
  const expandedSubmenu = Boolean(layoutState.submenuOpen[itemKey])
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Fragment key={`nav-item-${index}`}>
      <NavListItem
        ref={ref}
        item={item}
        expanded={expanded}
        endIcon={
          expanded && hasSubmenu ? (
            expandedSubmenu ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null
        }
        onClick={e => (hasSubmenu ? onToggleSubmenu(item) : item.onClick?.(e))}
        navListItemProps={navListItemProps}
        navListItemButtonProps={navListItemButtonProps}
        navListItemIconProps={navListItemIconProps}
        navListItemTextProps={navListItemTextProps}
      />
      {expanded && item.subitems?.length && (
        <Collapse in={expandedSubmenu} {...navCollapseProps}>
          <List dense={dense} component='div' disablePadding>
            {item.subitems.map((subitem, subIndex) => (
              <Fragment key={`nav-subitem-${subIndex}`}>
                <NavListItem
                  item={subitem}
                  expanded={expanded}
                  onClick={e => subitem.onClick?.(e)}
                  navListItemProps={navListItemProps}
                  navListItemButtonProps={navListItemButtonProps}
                  navListItemIconProps={navListItemIconProps}
                  navListItemTextProps={navListItemTextProps}
                  sx={{
                    pl: 4,
                    ...(navListSubitemButtonProps?.sx as SxProps),
                  }}
                />
              </Fragment>
            ))}
          </List>
        </Collapse>
      )}
      {!expanded && item.subitems?.length && (
        <Menu
          open={expandedSubmenu}
          anchorEl={ref.current}
          onClose={() => {
            onToggleSubmenu(item)
          }}
        >
          {item.subitems.map((subitem, subIndex) => (
            <NavMenuItem
              key={`nav-subitem-${subIndex}`}
              onClick={e => {
                subitem.onClick?.(e)
                onToggleSubmenu(item)
              }}
              dense={dense}
              to={subitem.path}
            >
              {subitem.label}
            </NavMenuItem>
          ))}
        </Menu>
      )}
    </Fragment>
  )
}
