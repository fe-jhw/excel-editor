import { defaultSelectBoxInfo, defaultCellHeight, defaultCellWidth, defaultSelected } from '@/data/SheetConstants'
import { ReactEventHandler, useState, useEffect, useCallback } from 'react'
import { Selected, SelectBoxInfo } from '@/types'
import { parseCellId } from '@/utils/SheetUtils'

export interface UseSelectBoxReturns {
  selected: Selected
  selectCell: (selected: Selected) => void
  selectBoxInfo: SelectBoxInfo
  onCellClick: ReactEventHandler
  calcBoxInfo: () => void
}

export const useSelectBox = (): UseSelectBoxReturns => {
  const [selected, setSelected] = useState<Selected>(defaultSelected)
  const [selectBoxInfo, setSelectBoxInfo] = useState<SelectBoxInfo>(defaultSelectBoxInfo)

  const selectCell = useCallback(({ i, j }: Selected) => setSelected({ i, j }), [setSelected])

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
