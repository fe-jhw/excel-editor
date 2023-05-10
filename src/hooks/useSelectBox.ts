import { defaultSelectBoxInfo, defaultCellHeight, defaultCellWidth } from '@/data/SheetConstants'
import { ReactEventHandler, useState, useEffect } from 'react'
import { Selected, SelectBoxInfo } from '@/types'
import { parseCellId } from '@/utils/SheetUtils'

export interface UseSelectBoxReturns {
  selected: Selected
  selectCell: (selected: Selected) => void
  selectBoxInfo: SelectBoxInfo
  onCellClick: ReactEventHandler
}

export const useSelectBox = (): UseSelectBoxReturns => {
  const [selected, setSelected] = useState<Selected>({ i: 0, j: 0 })
  const [selectBoxInfo, setSelectBoxInfo] = useState<SelectBoxInfo>(defaultSelectBoxInfo)

  useEffect(() => {
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

  const selectCell = ({ i, j }: Selected) => setSelected({ i, j })

  const onCellClick: ReactEventHandler = e => {
    const target = e.target as HTMLElement
    if (target.id) {
      selectCell(parseCellId(target.id))
    }
  }
  return { selected, selectCell, selectBoxInfo, onCellClick }
}
