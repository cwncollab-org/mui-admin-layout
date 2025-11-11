import {
  Box,
  BoxProps,
  CollapseProps,
  DividerProps,
  Drawer,
  DrawerProps,
  IconButtonProps,
  ListItemButtonProps,
  ListItemIconProps,
  ListItemProps,
  ListItemTextProps,
  ListProps,
  ListSubheaderProps,
  PaperProps,
  SxProps,
  Toolbar,
} from '@mui/material'
import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { AppBar, AppBarProps } from './AppBar'
import {
  KeyedNavItem,
  KeyedNavList,
  LayoutInitialState,
  LayoutState,
  NavList,
} from './types'
import { SidebarContent, SidebarContentProps } from './SidebarContent'

const DEFAULT_DRAWER_WIDTH = 240
const DEFAULT_COLLAPSED_DRAWER_WIDTH = 64

const createDefaultLayoutState = (
  initialState?: LayoutInitialState
): LayoutState => ({
  sidebarOpen: initialState?.sidebarOpen ?? true,
  appBarState: { ...initialState?.appBarState, menuOpen: true },
  submenuOpen: initialState?.submenuOpen ?? {},
})

export type LayoutProps = PropsWithChildren & {
  title?: string | React.ReactNode
  navList?: NavList | NavList[]
  dense?: boolean
  drawerWidth?: number
  collapsedDrawerWidth?: number
  sidebarTogglePosition?: SidebarContentProps['sidebarTogglePosition']
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
  const navLists = useMemo(() => generateKeyedNavList(navList), [navList])

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
      submenuOpen: {}, // Reset submenu state when toggling sidebar
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
    (item: KeyedNavItem) => {
      const itemKey = item.key
      handleStateChange({
        ...layoutState,
        submenuOpen: {
          ...layoutState.submenuOpen,
          [itemKey]: !layoutState.submenuOpen[itemKey],
        },
      })
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

function generateKeyedNavList(navList: NavList | NavList[]): KeyedNavList[] {
  const lists = Array.isArray(navList) ? navList : [navList]
  return lists.map((list, i) => ({
    items: !('isPlaceholder' in list)
      ? list.items.map((item, j) => ({
          ...item,
          key: item.key ?? `item-${i}-${j}`,
          subitems: item.subitems?.map((subitem, k) => ({
            ...subitem,
            key: item.key ?? `subitem-${i}-${j}-${k}`,
          })),
        }))
      : [],
    title: list.title,
    ...('isPlaceholder' in list ? { isPlaceholder: list.isPlaceholder } : {}),
  }))
}
