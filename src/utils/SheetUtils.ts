import {
  defaultCell,
  defaultCellHeight,
  defaultCellWidth,
  defaultSelected,
  defaultSelectedArea,
} from '@/data/SheetConstants'
import { ISheet } from '@/types'
import { Format, ICell, Selected, SelectedArea, TextAlign } from '@/types/Cell'
import uuid from 'react-uuid'

function addComma(number: string) {
  const parts = number.toString().split('.')
  const result = Number(parts[0]).toLocaleString() + (parts[1] ? '.' + parts[1] : '')
  return result
}

export function format(value: string, type: Format): string {
  if (value.trim() === '') {
    return value
  }
  switch (type) {
    case 'general':
      return value
    case 'number':
      return value
    case 'money':
      if (isNaN(Number(value))) {
        return value
      }

      return ['$', addComma(value)].join(' ')
    case 'percentage':
      if (isNaN(Number(value))) {
        return value
      }
      return [value, '%'].join(' ')
    default:
      return value
  }
}

export function getRowArr(length: number): number[] {
  return new Array(length).fill(0).map((_, idx) => idx + 1)
}

export function getColumnArr(length: number): string[] {
  return getRowArr(length).map((num, _) => changeNumToAlphabet(num))
}

export function changeNumToAlphabet(num: number): string {
  let ret = ''
  for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode((num % b) / a + 65) + ret
  }
  return ret
}

export function getActiveRowRange(selected: Selected, selectedArea: SelectedArea): [start: number, end: number] {
  if (selectedArea.active) {
    return [selectedArea.si, selectedArea.ei]
  }
  return [selected.i, selected.i]
}

export function getActiveColumnRange(selected: Selected, selectedArea: SelectedArea): [start: number, end: number] {
  if (selectedArea.active) {
    return [selectedArea.sj, selectedArea.ej]
  }
  return [selected.j, selected.j]
}

export function isInRange(idx: number, [start, end]: [number, number]): boolean {
  if ((idx >= start && idx <= end) || (idx <= start && idx >= end)) {
    return true
  }
  return false
}

export function parseCellId(id: string): Selected {
  const [i, j] = id.split('-').map((str: string) => parseInt(str))
  return { i, j }
}

export function getCellRectInfo(el: HTMLElement): [number, number, number, number] {
  return [el.offsetWidth, el.offsetHeight, el.offsetTop, el.offsetLeft]
}

export function getAreaRect(
  si: number,
  sj: number,
  ei: number,
  ej: number
): {
  width: number
  height: number
  top: number
  left: number
} | null {
  const sCellEl = document.getElementById(`${si}-${sj}`)
  const eCellEl = document.getElementById(`${ei}-${ej}`)

  if (sCellEl && eCellEl) {
    const [sOffsetWidth, sOffsetHeight, sOffsetTop, sOffsetLeft] = getCellRectInfo(sCellEl)
    const [eOffsetWidth, eOffsetHeight, eOffsetTop, eOffsetLeft] = getCellRectInfo(eCellEl)
    const width = Math.abs(eOffsetLeft - sOffsetLeft) + (sOffsetLeft > eOffsetLeft ? sOffsetWidth : eOffsetWidth)
    const height = Math.abs(eOffsetTop - sOffsetTop) + (sOffsetTop > eOffsetTop ? sOffsetHeight : eOffsetHeight)
    const top = Math.min(sOffsetTop, eOffsetTop)
    const left = Math.min(sOffsetLeft, eOffsetLeft) + defaultCellWidth + 1
    return { width, height, top, left }
  }
  return null
}

export function getMinMaxIj(
  si: number,
  sj: number,
  ei: number,
  ej: number
): [_si: number, _sj: number, _ei: number, _ej: number] {
  const _si = Math.min(si, ei)
  const _sj = Math.min(sj, ej)
  const _ei = Math.max(si, ei)
  const _ej = Math.max(sj, ej)
  return [_si, _sj, _ei, _ej]
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

export function getEmptySheet(sheetNumber: number): ISheet {
  return {
    title: `Sheet${sheetNumber}`,
    cells: getDefaultCells(30, 30),
    historyInfo: { stack: [], curIdx: -1 },
    scrollPosition: { x: 0, y: 0 },
    selected: defaultSelected,
    selectedArea: defaultSelectedArea,
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
