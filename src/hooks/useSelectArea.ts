import { parseCellId, getCellRectInfo, getAreaRect } from '@/utils/SheetUtils'
import { ReactEventHandler, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { SelectedArea, SelectAreaInfo } from 'editor'
import { defaultSelectAreaInfo, defaultCellHeight, defaultCellWidth, defaultSelectedArea } from '@/data/SheetConstants'

export interface UseSelectAreaReturns {
  selectedArea: SelectedArea
  selectedAreaSorted: Omit<SelectedArea, 'active'>
  selectArea: (selected: SelectedArea) => void
  selectAreaInfo: SelectAreaInfo
  onCellDragStart: ReactEventHandler
  onCellDragging: ReactEventHandler
  onCellDragEnd: ReactEventHandler
  calcAreaInfo: () => void
}

export const useSelectArea = (): UseSelectAreaReturns => {
  const [selectedArea, setSelectedArea] = useState<SelectedArea>(defaultSelectedArea)
  const [selectAreaInfo, setSelectAreaInfo] = useState<SelectAreaInfo>(defaultSelectAreaInfo)
  const isDragging = useRef(false)

  const selectArea = useCallback((selectedArea: SelectedArea) => setSelectedArea(selectedArea), [setSelectedArea])

  const onCellDragStart: ReactEventHandler = e => {
    console.log('cell 드래그 시작!')
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

  const selectedAreaSorted = useMemo(() => {
    const { si, sj, ei, ej } = selectedArea
    return { si: Math.min(si, ei), sj: Math.min(sj, ej), ei: Math.max(si, ei), ej: Math.max(sj, ej) }
  }, [selectedArea])

  const calcAreaInfo = useCallback(() => {
    const { si, sj, ei, ej } = selectedArea
    const rect = getAreaRect(si, sj, ei, ej)
    if (rect) {
      setSelectAreaInfo(rect)
    }
  }, [selectedArea, setSelectAreaInfo])

  useEffect(() => {
    calcAreaInfo()
  }, [calcAreaInfo])

  return {
    selectedArea,
    selectedAreaSorted,
    selectArea,
    selectAreaInfo,
    onCellDragStart,
    onCellDragging,
    onCellDragEnd,
    calcAreaInfo,
  }
}
