import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main' }} />
        <Typography variant='h1' component='h1' gutterBottom>
          404
        </Typography>
        <Typography variant='h4' component='h2' gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant='body1' color='text.secondary' paragraph>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant='text'
          color='primary'
          size='large'
          onClick={() => navigate({ to: '/' })}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
