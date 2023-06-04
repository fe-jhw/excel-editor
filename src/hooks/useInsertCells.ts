import { getDefaultCell, getDefaultRow } from '@/utils/SheetUtils'
import { useCallback } from 'react'

interface UseIntertCellsReturns {
  insertRowAbove: InsertRow
  insertRowBelow: InsertRow
  insertColLeft: InsertCol
  insertColRight: InsertCol
}

type InsertCol = (col: number) => void
type InsertRow = (row: number) => void

export const useInsertCells = (): UseIntertCellsReturns => {
  const insertRowAbove: InsertRow = useCallback(
    (row: number): void => {
      const nextCells = produce(cells, draft => {
        draft.splice(row, 0, getDefaultRow(cells[row].length))
      })
      setCellsWithHistory(nextCells)
    },
    [cells, setCellsWithHistory]
  )
  const insertRowBelow: InsertRow = useCallback(
    (row: number): void => {
      const nextCells = produce(cells, draft => {
        draft.splice(row + 1, 0, getDefaultRow(cells[row].length))
      })
      setCellsWithHistory(nextCells)
    },
    [cells, setCellsWithHistory]
  )
  const insertColLeft: InsertCol = useCallback(
    (col: number): void => {
      const nextCells = produce(cells, draft => {
        for (let i = 0; i < cells.length; i++) {
          draft[i].splice(col, 0, getDefaultCell())
        }
      })
      setCellsWithHistory(nextCells)
    },
    [cells, setCellsWithHistory]
  )
  const insertColRight: InsertCol = useCallback(
    (col: number): void => {
      const nextCells = produce(cells, draft => {
        for (let i = 0; i < cells.length; i++) {
          draft[i].splice(col + 1, 0, getDefaultCell())
        }
      })
      setCellsWithHistory(nextCells)
    },
    [cells, setCellsWithHistory]
  )

  return { insertColLeft, insertColRight, insertRowAbove, insertRowBelow }
}
