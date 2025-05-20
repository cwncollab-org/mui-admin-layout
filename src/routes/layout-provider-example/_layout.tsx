import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AdminLayout } from '../../lib'

import { navList } from '../../navList'
import { MenuItem } from '@mui/material'
import { useIsMobile } from '../../lib/hooks/useIsMobile'

export const Route = createFileRoute('/layout-provider-example/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AdminLayout
      initialState={{
        sidebarOpen: true,
      }}
      navList={navList}
      menuItems={[
        [
          <MenuItem dense key='account'>
            Account
          </MenuItem>,
          <MenuItem dense key='logout'>
            Logout
          </MenuItem>,
        ],
      ]}
    >
      <Outlet />
    </AdminLayout>
  )
}
