import { IFile } from '@/types'
import { getEmptySheet } from '@/utils/SheetUtils'
import { atom, AtomEffect } from 'recoil'

const localStorageEffect: (key: string) => AtomEffect<IFile> =
  key =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

export const fileState = atom<IFile>({
  key: 'file',
  default: {
    title: '',
    lastEditTime: null,
    sheets: [getEmptySheet(1), getEmptySheet(2)],
    currentSheetIdx: 0,
  },
  effects: [localStorageEffect('file')],
})
