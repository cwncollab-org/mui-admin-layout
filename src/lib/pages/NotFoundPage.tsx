import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'

export function NotFoundPage() {
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

export default NotFoundPage
