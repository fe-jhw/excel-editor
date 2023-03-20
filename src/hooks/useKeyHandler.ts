import { EditorContext } from '@/context'
import { ReactEventHandler, useContext, useCallback, KeyboardEventHandler } from 'react'

type Dirs = 'Down' | 'Up' | 'Left' | 'Right'
type ArrowKeys = `Arrow${Dirs}`

export const useKeyHandler = () => {
  const { selected, selectArea, selectCell, redo, undo, canRedo, canUndo, copySelectedArea, paste } =
    useContext(EditorContext)

  // TODO: 보이는 곳 밖으로 나갈시에 scroll 시켜야함
  const onArrowKey: KeyboardEventHandler = useCallback(
    e => {
      if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const { i, j } = selected
        const [ni, nj] = getCellIdx(i, j, e.key as ArrowKeys)
        selectArea({ si: ni, sj: nj, ei: ni, ej: nj, active: true })
        selectCell({ i: ni, j: nj })
      }
    },
    [selectArea, selectCell, selected]
  )

  const onCopy: KeyboardEventHandler = useCallback(
    e => {
      if (e.key === 'c' && e.ctrlKey) {
        copySelectedArea('copy')
      }
    },
    [copySelectedArea]
  )
  const onCut: KeyboardEventHandler = useCallback(
    e => {
      if (e.key === 'x' && e.ctrlKey) {
        copySelectedArea('cut')
      }
    },
    [copySelectedArea]
  )
  const onPaste: KeyboardEventHandler = useCallback(
    e => {
      if (e.key === 'v' && e.ctrlKey) {
        paste()
      }
    },
    [paste]
  )
  const onUndo: KeyboardEventHandler = useCallback(
    e => {
      if (e.key === 'z' && e.ctrlKey) {
        if (canUndo) {
          undo()
        }
      }
    },
    [canUndo, undo]
  )
  const onRedo: KeyboardEventHandler = useCallback(
    e => {
      if (e.key === 'y' && e.ctrlKey) {
        if (canRedo) {
          redo()
        }
      }
    },
    [canRedo, redo]
  )
  return { onArrowKey, onCopy, onCut, onPaste, onUndo, onRedo }
}

function getCellIdx(i: number, j: number, dir: ArrowKeys) {
  switch (dir) {
    case 'ArrowDown':
      return [i + 1, j]
    case 'ArrowUp':
      return [i - 1 < 0 ? 0 : i - 1, j]
    case 'ArrowLeft':
      return [i, j - 1 < 0 ? 0 : j - 1]
    case 'ArrowRight':
      return [i, j + 1]
    default:
      return [0, 0]
  }
}
