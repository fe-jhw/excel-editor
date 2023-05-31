import { defaultSelectBoxInfo, defaultCellHeight, defaultCellWidth, defaultSelectedCell } from '@/data/SheetConstants'
import { ReactEventHandler, useState, useEffect, useCallback } from 'react'
import { SelectedCell, SelectBoxInfo } from 'editor'
import { parseCellId } from '@/utils/SheetUtils'

export interface UseSelectBoxReturns {
  selected: SelectedCell
  selectCell: (selected: SelectedCell) => void
  selectBoxInfo: SelectBoxInfo
  onCellClick: ReactEventHandler
  calcBoxInfo: () => void
}

export const useSelectBox = (): UseSelectBoxReturns => {
  const [selected, setSelected] = useState<SelectedCell>(defaultSelectedCell)
  const [selectBoxInfo, setSelectBoxInfo] = useState<SelectBoxInfo>(defaultSelectBoxInfo)

  const selectCell = useCallback(({ i, j }: SelectedCell) => setSelected({ i, j }), [setSelected])

  const onCellClick: ReactEventHandler = e => {
    const target = e.target as HTMLElement
    if (target.id) {
      selectCell(parseCellId(target.id))
    }
  }

  const calcBoxInfo = useCallback(() => {
    if (selected !== null) {
      const { i, j } = selected
      const cellEl = document.getElementById(`${i}-${j}`)
      if (cellEl) {
        const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = cellEl
        setSelectBoxInfo({
          width: offsetWidth - 2,
          height: offsetHeight - 2,
          top: offsetTop + 1,
          left: offsetLeft + defaultCellWidth + 2,
        })
      }
    }
  }, [selected])

  useEffect(() => {
    calcBoxInfo()
  }, [calcBoxInfo])

  return { selected, selectCell, selectBoxInfo, onCellClick, calcBoxInfo }
}
