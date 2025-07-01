import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react'
import {
  AdminLayout,
  NavList,
  useAppBarStateValue,
  useIsMobile,
} from '../../lib'
import { grouppedNavList } from '../../navList'
import { Box, Divider, Typography } from '@mui/material'

export const Route = createFileRoute('/theme-example/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { setValue: setMenuOpen } = useAppBarStateValue('menuOpen')
  const [selectedNavList, setSelectedNavList] = useState<NavList | NavList[]>(
    grouppedNavList
  )
  const isMobile = useIsMobile()

  return (
    <AdminLayout
      title='Layout Provider Example Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit'
      navList={selectedNavList}
      enableAppBar={isMobile}
      sidebarTogglePosition='bottom'
      navStartSlot={({ expanded }) => (
        <Box sx={{ p: 2 }}>
          <Typography variant='h6' sx={{ color: '#fff' }}>
            {expanded ? 'Start Slot' : 'S'}
          </Typography>
        </Box>
      )}
      navEndSlot={
        <Box>
          <Divider />
        </Box>
      }
      appBarProps={{
        enableMenu: false,
        sx: {
          bgcolor: '#4268B3',
        },
      }}
      navDrawerProps={{
        slotProps: {
          paper: {
            sx: {
              bgcolor: '#4268B3',
              color: '#fff',
            },
          },
        },
      }}
      navListSubheaderProps={{
        sx: {
          bgcolor: 'inherit',
          color: '#fff',
          position: 'relative',

          '&::before': {
            content: '""',
            position: 'absolute',
            left: 12,
            right: 12,
            top: '50%',
            height: '1px',
            borderBottom: '1px solid #fff',
            zIndex: -2,
          },
          '&::after': {
            content: 'attr(data-subheader)',
            position: 'absolute',
            bgcolor: '#4268B3',
            pl: 2,
            pr: 1,
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: -1,
          },
        },
      }}
      navListItemButtonProps={{
        sx: {
          '&.active': {
            position: 'relative',
            color: '#4268B3',
          },
          '&.active .MuiListItemIcon-root': {
            color: '#4268B3',
          },
          '&.active::before': {
            content: '""',
            position: 'absolute',
            left: 4,
            top: 0,
            right: 4,
            bottom: 0,
            bgcolor: '#fff',
            borderRadius: 1,
            zIndex: -1,
          },
        },
      }}
      navListItemIconProps={{ sx: { color: '#fff' } }}
      navDividerProps={{
        sx: { display: 'none' }, // Hide divider
      }}
      navSidebarToggleButtonProps={{
        sx: { color: '#fff' },
      }}
    >
      <Outlet />
    </AdminLayout>
  )
}
