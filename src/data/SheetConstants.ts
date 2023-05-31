import { ICell, SelectedCell, SelectBoxInfo, SelectAreaInfo, Format, TextAlign } from 'editor'
import uuid from 'react-uuid'

export const defaultCellHeight = 28
export const defaultCellWidth = 50

export const defaultCell: Omit<ICell, 'uuid'> = {
  value: '',
  width: defaultCellWidth,
  height: defaultCellHeight,
  fontSize: 11,
  fontFamily: "'Noto Sans KR', sans-serif",
  format: 'general',
  border: '1px solid rgb(218, 220, 224)',
  backgroundColor: 'white',
  color: 'black',
  textAlign: 'left',
  verticalAlign: 'middle',
  fontWeight: undefined,
  fontStyle: undefined,
  textDecoration: undefined,
}

export const defaultCellRow = 30
export const defaultCellCol = 30

export const defaultAdjusterBorderThickness = 20

export const defaultSelectBoxInfo: SelectBoxInfo = {
  width: 0,
  height: 0,
  top: defaultCellHeight,
  left: defaultCellWidth,
}

export const defaultSelectedCell: SelectedCell = { i: 0, j: 0 }
export const defaultSelectAreaInfo: SelectAreaInfo = defaultSelectBoxInfo

export const defaultSelectedArea = {
  si: 0,
  sj: 0,
  ei: 0,
  ej: 0,
  active: true,
}

export const defaultWidths = new Array(defaultCellCol).fill(defaultCellWidth)
export const defaultHeights = new Array(defaultCellRow).fill(defaultCellHeight)

export const MAX_FONT_SIZE = 20
export const MIN_FONT_SIZE = 1
