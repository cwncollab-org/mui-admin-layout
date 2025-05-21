import { Box, FormControlLabel, Switch } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { useAppBarStateValue, useLayoutStateValue } from '../../../lib'

export const Route = createFileRoute('/layout-provider-example/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { value: menuOpen, setValue: setMenuOpen } =
    useAppBarStateValue('menuOpen')
  const { value: sidebarOpen, setValue: setSidebarOpen } =
    useLayoutStateValue('sidebarOpen')

  return (
    <Box sx={{ p: 3 }}>
      <FormControlLabel
        control={
          <Switch checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
        }
        label='Menu Open'
      />
      <FormControlLabel
        control={
          <Switch
            checked={sidebarOpen}
            onChange={() => setSidebarOpen(!sidebarOpen)}
          />
        }
        label='Sidebar Open'
      />
    </Box>
  )
}
