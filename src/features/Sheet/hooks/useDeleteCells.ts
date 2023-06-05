import { getDefaultCell, getDefaultRow, getMinMaxIj } from '@/utils/SheetUtils'
import produce from 'immer'
import { useCallback } from 'react'
import * as O from '@/utils/option'
import { useEditorValues } from '@/context/EditorContext'
import { useChangeCells } from '../../../hooks/useChangeCells'

interface UseDeleteCellsReturns {
  deleteCols: DeleteCols
  deleteRows: DeleteRows
  deleteShiftUp: DeleteShiftUp
  deleteShiftLeft: DeleteShiftLeft
}

type DeleteCols = (s: number, e: number) => void
type DeleteRows = DeleteCols
type DeleteShiftUp = (si: number, sj: number, ei: number, ej: number) => void
type DeleteShiftLeft = DeleteShiftUp

export const useDeleteCells = (): UseDeleteCellsReturns => {
  const { cells } = useEditorValues()
  const { setCellsWithHistory } = useChangeCells()
  const deleteCols: DeleteCols = useCallback(
    (sCol, eCol) => {
      const nextCells = produce(cells, draft => {
        for (let i = 0; i < cells.length; i++) {
          for (let j = sCol; j < cells[i].length; j++) {
            draft[i][j] = O.getOrElseFromUndefined(draft[i][j + eCol - sCol + 1], getDefaultCell())
          }
        }
      })
      setCellsWithHistory(nextCells)
    },
    [cells, setCellsWithHistory]
  )

  const deleteRows: DeleteRows = useCallback(
    (sRow, eRow) => {
      const nextCells = produce(cells, draft => {
        for (let i = sRow; i < cells.length; i++) {
          draft[i] = O.getOrElseFromUndefined(draft[i + eRow - sRow + 1], getDefaultRow(cells[i].length))
        }
      })
      setCellsWithHistory(nextCells)
    },
    [cells, setCellsWithHistory]
  )

  const deleteShiftUp: DeleteShiftUp = useCallback(
    (si, sj, ei, ej) => {
      const [_si, _sj, _ei, _ej] = getMinMaxIj(si, sj, ei, ej)
      const nextCells = produce(cells, draft => {
        for (let j = _sj; j <= _ej; j++) {
          for (let i = _si; i < cells.length - (_ei - _si + 1); i++) {
            draft[i][j] = draft[i + _ei - _si + 1][j]
          }
          for (let i = cells.length - (_ei - _si); i < cells.length; i++) {
            draft[i][j] = getDefaultCell()
          }
        }
      })
      setCellsWithHistory(nextCells)
    },
    [cells, setCellsWithHistory]
  )

  const deleteShiftLeft: DeleteShiftLeft = useCallback(
    (si, sj, ei, ej) => {
      const [_si, _sj, _ei, _ej] = getMinMaxIj(si, sj, ei, ej)
      const nextCells = produce(cells, draft => {
        for (let i = _si; i <= _ei; i++) {
          for (let j = _sj; j < cells.length; j++) {
            draft[i][j] = O.getOrElseFromUndefined(draft[i][j + _ej - _sj + 1], getDefaultCell())
          }
        }
      })
      setCellsWithHistory(nextCells)
    },
    [cells, setCellsWithHistory]
  )

  return { deleteCols, deleteRows, deleteShiftLeft, deleteShiftUp }
}
