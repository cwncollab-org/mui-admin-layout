import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Box,
  BoxProps,
  Collapse,
  CollapseProps,
  Divider,
  DividerProps,
  Drawer,
  DrawerProps,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  ListItemButtonProps,
  ListItemIcon,
  ListItemIconProps,
  ListItemProps,
  ListItemText,
  ListItemTextProps,
  ListProps,
  ListSubheader,
  ListSubheaderProps,
  PaperProps,
  SxProps,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { Fragment, PropsWithChildren, useCallback, useState } from 'react'
import { AppBar, AppBarInitialState, AppBarProps, AppBarState } from './AppBar'
import { NavListItemButton } from './NavListItemButton'
import { NavItem, NavList } from './types'

// Constants
const DEFAULT_DRAWER_WIDTH = 240
const DEFAULT_COLLAPSED_DRAWER_WIDTH = 64

// Helper functions
const getItemKey = (item: NavItem): string => item.key ?? item.label

const createDefaultLayoutState = (
  initialState?: LayoutInitialState
): LayoutState => ({
  sidebarOpen: initialState?.sidebarOpen ?? true,
  appBarState: { ...initialState?.appBarState, menuOpen: true },
  submenuOpen: initialState?.submenuOpen ?? {},
})

// Types
export type LayoutState = {
  sidebarOpen: boolean
  appBarState: AppBarState
  submenuOpen: Record<string, boolean>
}

export type LayoutInitialState = {
  sidebarOpen?: boolean
  appBarState?: AppBarInitialState
  submenuOpen?: Record<string, boolean>
}

export type LayoutProps = PropsWithChildren & {
  title?: string | React.ReactNode
  navList?: NavList | NavList[]
  dense?: boolean
  drawerWidth?: number
  collapsedDrawerWidth?: number
  sidebarTogglePosition?: 'top' | 'bottom'
  enableAppBar?: boolean
  menuItems?: React.ReactNode[]
  navStartSlot?:
    | React.ReactNode
    | ((state: { expanded: boolean }) => React.ReactNode)
  navEndSlot?:
    | React.ReactNode
    | ((state: { expanded: boolean }) => React.ReactNode)
  appBarProps?: Omit<
    AppBarProps,
    | 'title'
    | 'status'
    | 'sidebarOpen'
    | 'drawerWidth'
    | 'collapsedDrawerWidth'
    | 'onDrawerToggle'
  >
  mainProps?: BoxProps
  navDrawerProps?: Omit<DrawerProps, 'variant' | 'open' | 'onClose'>
  navListProps?: ListProps
  navListItemProps?: ListItemProps
  navListSubheaderProps?: ListSubheaderProps
  navListItemButtonProps?: Omit<ListItemButtonProps, 'to' | 'onClick'>
  navListItemIconProps?: ListItemIconProps
  navListItemTextProps?: ListItemTextProps
  navDividerProps?: Omit<DividerProps, 'orientation' | 'flexItem'>
  navSidebarToggleButtonProps?: Omit<IconButtonProps, 'onClick'>
  navListSubitemButtonProps?: Pick<ListItemButtonProps, 'sx'>
  navCollapseProps?: Omit<CollapseProps, 'in'>
  sx?: SxProps
  initialState?: LayoutInitialState
  state?: LayoutState
  onStateChange?: (state: LayoutState) => void
}

// Helper Components
type NavListItemProps = {
  item: NavItem
  expanded: boolean
  layoutState: LayoutState
  onToggleSubmenu: (e: React.MouseEvent<HTMLDivElement>, item: NavItem) => void
  navListItemProps?: ListItemProps
  navListItemButtonProps?: Omit<ListItemButtonProps, 'to' | 'onClick'>
  navListItemIconProps?: ListItemIconProps
  navListItemTextProps?: ListItemTextProps
  sx?: SxProps<any>
}

