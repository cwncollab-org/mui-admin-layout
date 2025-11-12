import { KeyedNavList, NavList, PlaceholderNavList } from './types'

export function isPlaceholderNavList(
  navList: NavList
): navList is PlaceholderNavList {
  return 'isPlaceholder' in navList && navList.isPlaceholder === true
}

export function generateKeyedNavList(
  navList: NavList | NavList[]
): KeyedNavList[] {
  const lists = Array.isArray(navList) ? navList : [navList]

  return lists.map((list, i) => {
    if (isPlaceholderNavList(list)) {
      return {
        isPlaceholder: true,
        title: list.title,
      }
    }

    return {
      title: list.title,
      items: list.items.map((item, j) => ({
        ...item,
        key: item.key ?? `item-${i}-${j}`,
        subitems: item.subitems?.map((subitem, k) => ({
          ...subitem,
          key: item.key ?? `subitem-${i}-${j}-${k}`,
        })),
      })),
    }
  })
}
