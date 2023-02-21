import { useSelectBox, UseSelectBoxReturns } from '@/hooks'
import { ICell } from '@/types'
import { defaultCells, defaultSelectAreaInfo, defaultSelectBoxInfo } from '@/constants/SheetConstants'
import { createContext, ReactNode } from 'react'
import { useSelectArea, UseSelectAreaReturns } from '@/hooks/useSelectArea'
import { getActiveColumnRange, getActiveRowRange } from '@/utils/SheetUtils'

interface IEditorContext extends UseSelectBoxReturns, UseSelectAreaReturns {
  cells: ICell[][]
  activeColRange: [number, number]
  activeRowRange: [number, number]
}

export const EditorContext = createContext<IEditorContext>({
  cells: defaultCells,
  selected: { i: 0, j: 0 },
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
  const { selected, selectCell, selectBoxInfo, onCellClick } = useSelectBox()
  const { selectedArea, selectArea, selectAreaInfo, onCellDragStart, onCellDragging, onCellDragEnd } = useSelectArea()
  const activeColRange = getActiveColumnRange(selected, selectedArea)
  const activeRowRange = getActiveRowRange(selected, selectedArea)
  return (
    <EditorContext.Provider
      value={{
        cells: defaultCells,
        selected,
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
