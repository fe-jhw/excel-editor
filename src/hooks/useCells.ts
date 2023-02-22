import { ICell } from '@/types'
import { useState } from 'react'
import produce from 'immer'
import { defaultCells } from '@/constants/SheetConstants'
import { isInRange } from '@/utils/SheetUtils'

export interface UseCellsReturns {
  cells: ICell[][]
  changeCell: ChangeCell
  changeCells: ChangeCells
}

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
          for (let _i = si; _i <= ei; _i++) {
            for (let _j = sj; _j <= ej; _j++) {
              draft[_i][_j] = { ...draft[_i][_j], ...changes }
            }
          }
        }
      })
    )
  }
  return { cells, changeCell, changeCells }
}