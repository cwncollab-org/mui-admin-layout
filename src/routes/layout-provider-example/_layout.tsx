import Person from '@mui/icons-material/Person'
import { Avatar, MenuItem } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AdminLayout, NavList, useAppBarStateValue } from '../../lib'
import { navList, grouppedNavList } from '../../navList'
import { useState } from 'react'

export const Route = createFileRoute('/layout-provider-example/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { setValue: setMenuOpen } = useAppBarStateValue('menuOpen')
  const [selectedNavList, setSelectedNavList] = useState<NavList | NavList[]>(
    grouppedNavList
  )

  return (
    <AdminLayout
      title='Layout Provider Example'
      navList={selectedNavList}
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
          <MenuItem
            dense
            key='groupped'
            onClick={() => setSelectedNavList(grouppedNavList)}
          >
            Groupped Menu
          </MenuItem>,
          <MenuItem
            dense
            key='single'
            onClick={() => setSelectedNavList(navList)}
          >
            Single Menu
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
