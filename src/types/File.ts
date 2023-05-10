import { ICell } from '@/types'

export interface ISheet {
  title: string
  cells: ICell[][]
}

export interface IFile {
  title: string
  sheets: ISheet[]
  currentSheetIdx: number
}
