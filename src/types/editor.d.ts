declare module 'editor' {
  export interface IFile {
    title: string
    lastEditTime: string | null
    sheets: ISheet[]
    currentSheetIdx: number
  }

  export interface ISheet {
    title: string
    cells: ICell[][]
    historyInfo: HistoryInfo
    scrollPosition: ScrollPosition
    selected: Selected
    selectedArea: SelectedArea
  }

  export type History = ICell[][]

  export interface HistoryInfo {
    stack: History[]
    curIdx: number
  }

  export interface ScrollPosition {
    x: number
    y: number
  }

  export interface ICell {
    value: string
    width: number
    height: number
    fontSize?: number
    fontFamily?: string
    fontWeight?: string | number
    fontStyle?: string
    border?: string
    textDecoration?: string
    color?: string
    backgroundColor?: string
    verticalAlign?: string
    textAlign?: TextAlign
    format?: Format
    function?: string
    uuid: string
  }

  export type Format = 'general' | 'number' | 'money' | 'account' | 'percentage'
  export type TextAlign = 'left' | 'center' | 'right'

  export interface SelectedCell {
    i: number
    j: number
  }

  export interface SelectBoxInfo {
    width: number
    height: number
    top: number
    left: number
  }

  export interface SelectedArea {
    si: number
    sj: number
    ei: number
    ej: number
    active: boolean
  }

  export interface SelectAreaInfo extends SelectBoxInfo {}
}
