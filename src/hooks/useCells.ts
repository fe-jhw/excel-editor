import { ICell } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import produce from 'immer'
import { CCell, defaultCell, defaultCells, getDefaultCell, getDefaultRow } from '@/constants/SheetConstants'
import { getMinMaxIj, isInRange } from '@/utils/SheetUtils'
import * as O from '@/utils/option'
import { useHistory, UseHistoryReturns } from './useHistory'

export interface UseCellsReturns extends UseHistoryReturns {
  cells: ICell[][]
  changeCell: ChangeCell
  changeCells: ChangeCells
  setCell: SetCell
  setCells: React.Dispatch<React.SetStateAction<ICell[][]>>
  insertRowAbove: InsertRow
  insertRowBelow: InsertRow
  insertColLeft: InsertCol
  insertColRight: InsertCol
  deleteCols: DeleteCols
  deleteRows: DeleteRows
  deleteShiftUp: DeleteShiftUp
  deleteShiftLeft: DeleteShiftLeft
}

type InsertCol = (col: number) => void
type InsertRow = (row: number) => void
type DeleteCols = (s: number, e: number) => void
type DeleteRows = DeleteCols
type DeleteShiftUp = (si: number, sj: number, ei: number, ej: number) => void
type DeleteShiftLeft = DeleteShiftUp
type ChangeCell = (i: number, j: number, changes: Partial<ICell>) => void
type ChangeCells = (si: number, sj: number, ei: number, ej: number, changes: Partial<ICell>) => void
type SetCell = (i: number, j: number, cell: ICell) => void

export const useCells = (): UseCellsReturns => {
  const [cells, setCells] = useState<ICell[][]>(defaultCells)
  const { canRedo, canUndo, redo, undo, addHistory, addHistoryWithDebounce } = useHistory({ setCells })

  const changeCell: ChangeCell = (i, j, changes) => {
    const nextCells = produce(cells, draft => {
      if (isInRange(i, [0, cells.length]) && isInRange(j, [0, cells[i].length])) {
        draft[i][j] = { ...draft[i][j], ...changes }
      }
    })
    setCells(nextCells)
    // input value 변경시를 위해 history add에 debounce 적용
    addHistory(nextCells)
  }

  const changeCells: ChangeCells = (si, sj, ei, ej, changes) => {
    const nextCells = produce(cells, draft => {
      if (
        isInRange(si, [0, cells.length]) &&
        isInRange(sj, [0, cells[si].length]) &&
        isInRange(ei, [0, cells.length]) &&
        isInRange(ej, [0, cells[ei].length])
      ) {
        const [_si, _sj, _ei, _ej] = getMinMaxIj(si, sj, ei, ej)
        for (let _i = _si; _i <= _ei; _i++) {
          for (let _j = _sj; _j <= _ej; _j++) {
            draft[_i][_j] = { ...draft[_i][_j], ...changes }
          }
        }
      }
    })
    setCells(nextCells)
    addHistory(nextCells)
  }
  const setCell: SetCell = (i, j, cell) => {
    setCells(prev =>
      produce(prev, draft => {
        if (isInRange(i, [0, cells.length]) && isInRange(j, [0, cells[i].length])) {
          draft[i][j] = cell
        }
      })
    )
  }
  const insertRowAbove: InsertRow = useCallback(
    (row: number): void => {
      const nextCells = produce(cells, draft => {
        draft.splice(row, 0, getDefaultRow(cells[row].length))
      })
      setCells(nextCells)
      addHistory(nextCells)
    },
    [cells, setCells, addHistory]
  )
  const insertRowBelow: InsertRow = useCallback(
    (row: number): void => {
      const nextCells = produce(cells, draft => {
        draft.splice(row + 1, 0, getDefaultRow(cells[row].length))
      })
      setCells(nextCells)
      addHistory(nextCells)
    },
    [cells, setCells, addHistory]
  )
  const insertColLeft: InsertCol = useCallback(
    (col: number): void => {
      const nextCells = produce(cells, draft => {
        for (let i = 0; i < cells.length; i++) {
          draft[i].splice(col, 0, getDefaultCell())
        }
      })
      setCells(nextCells)
      addHistory(nextCells)
    },
    [cells, setCells, addHistory]
  )
  const insertColRight: InsertCol = useCallback(
    (col: number): void => {
      const nextCells = produce(cells, draft => {
        for (let i = 0; i < cells.length; i++) {
          draft[i].splice(col + 1, 0, getDefaultCell())
        }
      })
      setCells(nextCells)
      addHistory(nextCells)
    },
    [cells, setCells, addHistory]
  )

  //TODO: 중복 너무 많음 행열, 추가 삭제
  const deleteCols: DeleteCols = useCallback(
    (sCol, eCol) => {
      const nextCells = produce(cells, draft => {
        for (let i = 0; i < cells.length; i++) {
          for (let j = sCol; j < cells[i].length; j++) {
            draft[i][j] = O.getOrElseFromUndefined(draft[i][j + eCol - sCol + 1], getDefaultCell())
          }
        }
      })
      setCells(nextCells)
      addHistory(nextCells)
    },
    [cells, setCells, addHistory]
  )

  const deleteRows: DeleteRows = useCallback(
    (sRow, eRow) => {
      const nextCells = produce(cells, draft => {
        for (let i = sRow; i < cells.length; i++) {
          draft[i] = O.getOrElseFromUndefined(draft[i + eRow - sRow + 1], getDefaultRow(cells[i].length))
        }
      })
      setCells(nextCells)
      addHistory(nextCells)
    },
    [cells, setCells, addHistory]
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
      setCells(nextCells)
      addHistory(nextCells)
    },
    [cells, setCells, addHistory]
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
      setCells(nextCells)
      addHistory(nextCells)
    },
    [cells, setCells, addHistory]
  )
  return {
    cells,
    changeCell,
    changeCells,
    setCell,
    setCells,
    insertRowAbove,
    insertRowBelow,
    insertColLeft,
    insertColRight,
    deleteCols,
    deleteRows,
    deleteShiftUp,
    deleteShiftLeft,
    canRedo,
    canUndo,
    redo,
    undo,
    addHistory,
    addHistoryWithDebounce,
  }
}
