# mui-admin-layout

> **Note**: This documentation was generated with the assistance of AI. While we strive for accuracy, please verify any code examples or implementation details in your specific use case.

A Material-UI based admin layout component library for React applications. 


## Installation

```bash
npm install @cwncollab-org/mui-admin-layout
# or
yarn add @cwncollab-org/mui-admin-layout
# or
pnpm add @cwncollab-org/mui-admin-layout
```

## Usage

Here's a basic example of how to use the AdminLayout component:

```tsx
import { AdminLayout, AdminLayoutProvider } from '@cwncollab-org/mui-admin-layout'
import { MenuItem, ThemeProvider, createTheme, Avatar, CssBaseline } from '@mui/material'
import { Form, Person } from '@mui/icons-material'
import { Outlet } from '@tanstack/react-router'
import { useAppBarStateValue } from '@cwncollab-org/mui-admin-layout'

// Create a theme instance
const theme = createTheme({
  // You can customize your theme here
})

// Define your navigation list
export const navList = {
  items: [
    {
      icon: <Form />,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <Form />,
      label: 'Users',
      path: '/users',
    },
  ],
}

// Create a separate layout component
function MainLayout() {
  const { setValue: setMenuOpen } = useAppBarStateValue('menuOpen')

  return (
    <AdminLayout
      title="My Admin App"
      navList={navList}
      avatar={
        <Avatar sx={{ width: 32, height: 32 }}>
          <Person />
        </Avatar>
      }
      menuItems={[
        [
          <MenuItem 
            dense 
            key="account" 
            onClick={() => setMenuOpen(false)}
          >
            Account
          </MenuItem>,
          <MenuItem 
            dense 
            key="logout" 
            onClick={() => setMenuOpen(false)}
          >
            Logout
          </MenuItem>,
        ],
      ]}
    >
      {/* Your page content goes here */}
      <Outlet />
    </AdminLayout>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminLayoutProvider mobileMaxWidth={600}>
        <MainLayout />
      </AdminLayoutProvider>
    </ThemeProvider>
  )
}
```

### Using Layout State

You can control the layout state using the provided hooks:

```tsx
import { useAppBarStateValue, useLayoutStateValue } from '@cwncollab-org/mui-admin-layout'
import { Box, FormControlLabel, Stack, Switch } from '@mui/material'

function LayoutControls() {
  const { value: menuOpen, setValue: setMenuOpen } = useAppBarStateValue('menuOpen')
  const { value: sidebarOpen, setValue: setSidebarOpen } = useLayoutStateValue('sidebarOpen')

  return (
    <Box sx={{ p: 3 }}>
      <Stack>
        <FormControlLabel
          control={
            <Switch
              checked={menuOpen}
              onChange={() => setMenuOpen(!menuOpen)}
            />
          }
          label="Menu Open"
        />
        <FormControlLabel
          control={
            <Switch
              checked={sidebarOpen}
              onChange={() => setSidebarOpen(!sidebarOpen)}
            />
          }
          label="Sidebar Open"
        />
      </Stack>
    </Box>
  )
}
```

## License

MIT