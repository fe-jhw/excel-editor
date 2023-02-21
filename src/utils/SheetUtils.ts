import { Selected, SelectedArea } from '@/types/Cell'

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
