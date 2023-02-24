import { ICell } from '@/types'
import { useCallback, useState } from 'react'
import produce from 'immer'
import { defaultCell, defaultCells } from '@/constants/SheetConstants'
import { isInRange } from '@/utils/SheetUtils'

export interface UseCellsReturns {
  cells: ICell[][]
  changeCell: ChangeCell
  changeCells: ChangeCells
  insertRowAbove: InsertRow
  insertRowBelow: InsertRow
  insertColLeft: InsertCol
  insertColRight: InsertCol
}

type InsertCol = (col: number) => void
type InsertRow = (row: number) => void
type ChangeCell = (i: number, j: number, changes: Partial<ICell>) => void
type ChangeCells = (si: number, sj: number, ei: number, ej: number, changes: Partial<ICell>) => void

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
          const _si = Math.min(si, ei)
          const _sj = Math.min(sj, ej)
          const _ei = Math.max(si, ei)
          const _ej = Math.max(sj, ej)
          for (let _i = _si; _i <= _ei; _i++) {
            for (let _j = _sj; _j <= _ej; _j++) {
              draft[_i][_j] = { ...draft[_i][_j], ...changes }
            }
          }
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
  return { cells, changeCell, changeCells, insertRowAbove, insertRowBelow, insertColLeft, insertColRight }
}
