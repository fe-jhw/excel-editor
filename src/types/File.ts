import { ICell, Selected, SelectedArea } from '@/types'

export interface ISheet {
  title: string
  cells: ICell[][]
  historyInfo: HistoryInfo
  scrollPosition: ScrollPosition
  selected: Selected
  selectedArea: SelectedArea
}

export interface IFile {
  title: string
  lastEditTime: string | null
  sheets: ISheet[]
  currentSheetIdx: number
}

export type History = ICell[][]

export interface HistoryInfo {
  stack: History[]
  curIdx: number
}

export type Width = number
export type Height = number

export interface ScrollPosition {
  x: number
  y: number
}
