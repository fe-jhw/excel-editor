import { ICell } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import produce from 'immer'
import { defaultCell, defaultCells } from '@/constants/SheetConstants'
import { getMinMaxIj, isInRange } from '@/utils/SheetUtils'
import * as O from '@/utils/option'

export interface UseCellsReturns {
  cells: ICell[][]
  changeCell: ChangeCell
  changeCells: ChangeCells
  setCell: SetCell
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

  const changeCell: ChangeCell = (i, j, changes) => {
    setCells(prev =>
      produce(prev, draft => {
        if (isInRange(i, [0, cells.length]) && isInRange(j, [0, cells[i].length])) {
          draft[i][j] = { ...draft[i][j], ...changes }
        }
      })
    )
  }
  const changeCells: ChangeCells = (si, sj, ei, ej, changes) => {
    setCells(prev =>
      produce(prev, draft => {
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
    )
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
      setCells(prev =>
        produce(prev, draft => {
          draft.splice(row, 0, new Array(prev[row].length).fill(defaultCell))
        })
      )
    },
    [setCells]
  )
  const insertRowBelow: InsertRow = useCallback(
    (row: number): void => {
      setCells(prev =>
        produce(prev, draft => {
          draft.splice(row + 1, 0, new Array(prev[row].length).fill(defaultCell))
        })
      )
    },
    [setCells]
  )
  const insertColLeft: InsertCol = useCallback(
    (col: number): void => {
      setCells(prev =>
        produce(prev, draft => {
          for (let i = 0; i < prev.length; i++) {
            draft[i].splice(col, 0, defaultCell)
          }
        })
      )
    },
    [setCells]
  )
  const insertColRight: InsertCol = useCallback(
    (col: number): void => {
      setCells(prev =>
        produce(prev, draft => {
          for (let i = 0; i < prev.length; i++) {
            draft[i].splice(col + 1, 0, defaultCell)
          }
        })
      )
    },
    [setCells]
  )

  const deleteCols: DeleteCols = useCallback(
    (sCol, eCol) => {
      setCells(prev =>
        produce(prev, draft => {
          for (let i = 0; i < prev.length; i++) {
            for (let j = sCol; j < prev[i].length; j++) {
              draft[i][j] = O.getOrElseFromUndefined(draft[i][j + eCol - sCol + 1], defaultCell)
            }
          }
        })
      )
    },
    [setCells]
  )

  const deleteRows: DeleteRows = useCallback(
    (sRow, eRow) => {
      setCells(prev =>
        produce(prev, draft => {
          for (let i = sRow; i < prev.length; i++) {
            draft[i] = O.getOrElseFromUndefined(draft[i + eRow - sRow + 1], new Array(prev[i].length).fill(defaultCell))
          }
        })
      )
    },
    [setCells]
  )

  const deleteShiftUp: DeleteShiftUp = useCallback(
    (si, sj, ei, ej) => {
      const [_si, _sj, _ei, _ej] = getMinMaxIj(si, sj, ei, ej)
      setCells(prev =>
        produce(prev, draft => {
          for (let j = _sj; j <= _ej; j++) {
            for (let i = _si; i < prev.length - (_ei - _si + 1); i++) {
              draft[i][j] = draft[i + _ei - _si + 1][j]
            }
            for (let i = prev.length - (_ei - _si); i < prev.length; i++) {
              draft[i][j] = defaultCell
            }
          }
        })
      )
    },
    [setCells]
  )

  const deleteShiftLeft: DeleteShiftLeft = useCallback(
    (si, sj, ei, ej) => {
      const [_si, _sj, _ei, _ej] = getMinMaxIj(si, sj, ei, ej)
      setCells(prev =>
        produce(prev, draft => {
          for (let i = _si; i <= _ei; i++) {
            for (let j = _sj; j < prev.length; j++) {
              draft[i][j] = O.getOrElseFromUndefined(draft[i][j + _ej - _sj + 1], defaultCell)
            }
          }
        })
      )
    },
    [setCells]
  )
  return {
    cells,
    changeCell,
    changeCells,
    setCell,
    insertRowAbove,
    insertRowBelow,
    insertColLeft,
    insertColRight,
    deleteCols,
    deleteRows,
    deleteShiftUp,
    deleteShiftLeft,
  }
}
