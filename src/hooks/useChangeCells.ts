import { useCallback } from 'react'
import { getMinMaxIj, isInRange } from '@/utils/SheetUtils'
import { useEditorActions, useEditorValues } from '@/context/_EditorContext'
import produce from 'immer'
import { useHistory } from './useHistory'
import { ICell } from 'editor'

interface UseChangeCellsReturns {
  changeCells: ChangeCells
  changeSelectedCells: ChangeSelectedCells
}

type ChangeCells = (
  si: number,
  sj: number,
  ei: number,
  ej: number,
  changes: Partial<ICell>,
  saveHistory?: boolean,
  set?: boolean
) => void

type ChangeSelectedCells = (changes: Partial<ICell>) => void

export const useChangeCells = (): UseChangeCellsReturns => {
  const { cells, selectedArea, selectedCell } = useEditorValues()
  const { setCells } = useEditorActions()
  const { addHistory } = useHistory()

  // TODO: changeCell, setCell, setCells, setCellsWithHistory 전부 얘로 대체
  const changeCells: ChangeCells = useCallback((si, sj, ei, ej, changes, saveHistory = true, set = false) => {
    if (
      [
        [si, [0, cells.length]],
        [sj, [0, cells[si].length]],
        [ei, [0, cells.length]],
        [ej, [0, cells[ei].length]],
      ].some(([target, range]) => !isInRange(target as number, range as [number, number]))
    ) {
      return
    }
    const nextCells = produce(cells, draft => {
      const [_si, _sj, _ei, _ej] = getMinMaxIj(si, sj, ei, ej)
      for (let _i = _si; _i <= _ei; _i++) {
        for (let _j = _sj; _j <= _ej; _j++) {
          if (set) {
            draft[_i][_j] = { ...changes }
          } else {
            draft[_i][_j] = { ...draft[_i][_j], ...changes }
          }
        }
      }
    })
    setCells(nextCells)
    saveHistory && addHistory(nextCells)
  }, [])

  const changeSelectedCells: ChangeSelectedCells = useCallback(
    changes => {
      if (selectedArea.active) {
        const { si, sj, ei, ej } = selectedArea
        changeCells(si, sj, ei, ej, changes)
        return
      }
      const { i, j } = selectedCell
      changeCells(i, j, i, j, changes)
    },
    [changeCells, selectedArea, selectedCell]
  )

  return { changeCells, changeSelectedCells }
}
