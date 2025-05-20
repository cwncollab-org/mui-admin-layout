import Form from '@mui/icons-material/Article'
import Home from '@mui/icons-material/Home'
import { MenuItem, Typography } from '@mui/material'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppLayout, NavList } from '../lib/layout'
import { useState } from 'react'

const navList: NavList = {
  items: [
    {
      icon: <Home />,
      label: 'Home',
      url: '/',
    },
    {
      icon: <Form />,
      label: 'Layout Example',
      url: '/layout-example',
    },
  ],
}

export const Route = createRootRoute({
  component: RouteComponent,
})

function RouteComponent() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuOpenChange = (open: boolean) => {
    setMenuOpen(open)
  }

  return (
    <AppLayout
      title={<Typography variant='h6'>Demo App</Typography>}
      menuItems={[
        <MenuItem
          key='logout'
          dense
          onClick={() => {
            setMenuOpen(false)
          }}
        >
          Logout
        </MenuItem>,
      ]}
      navList={navList}
      dense
      slotProps={{}}
      initialState={{
        menuOpen: true,
      }}
      state={{
        menuOpen,
        onMenuOpenChange: handleMenuOpenChange,
      }}
    >
      <Outlet />
      <TanStackRouterDevtools />
    </AppLayout>
  )
}
