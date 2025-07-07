import { NavList } from './lib/layout/types'
import Form from '@mui/icons-material/Article'

export const navList: NavList = {
  items: [
    {
      icon: <Form />,
      label: 'Layout Provider Example',
      path: '/layout-provider-example/control',
    },
    {
      icon: <Form />,
      label: 'Long Page',
      path: '/layout-provider-example/long-page',
    },
    {
      icon: <Form />,
      label: 'Themed',
      path: '/theme-example',
    },
    {
      icon: <Form />,
      label: 'With Subitems',
      subitems: [
        {
          icon: <Form />,
          label: 'Subitem 1',
        },
      ],
    },
  ],
}

export const grouppedNavList: NavList[] = [
  {
    title: 'Group1',
    items: [...navList.items],
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
  {
    title: 'Group4',
    items: [
      {
        icon: <Form />,
        label: 'Logout',
        onClick: () => {
          console.log('Logout clicked')
        },
      },
    ],
  },
]
