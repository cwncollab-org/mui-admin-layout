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
      path: '/theme-example/example',
    },
    {
      icon: <Form />,
      label: 'With Submenu',
      subitems: [
        {
          icon: <Form />,
          label: 'Subitem 1',
          path: '/layout-provider-example/with-submenu/subitem1',
        },
        {
          icon: <Form />,
          label: 'Subitem 2',
          path: '/layout-provider-example/with-submenu/subitem2',
        },
      ],
    },
    {
      icon: <Form />,
      label: 'Themed With Submenu',
      subitems: [
        {
          icon: <Form />,
          label: 'Subitem 1',
          path: '/theme-example/with-submenu/subitem1',
        },
        {
          icon: <Form />,
          label: 'Subitem 2',
          path: '/theme-example/with-submenu/subitem2',
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
