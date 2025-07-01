import {
  Box,
  BoxProps,
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
import { useMemo, PropsWithChildren, Fragment, useCallback } from 'react'
import { ChevronRight } from '@mui/icons-material'
import { useState } from 'react'
import { ChevronLeft } from '@mui/icons-material'
import { AppBar, AppBarInitialState, AppBarProps, AppBarState } from './AppBar'
import { NavList } from './types'
import { NavListItemButton } from './NavListItemButton'

const defaultDrawerWidth = 240
const defaultCollapsedDrawerWidth = 64

export type LayoutState = {
  sidebarOpen: boolean
  appBarState: AppBarState
}

export type LayoutInitialState = {
  sidebarOpen?: boolean
  appBarState?: AppBarInitialState
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
  navStartSlot?: React.ReactNode
  navEndSlot?: React.ReactNode
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
  sx?: SxProps
  initialState?: LayoutInitialState
  state?: LayoutState
  onStateChange?: (state: LayoutState) => void
}

export function Layout(props: LayoutProps) {
  const {
    title,
    navList = [],
    drawerWidth = defaultDrawerWidth,
    collapsedDrawerWidth = defaultCollapsedDrawerWidth,
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
    sx,
  } = props

  const [mobileOpen, setMobileOpen] = useState(false)
  const [_layoutState, setLayoutState] = useState<LayoutState>(
    initialState
      ? {
          sidebarOpen: initialState.sidebarOpen ?? true,
          appBarState: { ...initialState.appBarState, menuOpen: true },
        }
      : {
          sidebarOpen: true,
          appBarState: {
            menuOpen: true,
          },
        }
  )
  const layoutState = state ?? _layoutState
  const sidebarOpen = Boolean(layoutState.sidebarOpen)

  const navLists = Array.isArray(navList) ? navList : [navList]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleStateChange = useCallback(
    (state: LayoutState) => {
      onStateChange?.(state)
      setLayoutState(state)
    },
    [onStateChange, setLayoutState]
  )

  const handleSidebarToggle = useCallback(() => {
    handleStateChange({
      ...layoutState,
      sidebarOpen: !layoutState.sidebarOpen,
    })
  }, [layoutState, handleStateChange])

  const handleMenuOpenChange = (open: boolean) => {
    handleStateChange({
      ...layoutState,
      appBarState: { ...layoutState.appBarState, menuOpen: open },
    })
  }

  const drawerContent = useMemo(() => {
    const renderToggleSidebarToolbar = (expanded: boolean) => (
      <Toolbar
        variant={dense ? 'dense' : 'regular'}
        sx={{
          justifyContent: expanded ? 'flex-end' : 'center',
          display: { xs: 'none', sm: 'flex' },
        }}
      >
        <IconButton
          {...navSidebarToggleButtonProps}
          onClick={handleSidebarToggle}
        >
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
    )

    const renderNavSidebar = (expanded: boolean) => {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
          {sidebarTogglePosition === 'top' &&
            renderToggleSidebarToolbar(expanded)}
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {navStartSlot}
            {navLists.map((list, index) => (
              <Fragment key={`nav-list-${index}`}>
                {renderNavList(expanded, list)}
                {index < navLists.length - 1 && (
                  <Divider {...navDividerProps} />
                )}
              </Fragment>
            ))}
            {navEndSlot}
          </Box>
          {sidebarTogglePosition === 'bottom' &&
            renderToggleSidebarToolbar(expanded)}
        </Box>
      )
    }

    const renderNavList = (expanded: boolean, navList: NavList) => {
      return (
        <List dense={dense} {...navListProps}>
          {navList.title && expanded && (
            <ListSubheader
              data-subheader={navList.title}
              sx={{ lineHeight: dense ? '35px' : undefined }}
              {...navListSubheaderProps}
            >
              {navList.title}
            </ListSubheader>
          )}
          {navList.items.map((item, index) => (
            <ListItem disablePadding key={index} {...navListItemProps}>
              <Tooltip
                title={expanded ? '' : item.label}
                placement='right'
                slotProps={{
                  popper: {
                    modifiers: [
                      { name: 'offset', options: { offset: [0, -12] } },
                    ],
                  },
                }}
              >
                <NavListItemButton
                  {...navListItemButtonProps}
                  to={item.path}
                  onClick={item.onClick}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: '24px',
                    }}
                    {...navListItemIconProps}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {expanded && (
                    <ListItemText
                      sx={{
                        ml: '1rem',
                        textOverflow: 'clip',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                      {...navListItemTextProps}
                      primary={item.label}
                    />
                  )}
                </NavListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      )
    }

    return {
      expanded: renderNavSidebar(true),
      collapsed: renderNavSidebar(false),
    }
  }, [
    handleSidebarToggle,
    navLists,
    dense,
    navListProps,
    navListItemButtonProps,
  ])

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
          ModalProps={{
            keepMounted: true,
          }}
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
          {drawerContent.expanded}
        </Drawer>
        <Drawer
          variant='permanent'
          slotProps={{
            ...navDrawerProps?.slotProps,
            paper: {
              ...navDrawerProps?.slotProps?.paper,
              sx: {
                ...(navDrawerProps?.slotProps?.paper as PaperProps)?.sx,
                boxSizing: 'border-box',
                width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
                transition: 'width 0.2s',
              },
            },
          }}
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
          open={sidebarOpen}
        >
          {sidebarOpen ? drawerContent.expanded : drawerContent.collapsed}
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
