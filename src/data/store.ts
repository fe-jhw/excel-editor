import { IFile } from '@/types'
import { getEmptySheet } from '@/utils/SheetUtils'
import { atom } from 'recoil'

export const fileState = atom<IFile>({
  key: 'fileState',
  default: {
    title: '',
    sheets: [getEmptySheet(1), getEmptySheet(2)],
    currentSheetIdx: 0,
  },
})
