import { SelectedCell } from '../types/editor'
import { useEditorValues, useEditorActions } from '@/context/_EditorContext'
import { parseCellId, getCellRectInfo, getAreaRect } from '@/utils/SheetUtils'
import { ReactEventHandler, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { SelectedArea, SelectAreaInfo, SelectedAreaRect } from 'editor'
import { defaultSelectAreaInfo, defaultCellHeight, defaultCellWidth, defaultSelectedArea } from '@/data/SheetConstants'

export interface UseSelectAreaReturns {
  selectedArea: SelectedArea
  selectedAreaSorted: Omit<SelectedArea, 'active'>
  selectAreaInfo: SelectAreaInfo
  onCellDragStart: ReactEventHandler
  onCellDragging: ReactEventHandler
  onCellDragEnd: ReactEventHandler
  calcAreaInfo: () => void
}

export const useSelectArea = (): UseSelectAreaReturns => {
  const { selectedArea } = useEditorValues()
  const { setSelectedArea } = useEditorActions()
  const [selectedAreaRect, setSelectedAreaRect] = useState<SelectedAreaRect>(defaultSelectedAreaRect)

  const isDragging = useRef(false)

  const onCellDragStart: ReactEventHandler = useCallback(
    e => {
      isDragging.current = true
      const target = e.target as HTMLElement
      if (target.id) {
        const { i, j } = parseCellId(target.id)
        setSelectedArea({ si: i, sj: j, ei: i, ej: j, active: true })
      }
    },
    [setSelectedArea]
  )

  const onCellDragging: ReactEventHandler = useCallback(
    e => {
      if (!isDragging.current) {
        return
      }
      const target = e.target as HTMLElement
      if (target.id) {
        const { i, j } = parseCellId(target.id)
        setSelectedArea((prev: SelectedArea) => ({ ...prev, ei: i, ej: j }))
      }
    },
    [setSelectedArea]
  )

  const onCellDragEnd: ReactEventHandler = useCallback(() => {
    isDragging.current = false
  }, [])

  const selectedAreaSorted = useMemo(() => {
    const { si, sj, ei, ej } = selectedArea
    return { si: Math.min(si, ei), sj: Math.min(sj, ej), ei: Math.max(si, ei), ej: Math.max(sj, ej) }
  }, [selectedArea])

  const calcAreaRect = useCallback(() => {
    const { si, sj, ei, ej } = selectedArea
    const rect = getAreaRect(si, sj, ei, ej)
    if (rect) {
      setSelectedAreaRect(rect)
    }
  }, [selectedArea, setSelectedAreaRect])

  useEffect(() => {
    calcAreaRect()
  }, [calcAreaRect])

  return {
    selectedArea,
    selectedAreaSorted,
    selectedAreaRect,
    onCellDragStart,
    onCellDragging,
    onCellDragEnd,
    calcAreaRect,
  }
}
