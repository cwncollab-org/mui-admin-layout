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

export const grouppedNavList: NavList[] = [
  {
    title: 'Group1',
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
  },
  {
    title: 'Group2',
    items: [
      {
        icon: <Form />,
        label: 'Not Found',
        path: '/not-found',
      },
      {
        icon: <Form />,
        label: 'Not Found',
        path: '/not-found',
      },
    ],
  },
  {
    title: 'Group3',
    items: [
      {
        icon: <Form />,
        label: 'Not Found',
        path: '/not-found',
      },
      {
        icon: <Form />,
        label: 'Not Found',
        path: '/not-found',
      },
    ],
  },
]
