import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

import { router } from './router'
import { RouterProvider } from '@tanstack/react-router'

const theme = createTheme({})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
