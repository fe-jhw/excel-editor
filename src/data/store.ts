import { IFile } from '@/types'
import { atom } from 'recoil'
import { defaultCells } from './SheetConstants'

export const fileState = atom<IFile>({
  key: 'fileState',
  default: {
    title: '',
    sheets: [
      { title: 'Sheet 1', cells: defaultCells },
      { title: 'Sheet 2', cells: defaultCells },
    ],
    currentSheetIdx: 0,
  },
})
