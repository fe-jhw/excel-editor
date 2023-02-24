import { useSelectBox, UseSelectBoxReturns } from '@/hooks'
import { ICell } from '@/types'
import { defaultCell, defaultCells, defaultSelectAreaInfo, defaultSelectBoxInfo } from '@/constants/SheetConstants'
import { createContext, ReactNode, useCallback } from 'react'
import { useSelectArea, UseSelectAreaReturns } from '@/hooks/useSelectArea'
import { getActiveColumnRange, getActiveRowRange } from '@/utils/SheetUtils'
import { useCells, UseCellsReturns } from '@/hooks/useCells'

interface IEditorContext extends UseSelectBoxReturns, UseSelectAreaReturns, UseCellsReturns {
  cells: ICell[][]
  selectedCell: ICell
  activeColRange: [number, number]
  activeRowRange: [number, number]
  changeSelectedCells: (changes: Partial<ICell>) => void
}

// TODO: 매번 하드코딩으로 집어넣지 말고 다른 방법을 찾아보자
export const EditorContext = createContext<IEditorContext>({
  cells: defaultCells,
  changeCell: () => {},
  changeCells: () => {},
  insertRowAbove: () => {},
  insertRowBelow: () => {},
  insertColLeft: () => {},
  insertColRight: () => {},
  changeSelectedCells: () => {},
  selected: { i: 0, j: 0 },
  selectedCell: defaultCell,
  selectCell: () => {},
  selectBoxInfo: defaultSelectBoxInfo,
  onCellClick: () => {},
  selectedArea: { si: 0, sj: 0, ei: 0, ej: 0, active: false },
  selectArea: () => {},
  selectAreaInfo: defaultSelectAreaInfo,
  onCellDragStart: () => {},
  onCellDragging: () => {},
  onCellDragEnd: () => {},
  activeColRange: [0, 0],
  activeRowRange: [0, 0],
})
EditorContext.displayName = 'EditorContext'

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const { cells, changeCell, changeCells, insertRowAbove, insertRowBelow, insertColLeft, insertColRight } = useCells()
  const { selected, selectCell, selectBoxInfo, onCellClick } = useSelectBox()
  const { selectedArea, selectArea, selectAreaInfo, onCellDragStart, onCellDragging, onCellDragEnd } = useSelectArea()

  const changeSelectedCells = useCallback(
    (changes: Partial<ICell>): void => {
      if (selectedArea.active) {
        const { si, sj, ei, ej } = selectedArea
        changeCells(si, sj, ei, ej, changes)
      }
      const { i, j } = selected
      changeCell(i, j, changes)
    },
    [selected, selectedArea]
  )

  const selectedCell = cells[selected.i][selected.j]

  const activeColRange = getActiveColumnRange(selected, selectedArea)
  const activeRowRange = getActiveRowRange(selected, selectedArea)
  return (
    <EditorContext.Provider
      value={{
        cells,
        changeCell,
        changeCells,
        changeSelectedCells,
        insertRowAbove,
        insertRowBelow,
        insertColLeft,
        insertColRight,
        selected,
        selectedCell,
        selectCell,
        selectBoxInfo,
        onCellClick,
        selectedArea,
        selectArea,
        selectAreaInfo,
        onCellDragStart,
        onCellDragging,
        onCellDragEnd,
        activeColRange,
        activeRowRange,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}