function NavListItem({
  item,
  expanded,
  layoutState,
  onToggleSubmenu,
  navListItemProps,
  navListItemButtonProps,
  navListItemIconProps,
  navListItemTextProps,
  sx,
}: NavListItemProps) {
  const itemKey = getItemKey(item)
  const hasSubmenu = Boolean(item.subitems?.length)

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
          to={item.path}
          onClick={hasSubmenu ? e => onToggleSubmenu(e, item) : item.onClick}
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

          {hasSubmenu &&
            (layoutState.submenuOpen[itemKey] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            ))}
        </NavListItemButton>
      </Tooltip>
    </ListItem>
  )
}

type SidebarToggleProps = {
  expanded: boolean
  dense?: boolean
  onToggle: () => void
  navSidebarToggleButtonProps?: Omit<IconButtonProps, 'onClick'>
}

function SidebarToggle({
  expanded,
  dense,
  onToggle,
  navSidebarToggleButtonProps,
}: SidebarToggleProps) {
  return (
    <Toolbar
      variant={dense ? 'dense' : 'regular'}
      sx={{
        justifyContent: expanded ? 'flex-end' : 'center',
        display: { xs: 'none', sm: 'flex' },
      }}
    >
      <IconButton {...navSidebarToggleButtonProps} onClick={onToggle}>
        {expanded ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Toolbar>
  )
}

type NavigationListProps = {
  navList: NavList
  expanded: boolean
  layoutState: LayoutState
  onToggleSubmenu: (e: React.MouseEvent<HTMLDivElement>, item: NavItem) => void
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

function NavigationList({
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
}: NavigationListProps) {
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
      {navList.items.map((item, index) => {
        const itemKey = getItemKey(item)
        const expandedSubmenu = Boolean(layoutState.submenuOpen[itemKey])

        return (
          <Fragment key={`nav-item-${index}`}>
            <NavListItem
              item={item}
              expanded={expanded}
              layoutState={layoutState}
              onToggleSubmenu={onToggleSubmenu}
              navListItemProps={navListItemProps}
              navListItemButtonProps={navListItemButtonProps}
              navListItemIconProps={navListItemIconProps}
              navListItemTextProps={navListItemTextProps}
            />
            {item.subitems?.length && (
              <Collapse in={expandedSubmenu} {...navCollapseProps}>
                <List dense={dense} component='div' disablePadding>
                  {item.subitems.map((subitem, subIndex) => (
                    <Fragment key={`nav-subitem-${subIndex}`}>
                      <NavListItem
                        item={subitem}
                        expanded={expanded}
                        layoutState={layoutState}
                        onToggleSubmenu={onToggleSubmenu}
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
          </Fragment>
        )
      })}
    </List>
  )
}

type SidebarContentProps = {
  expanded: boolean
  navLists: NavList[]
  layoutState: LayoutState
  onToggleSubmenu: (e: React.MouseEvent<HTMLDivElement>, item: NavItem) => void
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

function SidebarContent({
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
            <NavigationList
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

// Main Layout Component
export function Layout(props: LayoutProps) {
  const {
    title,
    navList = [],
    drawerWidth = DEFAULT_DRAWER_WIDTH,
    collapsedDrawerWidth = DEFAULT_COLLAPSED_DRAWER_WIDTH,
    dense,
    children,
    sidebarTogglePosition = 'top',
    enableAppBar = true,
    menuItems,
    initialState,
    state,
    onStateChange,
    navStartSlot,
    navEndSlot,
    appBarProps,
    mainProps,
    navDrawerProps,
    navListProps,
    navListItemProps,
    navListSubheaderProps,
    navListItemButtonProps,
    navListItemIconProps,
    navListItemTextProps,
    navDividerProps,
    navSidebarToggleButtonProps,
    navListSubitemButtonProps,
    navCollapseProps,
    sx,
  } = props

  const [mobileOpen, setMobileOpen] = useState(false)
  const [_layoutState, setLayoutState] = useState<LayoutState>(() =>
    createDefaultLayoutState(initialState)
  )

  const layoutState = state ?? _layoutState
  const sidebarOpen = Boolean(layoutState.sidebarOpen)
  const navLists = Array.isArray(navList) ? navList : [navList]

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen)
  }, [mobileOpen])

  const handleStateChange = useCallback(
    (state: LayoutState) => {
      onStateChange?.(state)
      setLayoutState(state)
    },
    [onStateChange]
  )

  const handleSidebarToggle = useCallback(() => {
    handleStateChange({
      ...layoutState,
      sidebarOpen: !layoutState.sidebarOpen,
    })
  }, [layoutState, handleStateChange])

  const handleMenuOpenChange = useCallback(
    (open: boolean) => {
      handleStateChange({
        ...layoutState,
        appBarState: { ...layoutState.appBarState, menuOpen: open },
      })
    },
    [layoutState, handleStateChange]
  )

  const handleToggleSubmenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, item: NavItem) => {
      item?.onClick?.(e)
      if (!e.isPropagationStopped()) {
        const itemKey = getItemKey(item)
        handleStateChange({
          ...layoutState,
          submenuOpen: {
            ...layoutState.submenuOpen,
            [itemKey]: !layoutState.submenuOpen[itemKey],
          },
        })
      }
    },
    [layoutState, handleStateChange]
  )

  const sidebarContentProps = {
    layoutState,
    onToggleSubmenu: handleToggleSubmenu,
    onSidebarToggle: handleSidebarToggle,
    navLists,
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
  }

  const { sx: mainSx, ...mainRest } = mainProps ?? {}

  return (
    <Box sx={{ display: 'flex', height: '100vh', ...sx }}>
      {enableAppBar && (
        <AppBar
          dense={dense}
          {...appBarProps}
          title={title}
          sidebarOpen={sidebarOpen}
          drawerWidth={drawerWidth}
          collapsedDrawerWidth={collapsedDrawerWidth}
          onDrawerToggle={handleDrawerToggle}
          menuItems={menuItems}
          state={layoutState?.appBarState}
          onMenuOpenChange={handleMenuOpenChange}
        />
      )}

      <Box
        component='nav'
        sx={{
          width: { sm: sidebarOpen ? drawerWidth : collapsedDrawerWidth },
          flexShrink: { sm: 0 },
          transition: 'width 0.2s',
        }}
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            ...navDrawerProps?.slotProps,
            paper: {
              ...navDrawerProps?.slotProps?.paper,
              sx: {
                ...(navDrawerProps?.slotProps?.paper as PaperProps)?.sx,
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            },
          }}
          sx={{
            ...navDrawerProps?.sx,
            display: { xs: 'block', sm: 'none' },
          }}
        >
          <SidebarContent {...sidebarContentProps} expanded={true} />
        </Drawer>

        <Drawer
          variant='permanent'
          open={sidebarOpen}
          slotProps={{
            ...navDrawerProps?.slotProps,
            paper: {
              ...navDrawerProps?.slotProps?.paper,
              sx: {
                boxSizing: 'border-box',
                width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
                transition: 'width 0.2s',
                ...(navDrawerProps?.slotProps?.paper as PaperProps)?.sx,
              },
            },
          }}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          <SidebarContent {...sidebarContentProps} expanded={sidebarOpen} />
        </Drawer>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          p: 0,
          width: {
            sm: `calc(100% - ${
              sidebarOpen ? drawerWidth : collapsedDrawerWidth
            }px)`,
          },
          transition: 'width 0.2s',
          overflowX: 'hidden',
        }}
      >
        {enableAppBar && (
          <Toolbar
            variant={dense ? 'dense' : 'regular'}
            sx={{ flexShrink: 0 }}
          />
        )}
        <Box
          component='main'
          {...mainRest}
          sx={{ flexGrow: 1, overflowY: 'auto', ...mainSx }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
