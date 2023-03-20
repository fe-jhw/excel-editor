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

export class CCell implements ICell {
  value: string
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

  constructor(
    value = defaultCell.value,
    fontSize = defaultCell.fontSize,
    fontFamily = defaultCell.fontFamily,
    format = defaultCell.format,
    border = defaultCell.border,
    backgroundColor = defaultCell.backgroundColor,
    color = defaultCell.color,
    textAlign = defaultCell.textAlign,
    verticalAlign = defaultCell.verticalAlign
  ) {
    this.value = value
    this.fontSize = fontSize
    this.fontFamily = fontFamily
    this.format = format
    this.border = border
    this.backgroundColor = backgroundColor
    this.color = color
    this.textAlign = textAlign
    this.verticalAlign = verticalAlign
    this.uuid = uuid()
  }
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
