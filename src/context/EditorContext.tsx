import { ICell } from '@/types'
import { createContext, ReactNode } from 'react'

interface IEditorContext {
  cells: ICell[][]
}

const defaultCell: ICell = {
  value: '',
}

const defaultCells: ICell[][] = new Array(30).fill(new Array(30).fill(defaultCell))

export const EditorContext = createContext<IEditorContext>({ cells: defaultCells })
EditorContext.displayName = 'EditorContext'

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  return <EditorContext.Provider value={{ cells: defaultCells }}>{children}</EditorContext.Provider>
}
