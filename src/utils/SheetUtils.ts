import { Selected } from '@/types/Cell'
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

export function parseCellId(id: string): Selected {
  const [i, j] = id.split('-').map((str: string) => parseInt(str))
  return { i, j }
}
