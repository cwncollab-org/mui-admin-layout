import {
  Box,
  CollapseProps,
  Divider,
  DividerProps,
  IconButtonProps,
  ListItemButtonProps,
  ListItemIconProps,
  ListItemProps,
  ListItemTextProps,
  ListProps,
  ListSubheaderProps,
} from '@mui/material'
import { Fragment } from 'react'
import { KeyedNavItem, KeyedNavList, LayoutState } from './types'
import { SidebarToggle } from './SidebarToggle'
import { NavList } from './NavList'

export type SidebarContentProps = {
  expanded: boolean
  navLists: KeyedNavList[]
  layoutState: LayoutState
  onToggleSubmenu: (item: KeyedNavItem) => void
  onSidebarToggle: () => void
  dense?: boolean
  sidebarTogglePosition: 'top' | 'bottom'
  navStartSlot?:
    | React.ReactNode
    | ((state: { expanded: boolean }) => React.ReactNode)
  navEndSlot?:
    | React.ReactNode
    | ((state: { expanded: boolean }) => React.ReactNode)
  navListProps?: ListProps
  navListSubheaderProps?: ListSubheaderProps
  navListItemProps?: ListItemProps
  navListItemButtonProps?: Omit<ListItemButtonProps, 'to' | 'onClick'>
  navListItemIconProps?: ListItemIconProps
  navListItemTextProps?: ListItemTextProps
  navListSubitemButtonProps?: Pick<ListItemButtonProps, 'sx'>
  navCollapseProps?: Omit<CollapseProps, 'in'>
  navDividerProps?: Omit<DividerProps, 'orientation' | 'flexItem'>
  navSidebarToggleButtonProps?: Omit<IconButtonProps, 'onClick'>
}

export function SidebarContent({
  expanded,
  navLists,
  layoutState,
  onToggleSubmenu,
  onSidebarToggle,
  dense,
  sidebarTogglePosition,
  navStartSlot,
  navEndSlot,
  navListProps,
  navListSubheaderProps,
  navListItemProps,
  navListItemButtonProps,
  navListItemIconProps,
  navListItemTextProps,
  navListSubitemButtonProps,
  navCollapseProps,
  navDividerProps,
  navSidebarToggleButtonProps,
}: SidebarContentProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 1,
      }}
    >
      {sidebarTogglePosition === 'top' && (
        <SidebarToggle
          expanded={expanded}
          dense={dense}
          onToggle={onSidebarToggle}
          navSidebarToggleButtonProps={navSidebarToggleButtonProps}
        />
      )}

      <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {typeof navStartSlot === 'function'
          ? navStartSlot({ expanded })
          : navStartSlot}

        {navLists.map((list, index) => (
          <Fragment key={`nav-list-${index}`}>
            <NavList
              navList={list}
              expanded={expanded}
              layoutState={layoutState}
              onToggleSubmenu={onToggleSubmenu}
              dense={dense}
              navListProps={navListProps}
              navListSubheaderProps={navListSubheaderProps}
              navListItemProps={navListItemProps}
              navListItemButtonProps={navListItemButtonProps}
              navListItemIconProps={navListItemIconProps}
              navListItemTextProps={navListItemTextProps}
              navListSubitemButtonProps={navListSubitemButtonProps}
              navCollapseProps={navCollapseProps}
            />
            {index < navLists.length - 1 && <Divider {...navDividerProps} />}
          </Fragment>
        ))}

        {typeof navEndSlot === 'function'
          ? navEndSlot({ expanded })
          : navEndSlot}
      </Box>

      {sidebarTogglePosition === 'bottom' && (
        <SidebarToggle
          expanded={expanded}
          dense={dense}
          onToggle={onSidebarToggle}
          navSidebarToggleButtonProps={navSidebarToggleButtonProps}
        />
      )}
    </Box>
  )
}
