import {
  Box,
  IconButton,
  AppBar as MuiAppBar,
  SxProps,
  Toolbar,
  Typography,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import {
  AppBarMenu,
  AppBarMenuInitialState,
  AppBarMenuState,
} from './AppBarMenu'

export type AppBarState = AppBarMenuState
export type AppBarInitialState = AppBarMenuInitialState

export type AppBarProps = {
  title?: string | React.ReactNode
  status?: string | React.ReactNode
  sidebarOpen: boolean
  drawerWidth: number
  collapsedDrawerWidth: number
  dense?: boolean
  onDrawerToggle: () => void
  endSlot?: React.ReactNode
  menuItems?: React.ReactNode[]
  initialState?: AppBarInitialState
  state?: AppBarState
  sx?: SxProps
}

export function AppBar(props: AppBarProps) {
  const {
    title,
    sidebarOpen,
    drawerWidth,
    collapsedDrawerWidth,
    dense,
    onDrawerToggle,
    endSlot,
    menuItems,
    initialState,
    state,
    sx,
  } = props

  const renderedEndSlot = endSlot ?? (
    <AppBarMenu
      menuItems={menuItems}
      initialState={initialState}
      state={state}
    />
  )

  return (
    <MuiAppBar
      position='fixed'
      sx={{
        ...sx,
        width: {
          sm: `calc(100% - ${
            sidebarOpen ? drawerWidth : collapsedDrawerWidth
          }px)`,
        },
        ml: { sm: `${sidebarOpen ? drawerWidth : collapsedDrawerWidth}px` },
        transition: 'width 0.2s, margin-left 0.2s',
      }}
    >
      <Toolbar variant={dense ? 'dense' : 'regular'}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={() => onDrawerToggle()}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        {typeof title === 'string' ? (
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        ) : (
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        )}
        {renderedEndSlot && <Box>{renderedEndSlot}</Box>}
      </Toolbar>
    </MuiAppBar>
  )
}
