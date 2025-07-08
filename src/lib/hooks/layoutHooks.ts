import { useContext } from 'react'
import { layoutContext } from '../provider/layoutContext'
import { LayoutState } from '../layout/types'
import { AppBarState } from '../layout/AppBar'

export function useLayoutState() {
  const { state, setState } = useContext(layoutContext)
  return { state, setState }
}

export function useLayoutStateValue<K extends keyof LayoutState>(
  key: K
): {
  value: LayoutState[K] | undefined
  setValue: (value: LayoutState[K]) => void
} {
  const { state, setState } = useLayoutState()
  return {
    value: state[key],
    setValue: (value: LayoutState[typeof key]) =>
      setState({ ...state, [key]: value }),
  }
}

export function useAppBarState() {
  const { state, setState } = useLayoutState()
  return {
    state: state.appBarState,
    setState: (value: AppBarState) =>
      setState({ ...state, appBarState: value }),
  }
}

export function useAppBarStateValue<K extends keyof AppBarState>(
  key: K
): {
  value: AppBarState[K] | undefined
  setValue: (value: AppBarState[K]) => void
} {
  const { state, setState } = useAppBarState()
  return {
    value: state?.[key],
    setValue: (value: AppBarState[typeof key]) =>
      setState({ ...state, [key]: value }),
  }
}
