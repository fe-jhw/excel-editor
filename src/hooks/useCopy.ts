import { useEditorValues, useEditorActions } from '@/context/EditorContext'
import { getDefaultCell, getMinMaxIj } from '@/utils/SheetUtils'
import { defaultCell } from '@/data/SheetConstants'
import { ICell, SelectedArea, History } from 'editor'
import produce from 'immer'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from './useHistory'
import { useChangeCells } from './useChangeCells'
import { useSelectArea } from './useSelectArea'

interface CopyInfo {
  si: number
  sj: number
  ei: number
  ej: number
  status: 'cut' | 'copy' | 'empty'
  cells: ICell[][]
}

export interface UseCopyReturns {
  copySelectedArea: (status: 'cut' | 'copy') => void
  copyInfo: CopyInfo
  paste: () => void
  isSomethingCopied: boolean
}

export const useCopy = (): UseCopyReturns => {
  const { cells } = useEditorValues()
  const { setSelectedArea, setCells } = useEditorActions()
  const { addHistory } = useHistory()
  const { selectedAreaSorted } = useSelectArea()

  const [copyInfo, setCopyInfo] = useState<CopyInfo>({ si: 0, sj: 0, ei: 0, ej: 0, status: 'empty', cells: [] })

  useEffect(() => {
    setCopyInfo(prev => ({ ...prev, status: 'empty' }))
  }, [cells])

  const copySelectedArea = useCallback(
    (status: 'cut' | 'copy') => {
      const { si, sj, ei, ej } = selectedAreaSorted
      const copied: ICell[][] = []
      for (let i = si; i <= ei; i++) {
        const row = []
        for (let j = sj; j <= ej; j++) {
          row.push(cells[i][j])
        }
        copied.push(row)
      }
      setCopyInfo({ si, sj, ei, ej, status, cells: copied })
    },
    [selectedAreaSorted, cells, setCopyInfo]
  )

  const paste = useCallback(() => {
    // 선택셀 기준으로 붙여넣기
    const { si, sj, ei, ej } = selectedAreaSorted
    const [_si, _sj] = getMinMaxIj(si, sj, ei, ej)
    const [_ei, _ej] = [_si + Math.abs(copyInfo.ei - copyInfo.si), _sj + Math.abs(copyInfo.ej - copyInfo.sj)]
    const nextCells = produce(cells, draft => {
      for (let i = _si; i <= _ei; i++) {
        if (i >= draft.length) {
          draft.push(new Array(draft[0].length).fill(getDefaultCell()))
        }
        for (let j = _sj; j <= _ej; j++) {
          if (j >= draft[i].length) {
            for (let i = 0; i < draft.length; i++) {
              draft[i].push(getDefaultCell())
            }
          }
          draft[i][j] = copyInfo.cells[i - si][j - sj]
        }
      }
      if (copyInfo.status === 'cut') {
        const { si, sj, ei, ej } = copyInfo
        const [_si, _sj, _ei, _ej] = getMinMaxIj(si, sj, ei, ej)
        for (let i = _si; i <= _ei; i++) {
          for (let j = _sj; j <= _ej; j++) {
            draft[i][j] = { ...defaultCell, uuid: draft[i][j].uuid }
          }
        }
        setCopyInfo(prev => ({ ...prev, status: 'empty' }))
      }
    })
    setCells(nextCells)
    addHistory(nextCells)
    if (copyInfo.status === 'cut') {
      setCopyInfo(prev => ({ ...prev, status: 'empty' }))
    }
    // 붙여넣기한 영역 선택처리
    setSelectedArea({ si: _si, sj: _sj, ei: _ei, ej: _ej, active: true })
  }, [selectedAreaSorted, copyInfo, cells, setCells, addHistory, setSelectedArea])

  const isSomethingCopied = useMemo(() => copyInfo.status !== 'empty', [copyInfo])

  return { copyInfo, copySelectedArea, paste, isSomethingCopied }
}
