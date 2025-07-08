import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { IconButton, IconButtonProps, Toolbar } from '@mui/material'

export type SidebarToggleProps = {
  expanded: boolean
  dense?: boolean
  onToggle: () => void
  navSidebarToggleButtonProps?: Omit<IconButtonProps, 'onClick'>
}

export function SidebarToggle({
  expanded,
  dense,
  onToggle,
  navSidebarToggleButtonProps,
}: SidebarToggleProps) {
  return (
    <Toolbar
      variant={dense ? 'dense' : 'regular'}
      sx={{
        justifyContent: expanded ? 'flex-end' : 'center',
        display: { xs: 'none', sm: 'flex' },
      }}
    >
      <IconButton {...navSidebarToggleButtonProps} onClick={onToggle}>
        {expanded ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Toolbar>
  )
}
