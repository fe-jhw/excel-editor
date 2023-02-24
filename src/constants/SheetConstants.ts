import { ICell, Selected, SelectBoxInfo, SelectAreaInfo } from '@/types'
import { fontFamiles } from './ToolBoxConstants'

export const defaultCell: ICell = {
  value: '',
  fontSize: 11,
  fontFamily: fontFamiles[0].value,
  format: 'general',
  border: '1px solid rgb(218, 220, 224)',
  backgroundColor: 'white',
  color: 'black',
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

export const defaultSelectAreaInfo: SelectAreaInfo = defaultSelectBoxInfo

export const MAX_FONT_SIZE = 409
export const MIN_FONT_SIZE = 1
