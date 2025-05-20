import { Box, FormControlLabel, Stack, Switch } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import {
  useAppBarStateValue,
  useAppBarStateSetter,
  useLayoutStateSetter,
} from '../../../lib/provider/layoutHooks'
import { useLayoutStateValue } from '../../../lib/provider/layoutHooks'

export const Route = createFileRoute('/layout-provider-example/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  const dense = useLayoutStateValue('dense')
  const setDense = useLayoutStateSetter('dense')
  const menuOpen = useAppBarStateValue('menuOpen')
  const setMenuOpen = useAppBarStateSetter('menuOpen')

  return (
    <Box sx={{ p: 3 }}>
      <Stack>
        <FormControlLabel
          control={<Switch checked={dense} onChange={() => setDense(!dense)} />}
          label='Dense'
        />
        <FormControlLabel
          control={
            <Switch
              checked={menuOpen}
              onChange={() => setMenuOpen(!menuOpen)}
            />
          }
          label='Menu Open'
        />
      </Stack>
    </Box>
  )
}
