import { NavList, PlaceholderNavList } from './types'

export function isPlaceholderNavList(
  navList: NavList
): navList is PlaceholderNavList {
  return 'isPlaceholder' in navList && navList.isPlaceholder === true
}
