import { ICell, Selected, SelectBoxInfo, SelectAreaInfo, Format, TextAlign } from '@/types'
import { fontFamiles } from './ToolBoxConstants'
import uuid from 'react-uuid'
import { CCell } from '@/utils/SheetUtils'

export const defaultCell: Omit<ICell, 'uuid'> = {
  value: '',
  fontSize: 11,
  fontFamily: fontFamiles[0].value,
  format: 'general',
  border: '1px solid rgb(218, 220, 224)',
  backgroundColor: 'white',
  color: 'black',
  textAlign: 'left',
  verticalAlign: 'middle',
}

export const getDefaultCell = () => {
  return new CCell()
}

export const getDefaultRow = (length: number) => {
  return new Array(length).fill({}).map(_ => getDefaultCell())
}

export const getDefaultCells = (rowLen: number, colLen: number) => {
  return new Array(rowLen).fill({}).map(_ => getDefaultRow(colLen))
}

export const defaultCells: ICell[][] = getDefaultCells(30, 30)

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
