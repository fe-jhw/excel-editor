import { ICell, IFile, ISheet } from '@/types'

export class CSheet {
  title: string
  cells: ICell[][]
  constructor(title: string, cells: ICell[][]) {
    this.title = title
    this.cells = cells
  }
}

export class CFile implements IFile {
  title: string | null
  sheets: ISheet[]
  currentSheetIdx: number
  constructor(title: string | null, sheets: ISheet[], currentSheetIdx: number) {
    this.title = title
    this.sheets = sheets
    this.currentSheetIdx = currentSheetIdx
  }
}
