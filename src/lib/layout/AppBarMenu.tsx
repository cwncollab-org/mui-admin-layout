import { Avatar, IconButton, Menu } from '@mui/material'
import { useLayoutEffect, useRef, useState } from 'react'
import { Person as PersonIcon } from '@mui/icons-material'

export type AppBarMenuState = {
  menuOpen: boolean
}

export type AppBarMenuInitialState = AppBarMenuState

export type AppBarMenuProps = {
  dense?: boolean
  menuItems?: React.ReactNode[]
  initialState?: AppBarMenuInitialState
  state?: AppBarMenuState
  onMenuOpenChange?: (open: boolean) => void
}

export function AppBarMenu(props: AppBarMenuProps) {
  const { menuItems, initialState, state, onMenuOpenChange, dense } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [_menuOpen, setMenuOpen] = useState(initialState?.menuOpen ?? false)

  const buttonRef = useRef<HTMLButtonElement>(null)

  const menuOpen = state?.menuOpen ?? _menuOpen

  useLayoutEffect(() => {
    if (buttonRef.current) {
      setAnchorEl(buttonRef.current)
    }
  }, [buttonRef.current])

  const handleClick = () => {
    setMenuOpen(true)
    onMenuOpenChange?.(true)
  }
  const handleClose = () => {
    setMenuOpen(false)
    onMenuOpenChange?.(false)
  }

  const avatarSize = 32

  return (
    <div>
      <IconButton
        ref={buttonRef}
        color='inherit'
        aria-label='search'
        onClick={handleClick}
      >
        <Avatar sx={{ width: avatarSize, height: avatarSize }}>
          <PersonIcon fontSize={dense ? 'small' : 'medium'} />
        </Avatar>
      </IconButton>
      {menuItems && (
        <Menu open={menuOpen} onClose={handleClose} anchorEl={anchorEl}>
          {menuItems}
        </Menu>
      )}
    </div>
  )
}
