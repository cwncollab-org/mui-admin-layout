import { NavList } from './lib/layout/types'
import Form from '@mui/icons-material/Article'

export const navList: NavList = {
  items: [
    {
      icon: <Form />,
      label: 'Layout Provider Example',
      path: '/layout-provider-example',
    },
    {
      icon: <Form />,
      label: 'Not Found',
      path: '/not-found',
    },
  ],
}
