import { useSelectBox, UseSelectBoxReturns } from '@/hooks'
import { ICell } from '@/types'
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import { useSelectArea, UseSelectAreaReturns } from '@/hooks/useSelectArea'
import { getActiveColumnRange, getActiveRowRange, getMinMaxIj } from '@/utils/SheetUtils'
import { useCells, UseCellsReturns } from '@/hooks/useCells'
import { useCopy, UseCopyReturns } from '@/hooks/useCopy'

interface IEditorContext extends UseSelectBoxReturns, UseSelectAreaReturns, UseCellsReturns, UseCopyReturns {
  cells: ICell[][]
  selectedCell: ICell
  activeColRange: [number, number]
  activeRowRange: [number, number]
  changeSelectedCells: (changes: Partial<ICell>) => void
}

export const EditorContext = createContext<IEditorContext>({} as IEditorContext)
EditorContext.displayName = 'EditorContext'

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const {
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
    deleteShiftLeft,
    deleteShiftUp,
    canRedo,
    canUndo,
    redo,
    undo,
    addHistory,
  } = useCells()
  const { selected, selectCell, selectBoxInfo, onCellClick } = useSelectBox()
  const {
    selectedArea,
    selectedAreaSorted,
    selectArea,
    selectAreaInfo,
    onCellDragStart,
    onCellDragging,
    onCellDragEnd,
  } = useSelectArea()
  const { copyInfo, copySelectedArea, paste, isSomethingCopied } = useCopy({
    selectedAreaSorted,
    selectArea,
    cells,
    setCell,
    setCells,
  })

  const changeSelectedCells = useCallback(
    (changes: Partial<ICell>): void => {
      if (selectedArea.active) {
        const { si, sj, ei, ej } = selectedArea
        changeCells(si, sj, ei, ej, changes)
        return
      }
      const { i, j } = selected
      changeCell(i, j, changes)
    },
    [selected, selectedArea, changeCell, changeCells]
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
        setCell,
        setCells,
        changeSelectedCells,
        insertRowAbove,
        insertRowBelow,
        insertColLeft,
        insertColRight,
        deleteCols,
        deleteRows,
        deleteShiftLeft,
        deleteShiftUp,
        canRedo,
        canUndo,
        redo,
        undo,
        addHistory,
        selected,
        selectedCell,
        selectCell,
        selectBoxInfo,
        onCellClick,
        selectedArea,
        selectedAreaSorted,
        selectArea,
        selectAreaInfo,
        onCellDragStart,
        onCellDragging,
        onCellDragEnd,
        activeColRange,
        activeRowRange,
        copySelectedArea,
        copyInfo,
        paste,
        isSomethingCopied,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}
