import { useSelectBox, UseSelectBoxReturns } from '@/hooks'
import { HistoryInfo, ICell } from 'editor'
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import { useSelectArea, UseSelectAreaReturns } from '@/hooks/useSelectArea'
import { getActiveColumnRange, getActiveRowRange, getMinMaxIj } from '@/utils/SheetUtils'
import { useCells, UseCellsReturns } from '@/hooks/useCells'
import { useCopy, UseCopyReturns } from '@/hooks/useCopy'
import { useFile, UseFileReturns } from '@/hooks/useFile'
import { useCellAdjuster, UseCellAdjusterReturns } from '@/hooks/useCellAdjuster'

interface IEditorContext
  extends UseSelectBoxReturns,
    UseSelectAreaReturns,
    UseCellsReturns,
    UseCopyReturns,
    UseFileReturns {
  cells: ICell[][]
  selectedCell: ICell
  activeColRange: [number, number]
  activeRowRange: [number, number]
  changeSelectedCells: (changes: Partial<ICell>) => void
}

export const EditorContext = createContext<IEditorContext>({} as IEditorContext)
EditorContext.displayName = 'EditorContext'

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const useCellsReturns = useCells()
  const useSelectBoxReturns = useSelectBox()
  const useSelectAreaReturns = useSelectArea()

  const { cells, setCell, setCells, changeCell, changeCells, historyInfo, addHistory, setHistoryInfo } = useCellsReturns
  const { selected, selectCell } = useSelectBoxReturns
  const { selectedArea, selectArea, selectedAreaSorted } = useSelectAreaReturns

  const useCopyReturns = useCopy({
    addHistory,
    selectedAreaSorted,
    selectArea,
    cells,
    setCell,
    setCells,
  })

  const useFileReturns = useFile({
    cells,
    setCells,
    historyInfo,
    setHistoryInfo,
    selected,
    selectCell,
    selectArea,
    selectedArea,
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
        ...useCellsReturns,
        ...useSelectBoxReturns,
        ...useSelectAreaReturns,
        ...useCopyReturns,
        ...useFileReturns,
        changeSelectedCells,
        selectedCell,
        activeColRange,
        activeRowRange,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}
