import { defaultCell } from '@/constants/SheetConstants'
import { ICell, SelectedArea } from '@/types'
import { getMinMaxIj } from '@/utils/SheetUtils'
import { useCallback, useMemo, useState } from 'react'

interface CopyInfo {
  si: number
  sj: number
  ei: number
  ej: number
  status: 'cut' | 'copy' | 'empty'
  cells: ICell[][]
}

interface UseCopyProps {
  selectedAreaSorted: Omit<SelectedArea, 'active'>
  selectArea: (selected: SelectedArea) => void
  cells: ICell[][]
  setCell: (i: number, j: number, cell: ICell) => void
  setCells: React.Dispatch<React.SetStateAction<ICell[][]>>
}

export interface UseCopyReturns {
  copySelectedArea: (status: 'cut' | 'copy') => void
  copyInfo: CopyInfo
  paste: () => void
  isSomethingCopied: boolean
}

export const useCopy = ({ selectedAreaSorted, selectArea, cells, setCell, setCells }: UseCopyProps): UseCopyReturns => {
  const [copyInfo, setCopyInfo] = useState<CopyInfo>({ si: 0, sj: 0, ei: 0, ej: 0, status: 'empty', cells: [] })

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
    for (let i = _si; i <= _ei; i++) {
      // TODO: 영역 바깥일경우(length보다 긴 경우) insert row or col해야함

      for (let j = _sj; j <= _ej; j++) {
        // TODO: 동기처리 (cells 늘린 후 cell 값 변경)
        setCell(i, j, copyInfo.cells[i - si][j - sj])
      }
    }
    if (copyInfo.status === 'cut') {
      const { si, sj, ei, ej } = copyInfo
      const [_si, _sj, _ei, _ej] = getMinMaxIj(si, sj, ei, ej)
      for (let i = _si; i <= _ei; i++) {
        for (let j = _sj; j <= _ej; j++) {
          setCell(i, j, defaultCell)
        }
      }
      setCopyInfo(prev => ({ ...prev, status: 'empty' }))
    }
    // 붙여넣기한 영역 선택처리
    selectArea({ si: _si, sj: _sj, ei: _ei, ej: _ej, active: true })
  }, [setCell, selectedAreaSorted, copyInfo, selectArea])

  const isSomethingCopied = useMemo(() => copyInfo.status !== 'empty', [copyInfo])

  return { copyInfo, copySelectedArea, paste, isSomethingCopied }
}
