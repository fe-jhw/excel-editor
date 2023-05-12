import { ICell, Selected, SelectBoxInfo, SelectAreaInfo, Format, TextAlign } from '@/types'
import { fontFamiles } from './ToolBoxConstants'
import uuid from 'react-uuid'

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

export const defaultCellHeight = 28
export const defaultCellWidth = 50

export const defaultSelectBoxInfo: SelectBoxInfo = {
  width: 0,
  height: 0,
  top: defaultCellHeight,
  left: defaultCellWidth,
}

export const defaultSelected: Selected = { i: 0, j: 0 }
export const defaultSelectAreaInfo: SelectAreaInfo = defaultSelectBoxInfo

export const defaultSelectedArea = {
  si: 0,
  sj: 0,
  ei: 0,
  ej: 0,
  active: true,
}

export const MAX_FONT_SIZE = 409
export const MIN_FONT_SIZE = 1
