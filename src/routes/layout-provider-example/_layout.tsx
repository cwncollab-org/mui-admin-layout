import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AdminLayout, useAdminLayoutState } from '../../lib'

import { navList } from '../../navList'
import { MenuItem } from '@mui/material'

export const Route = createFileRoute('/layout-provider-example/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AdminLayout
      navList={navList}
      menuItems={[
        [
          <MenuItem key='account'>Account</MenuItem>,
          <MenuItem key='logout'>Logout</MenuItem>,
        ],
      ]}
    >
      <Outlet />
    </AdminLayout>
  )
}
