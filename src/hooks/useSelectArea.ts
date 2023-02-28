import { parseCellId, getCellRectInfo, getAreaRect } from '@/utils/SheetUtils'
import { ReactEventHandler, useState, useEffect, useRef } from 'react'
import { SelectedArea, SelectAreaInfo } from '@/types'
import { defaultSelectAreaInfo, defaultCellHeight, defaultCellWidth } from '@/constants/SheetConstants'

export interface UseSelectAreaReturns {
  selectedArea: SelectedArea
  selectArea: (selected: SelectedArea) => void
  selectAreaInfo: SelectAreaInfo
  onCellDragStart: ReactEventHandler
  onCellDragging: ReactEventHandler
  onCellDragEnd: ReactEventHandler
}

export const useSelectArea = (): UseSelectAreaReturns => {
  const [selectedArea, setSelectedArea] = useState<SelectedArea>({
    si: 0,
    sj: 0,
    ei: 0,
    ej: 0,
    active: false,
  })
  const [selectAreaInfo, setSelectAreaInfo] = useState<SelectAreaInfo>(defaultSelectAreaInfo)
  const isDragging = useRef(false)

  useEffect(() => {
    const { si, sj, ei, ej } = selectedArea
    const rect = getAreaRect(si, sj, ei, ej)
    if (rect) {
      setSelectAreaInfo(rect)
    }
  }, [selectedArea])

  const selectArea = (selectedArea: SelectedArea) => setSelectedArea(selectedArea)

  const onCellDragStart: ReactEventHandler = e => {
    isDragging.current = true
    const target = e.target as HTMLElement
    if (target.id) {
      const { i, j } = parseCellId(target.id)
      selectArea({ si: i, sj: j, ei: i, ej: j, active: true })
    }
  }

  // TODO: debounce 적용
  const onCellDragging: ReactEventHandler = e => {
    if (!isDragging.current) {
      return
    }
    const target = e.target as HTMLElement
    if (target.id) {
      const { i, j } = parseCellId(target.id)
      setSelectedArea((prev: SelectedArea) => ({ ...prev, ei: i, ej: j }))
    }
  }

  const onCellDragEnd: ReactEventHandler = e => {
    isDragging.current = false
  }

  return { selectedArea, selectArea, selectAreaInfo, onCellDragStart, onCellDragging, onCellDragEnd }
}
