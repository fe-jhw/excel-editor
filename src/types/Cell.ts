export interface ICell {
  value: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: string | number
  fontStyle?: string
  textDecoration?: string
  color?: string
  backgroundColor?: string
  verticalAlign?: string
  align?: string
  format?: string
  function?: string
}

export interface Selected {
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
