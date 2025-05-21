import Person from '@mui/icons-material/Person'
import { Avatar, MenuItem } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AdminLayout, useAppBarStateValue } from '../../lib'
import { navList } from '../../navList'

export const Route = createFileRoute('/layout-provider-example/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { setValue: setMenuOpen } = useAppBarStateValue('menuOpen')

  return (
    <AdminLayout
      title='Layout Provider Example'
      navList={navList}
      avatar={
        <Avatar sx={{ width: 32, height: 32 }}>
          <Person />
        </Avatar>
      }
      menuItems={[
        [
          <MenuItem dense key='account' onClick={() => setMenuOpen(false)}>
            Account
          </MenuItem>,
          <MenuItem dense key='logout' onClick={() => setMenuOpen(false)}>
            Logout
          </MenuItem>,
        ],
      ]}
    >
      <Outlet />
    </AdminLayout>
  )
}
