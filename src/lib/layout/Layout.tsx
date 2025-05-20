import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
  SxProps,
  Toolbar,
} from '@mui/material'
import { useMemo, PropsWithChildren, Fragment } from 'react'
import { ChevronRight } from '@mui/icons-material'
import { useState } from 'react'
import { ChevronLeft } from '@mui/icons-material'
import { Link } from '@tanstack/react-router'
import { AppBar, AppBarInitialState, AppBarProps, AppBarState } from './AppBar'
import { NavList } from './types'

const defaultDrawerWidth = 240
const defaultCollapsedDrawerWidth = 64

export type LayoutState = {
  dense?: boolean
  appBarState?: AppBarState
}

export type LayoutInitialState = {
  dense?: boolean
  appBarState?: AppBarInitialState
}

export type LayoutProps = PropsWithChildren & {
  title?: string | React.ReactNode
  navList?: NavList | NavList[]
  drawerWidth?: number
  collapsedDrawerWidth?: number
  slotProps?: {
    appBar?: Omit<
      AppBarProps,
      | 'title'
      | 'status'
      | 'sidebarOpen'
      | 'drawerWidth'
      | 'collapsedDrawerWidth'
      | 'onDrawerToggle'
    >
    list?: ListProps
  }
  menuItems?: React.ReactNode[]
  initialState?: LayoutInitialState
  state?: LayoutState
  onStateChange?: (state: LayoutState) => void
  sx?: SxProps
}

export function Layout(props: LayoutProps) {
  const {
    title,
    navList = [],
    drawerWidth = defaultDrawerWidth,
    collapsedDrawerWidth = defaultCollapsedDrawerWidth,
    children,
    slotProps,
    menuItems,
    initialState,
    state,
    onStateChange,
    sx,
  } = props

  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [_layoutState, setLayoutState] = useState<LayoutState>(
    initialState ?? {}
  )
  const layoutState = state ?? _layoutState

  const navLists = useMemo(
    () => (Array.isArray(navList) ? navList : [navList]),
    [navList]
  )

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleStateChange = (state: LayoutState) => {
    setLayoutState(state)
    onStateChange?.(state)
  }

  const handleMenuOpenChange = (open: boolean) => {
    handleStateChange({
      ...layoutState,
      appBarState: { ...layoutState.appBarState, menuOpen: open },
    })
  }

  const drawerContent = useMemo(() => {
    const renderNavSidebar = (expanded: boolean) => {
      return (
        <div>
          <Toolbar
            variant={layoutState.dense ? 'dense' : 'regular'}
            sx={{
              justifyContent: expanded ? 'flex-end' : 'center',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <IconButton onClick={handleSidebarToggle}>
              {expanded ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Toolbar>
          {navLists.map((list, index) => (
            <Fragment key={index}>{renderNavList(expanded, list)}</Fragment>
          ))}
        </div>
      )
    }

    const renderNavList = (expanded: boolean, navList: NavList) => (
      <List dense={layoutState.dense} {...slotProps?.list}>
        {navList.items.map((item, index) => (
          <ListItem
            disablePadding
            key={index}
            sx={{ justifyContent: 'center' }}
          >
            <ListItemButton
              component={item.url ? Link : 'div'}
              to={item.url}
              sx={{ justifyContent: 'center' }}
            >
              <ListItemIcon
                sx={{
                  minWidth: '24px',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {expanded && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    ml: '1rem',
                    textOverflow: 'clip',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    )

    return {
      expanded: renderNavSidebar(true),
      collapsed: renderNavSidebar(false),
    }
  }, [handleSidebarToggle, navLists])

  return (
    <Box sx={{ display: 'flex', ...sx }}>
      <AppBar
        dense={layoutState.dense}
        {...slotProps?.appBar}
        title={title}
        sidebarOpen={sidebarOpen}
        drawerWidth={drawerWidth}
        collapsedDrawerWidth={collapsedDrawerWidth}
        onDrawerToggle={handleDrawerToggle}
        menuItems={menuItems}
        state={layoutState?.appBarState}
        onMenuOpenChange={handleMenuOpenChange}
      />
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
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerContent.expanded}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
              transition: 'width 0.2s',
            },
          }}
          open={sidebarOpen}
        >
          {sidebarOpen ? drawerContent.expanded : drawerContent.collapsed}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
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
        <Toolbar variant={layoutState.dense ? 'dense' : 'regular'} />
        {children}
      </Box>
    </Box>
  )
}
