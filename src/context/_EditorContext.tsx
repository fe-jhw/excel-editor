import { defaultCellCol, defaultCellRow, defaultSelectedArea, defaultSelectedCell } from '@/data/SheetConstants'
import { getDefaultCells } from '@/utils/SheetUtils'
import { CopiedArea, HistoryInfo, ICell, SelectedArea, SelectedCell } from 'editor'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

interface IEditorValuesContext {
  cells: ICell[][]
  historyInfo: HistoryInfo
  selectedArea: SelectedArea
  selectedCell: SelectedCell
  copiedArea: CopiedArea
}

interface IEditorActionsContext {
  setCells: React.Dispatch<React.SetStateAction<ICell[][]>>
  setHistoryInfo: React.Dispatch<React.SetStateAction<HistoryInfo>>
  setSelectedArea: React.Dispatch<React.SetStateAction<SelectedArea>>
  setSelectedCell: React.Dispatch<React.SetStateAction<SelectedCell>>
  setCopiedArea: React.Dispatch<React.SetStateAction<CopiedArea>>
}

const EditorValuesContext = createContext({} as IEditorValuesContext)
EditorValuesContext.displayName = 'EditorValueContext'
const EditorActionsContext = createContext({} as IEditorActionsContext)
EditorActionsContext.displayName = 'EditorActionsContext'

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [cells, setCells] = useState<ICell[][]>(getDefaultCells(defaultCellCol, defaultCellRow))
  const [historyInfo, setHistoryInfo] = useState<HistoryInfo>({ stack: [getDefaultCells(30, 30)], curIdx: 0 })
  const [selectedArea, setSelectedArea] = useState<SelectedArea>(defaultSelectedArea)
  const [selectedCell, setSelectedCell] = useState<SelectedCell>(defaultSelectedCell)
  const [copiedArea, setCopiedArea] = useState<CopiedArea>({ si: 0, sj: 0, ei: 0, ej: 0, status: 'empty', cells: [] })

  const values = useMemo(
    () => ({
      cells,
      historyInfo,
      selectedArea,
      selectedCell,
      copiedArea,
    }),
    [cells, historyInfo, selectedArea, selectedCell, copiedArea]
  )

  const actions = useMemo(
    () => ({
      setCells,
      setHistoryInfo,
      setSelectedArea,
      setSelectedCell,
      setCopiedArea,
    }),
    []
  )

  return (
    <EditorActionsContext.Provider value={actions}>
      <EditorValuesContext.Provider value={values}>{children}</EditorValuesContext.Provider>
    </EditorActionsContext.Provider>
  )
}

export function useEditorValues() {
  const value = useContext(EditorValuesContext)
  if (value === undefined) {
    throw new Error('useEditorValues should be used within EditorProvider')
  }
  return value
}

export function useEditorActions() {
  const value = useContext(EditorActionsContext)
  if (value === undefined) {
    throw new Error('useEditorActions should be used within EditorProvider')
  }
  return value
}
