import { useContext } from 'react'
import { layoutContext } from './layoutContext'
import { LayoutState } from '../layout/Layout'
import { AppBarState } from '../layout/AppBar'

export function useLayoutState() {
  const { state, setState } = useContext(layoutContext)
  return { state, setState }
}

export function useLayoutStateValue<K extends keyof LayoutState>(
  key: K
): LayoutState[K] {
  const { state } = useLayoutState()
  return state[key]
}

export function useLayoutStateSetter(key: keyof LayoutState) {
  const { setState } = useLayoutState()
  return (value: LayoutState[typeof key]) => setState({ [key]: value })
}

export function useAppBarState() {
  const { state, setState } = useLayoutState()
  return {
    state: state.appBarState,
    setState: (value: AppBarState) =>
      setState({ ...value, appBarState: value }),
  }
}

export function useAppBarStateValue<K extends keyof AppBarState>(
  key: K
): AppBarState[K] | undefined {
  const { state } = useAppBarState()
  return state?.[key]
}

export function useAppBarStateSetter(key: keyof AppBarState) {
  const { setState } = useAppBarState()
  return (value: AppBarState[typeof key]) => setState({ [key]: value })
}
