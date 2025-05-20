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

export type AppLayoutState = AppBarState
export type AppLayoutInitialState = AppBarInitialState

export type AdminLayoutProps = PropsWithChildren & {
  title?: string | React.ReactNode
  navList?: NavList | NavList[]
  drawerWidth?: number
  collapsedDrawerWidth?: number
  dense?: boolean
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
  initialState?: AppLayoutInitialState
  state?: AppLayoutState
  sx?: SxProps
}

export function AdminLayout(props: AdminLayoutProps) {
  const {
    title,
    navList = [],
    drawerWidth = defaultDrawerWidth,
    collapsedDrawerWidth = defaultCollapsedDrawerWidth,
    dense,
    children,
    slotProps,
    menuItems,
    initialState,
    state,
    sx,
  } = props

  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

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

  const drawerContent = useMemo(() => {
    const renderNavSidebar = (expanded: boolean) => {
      return (
        <div>
          <Toolbar
            variant={dense ? 'dense' : 'regular'}
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
      <List dense={dense} {...slotProps?.list}>
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
        dense={dense}
        {...slotProps?.appBar}
        title={title}
        sidebarOpen={sidebarOpen}
        drawerWidth={drawerWidth}
        collapsedDrawerWidth={collapsedDrawerWidth}
        onDrawerToggle={handleDrawerToggle}
        menuItems={menuItems}
        initialState={initialState}
        state={state}
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
        <Toolbar variant={dense ? 'dense' : 'regular'} />
        {children}
      </Box>
    </Box>
  )
}
