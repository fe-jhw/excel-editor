import { EditorContext } from '@/context'
import { fileState } from '@/data/store'
import { ICell, History, HistoryInfo, ScrollPosition, Selected, SelectedArea } from '@/types'
import produce from 'immer'
import { useCallback, useContext, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import * as O from '@/utils/option'

interface UseFileProps {
  cells: ICell[][]
  setCells: React.Dispatch<React.SetStateAction<ICell[][]>>
  historyInfo: HistoryInfo
  setHistoryInfo: React.Dispatch<React.SetStateAction<HistoryInfo>>
  selected: Selected
  selectCell: (selected: Selected) => void
  selectedArea: SelectedArea
  selectArea: (selected: SelectedArea) => void
}

export interface UseFileReturns {
  changeSheet: ChangeSheet
}

type ChangeSheet = (sheetIdx: number) => void

export const useFile = ({
  cells,
  setCells,
  historyInfo,
  setHistoryInfo,
  selected,
  selectCell,
  selectedArea,
  selectArea,
}: UseFileProps) => {
  const [file, setFile] = useRecoilState(fileState)

  useEffect(() => {
    // 시트 바뀔 시 해당 시트의 정보를 불러온다.
    const curSheet = file.sheets[file.currentSheetIdx]
    console.log(`current sheet: ${curSheet.title}`)
    // 1. cells
    setCells(curSheet.cells)
    // 2. history
    setHistoryInfo(curSheet.historyInfo)
    // 3. 스크롤 위치
    const domSheet = document.querySelector('.sheet')
    const { x, y } = curSheet.scrollPosition
    domSheet?.scrollTo({ top: y, left: x })
    // 4. 셀렉트 박스 정보
    selectCell(curSheet.selected)
    // 5. 셀렉트 에어리어 정보
    selectArea(curSheet.selectedArea)
  }, [file.currentSheetIdx, file.sheets, setCells, setHistoryInfo, selectCell, selectArea])

  const changeSheet: ChangeSheet = useCallback(
    sheetIdx => {
      setFile(prev =>
        produce(prev, draft => {
          const prevSheet = draft.sheets[draft.currentSheetIdx]
          prevSheet.cells = cells
          prevSheet.historyInfo = historyInfo
          prevSheet.scrollPosition = getSheetScrollPosition()
          prevSheet.selected = selected
          prevSheet.selectedArea = selectedArea
          draft.currentSheetIdx = sheetIdx
        })
      )
    },
    [setFile, cells, historyInfo, selected, selectedArea]
  )

  return { changeSheet }
}

function getSheetScrollPosition(): ScrollPosition {
  const domSheet = document.querySelector('.sheet')
  // console.dir(domSheet)
  return { x: O.getOrElseFromUndefined(domSheet?.scrollLeft, 0), y: O.getOrElseFromUndefined(domSheet?.scrollTop, 0) }
}
