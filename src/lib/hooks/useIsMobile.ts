import { useTheme } from '@mui/material'

import { useMediaQuery } from '@mui/material'
import { useContext } from 'react'
import { layoutContext } from '../provider/layoutContext'

export function useIsMobile() {
  const theme = useTheme()
  const { mobileMaxWidth } = useContext(layoutContext)

  const width = mobileMaxWidth ?? theme.breakpoints.values.sm
  const isMobile = useMediaQuery(`(max-width: ${width}px)`)
  return isMobile
}
