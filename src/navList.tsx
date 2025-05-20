import { NavList } from './lib/layout/types'
import Form from '@mui/icons-material/Article'

export const navList: NavList = {
  items: [
    {
      icon: <Form />,
      label: 'Layout Provider Example',
      url: '/layout-provider-example',
    },
    {
      icon: <Form />,
      label: 'Not Found',
      url: '/not-found',
    },
  ],
}
