import { useSelectBox, UseSelectBoxReturns } from '@/hooks'
import { ICell } from '@/types'
import { defaultCell, defaultCells, defaultSelectAreaInfo, defaultSelectBoxInfo } from '@/constants/SheetConstants'
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import { useSelectArea, UseSelectAreaReturns } from '@/hooks/useSelectArea'
import { getActiveColumnRange, getActiveRowRange, getMinMaxIj } from '@/utils/SheetUtils'
import { useCells, UseCellsReturns } from '@/hooks/useCells'

interface IEditorContext extends UseSelectBoxReturns, UseSelectAreaReturns, UseCellsReturns {
  cells: ICell[][]
  selectedCell: ICell
  activeColRange: [number, number]
  activeRowRange: [number, number]
  changeSelectedCells: (changes: Partial<ICell>) => void
  copySelectedArea: (status: 'cut' | 'copy') => void
  copyInfo: CopyInfo
  paste: () => void
  isSomethingCopied: boolean
}

interface CopyInfo {
  si: number
  sj: number
  ei: number
  ej: number
  status: 'cut' | 'copy' | 'empty'
  cells: ICell[][]
}

// TODO: 매번 하드코딩으로 집어넣지 말고 다른 방법을 찾아보자
export const EditorContext = createContext<IEditorContext>({
  cells: defaultCells,
  changeCell: () => {},
  changeCells: () => {},
  setCell: () => {},
  insertRowAbove: () => {},
  insertRowBelow: () => {},
  insertColLeft: () => {},
  insertColRight: () => {},
  deleteCols: () => {},
  deleteRows: () => {},
  deleteShiftLeft: () => {},
  deleteShiftUp: () => {},
  changeSelectedCells: () => {},
  selected: { i: 0, j: 0 },
  selectedCell: defaultCell,
  selectCell: () => {},
  selectBoxInfo: defaultSelectBoxInfo,
  onCellClick: () => {},
  selectedArea: { si: 0, sj: 0, ei: 0, ej: 0, active: false },
  selectArea: () => {},
  selectAreaInfo: defaultSelectAreaInfo,
  onCellDragStart: () => {},
  onCellDragging: () => {},
  onCellDragEnd: () => {},
  activeColRange: [0, 0],
  activeRowRange: [0, 0],
  copyInfo: { si: 0, sj: 0, ei: 0, ej: 0, status: 'empty', cells: [] },
  copySelectedArea: () => {},
  paste: () => {},
  isSomethingCopied: false,
})
EditorContext.displayName = 'EditorContext'

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const {
    cells,
    changeCell,
    changeCells,
    setCell,
    insertRowAbove,
    insertRowBelow,
    insertColLeft,
    insertColRight,
    deleteCols,
    deleteRows,
    deleteShiftLeft,
    deleteShiftUp,
  } = useCells()
  const { selected, selectCell, selectBoxInfo, onCellClick } = useSelectBox()
  const { selectedArea, selectArea, selectAreaInfo, onCellDragStart, onCellDragging, onCellDragEnd } = useSelectArea()
  const [copyInfo, setCopyInfo] = useState<CopyInfo>({ si: 0, sj: 0, ei: 0, ej: 0, status: 'empty', cells: [] })

  const changeSelectedCells = useCallback(
    (changes: Partial<ICell>): void => {
      if (selectedArea.active) {
        const { si, sj, ei, ej } = selectedArea
        changeCells(si, sj, ei, ej, changes)
        return
      }
      const { i, j } = selected
      changeCell(i, j, changes)
    },
    [selected, selectedArea, changeCell, changeCells]
  )

  const selectedCell = cells[selected.i][selected.j]

  const activeColRange = getActiveColumnRange(selected, selectedArea)
  const activeRowRange = getActiveRowRange(selected, selectedArea)

  const copySelectedArea = useCallback(
    (status: 'cut' | 'copy') => {
      const { si, sj, ei, ej } = selectedArea
      const [_si, _sj, _ei, _ej] = getMinMaxIj(si, sj, ei, ej)
      const copied: ICell[][] = []
      for (let i = _si; i <= _ei; i++) {
        const row = []
        for (let j = _sj; j <= _ej; j++) {
          row.push(cells[i][j])
        }
        copied.push(row)
      }
      setCopyInfo({ si, sj, ei, ej, status, cells: copied })
    },
    [selectedArea, cells, setCopyInfo]
  )

  const paste = useCallback(() => {
    // 선택셀 기준으로 붙여넣기
    const { si, sj, ei, ej } = selectedArea
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
      //TODO: getMinMaxIj 쓰는곳 반복적으로 나타남 -> 없애보자
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
  }, [setCell, selectedArea, copyInfo, selectArea, cells, insertColRight, insertRowBelow])

  const isSomethingCopied = useMemo(() => copyInfo.status !== 'empty', [copyInfo])

  return (
    <EditorContext.Provider
      value={{
        cells,
        changeCell,
        changeCells,
        setCell,
        changeSelectedCells,
        insertRowAbove,
        insertRowBelow,
        insertColLeft,
        insertColRight,
        deleteCols,
        deleteRows,
        deleteShiftLeft,
        deleteShiftUp,
        selected,
        selectedCell,
        selectCell,
        selectBoxInfo,
        onCellClick,
        selectedArea,
        selectArea,
        selectAreaInfo,
        onCellDragStart,
        onCellDragging,
        onCellDragEnd,
        activeColRange,
        activeRowRange,
        copySelectedArea,
        copyInfo,
        paste,
        isSomethingCopied,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}
