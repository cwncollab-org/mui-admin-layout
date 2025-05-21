import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AdminLayout } from '../../lib'

import { navList } from '../../navList'
import { Avatar, MenuItem } from '@mui/material'
import Person from '@mui/icons-material/Person'

export const Route = createFileRoute('/layout-provider-example/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AdminLayout
      title='Layout Provider Example'
      initialState={{
        sidebarOpen: true,
      }}
      navList={navList}
      avatar={
        <Avatar sx={{ width: 32, height: 32 }}>
          <Person />
        </Avatar>
      }
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
