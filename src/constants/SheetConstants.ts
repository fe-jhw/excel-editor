import { ICell, Selected, SelectBoxInfo } from '@/types'

export const defaultCell: ICell = {
  value: '',
}

export const defaultCells: ICell[][] = new Array(30).fill(new Array(30).fill(defaultCell))

export const defaultCellHeight = 28
export const defaultCellWidth = 50

export const defaultSelectBoxInfo: SelectBoxInfo = {
  width: 0,
  height: 0,
  top: defaultCellHeight,
  left: defaultCellWidth,
}
