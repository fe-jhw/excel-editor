import { useSelectBox, UseSelectBoxReturns } from '@/hooks'
import { ICell } from '@/types'
import { defaultCells, defaultSelectBoxInfo } from '@/constants/SheetConstants'
import { createContext, ReactNode } from 'react'

interface IEditorContext extends UseSelectBoxReturns {
  cells: ICell[][]
}

export const EditorContext = createContext<IEditorContext>({
  cells: defaultCells,
  selected: { i: 0, j: 0 },
  selectCell: () => {},
  selectBoxInfo: defaultSelectBoxInfo,
  onCellClick: () => {},
})
EditorContext.displayName = 'EditorContext'

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const { selected, selectCell, selectBoxInfo, onCellClick } = useSelectBox()
  return (
    <EditorContext.Provider value={{ cells: defaultCells, selected, selectCell, selectBoxInfo, onCellClick }}>
      {children}
    </EditorContext.Provider>
  )
}
