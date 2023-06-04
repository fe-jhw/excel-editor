import { useEditorValues, useEditorActions } from '@/context/_EditorContext'
import {
  defaultselectedCellRect,
  defaultCellHeight,
  defaultCellWidth,
  defaultSelectedCell,
} from '@/data/SheetConstants'
import { ReactEventHandler, useState, useEffect, useCallback } from 'react'
import { SelectedCell, SelectedCellRect } from 'editor'
import { parseCellId } from '@/utils/SheetUtils'

export interface UseSelectBoxReturns {
  selectedCellRect: selectedCellRect
  onCellClick: ReactEventHandler
  calcBoxRect: () => void
}

export const useSelectCell = (): UseSelectBoxReturns => {
  // const [selected, setSelected] = useState<SelectedCell>(defaultSelectedCell)
  const { selectedCell } = useEditorValues()
  const { setSelectedCell } = useEditorActions()
  const [selectedCellRect, setSelectedCellRect] = useState<selectedCellRect>(defaultSelectedCellRect)

  const onCellClick: ReactEventHandler = useCallback(e => {
    const target = e.target as HTMLElement
    if (target.id) {
      setSelectedCell(parseCellId(target.id))
    }
  }, [])

  const calcBoxRect = useCallback(() => {
    if (selectedCell !== null) {
      const { i, j } = selectedCell
      const cellEl = document.getElementById(`${i}-${j}`)
      if (cellEl) {
        const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = cellEl
        setSelectedCellRect({
          width: offsetWidth - 2,
          height: offsetHeight - 2,
          top: offsetTop + 1,
          left: offsetLeft + defaultCellWidth + 2,
        })
      }
    }
  }, [selectedCell])

  useEffect(() => {
    calcBoxRect()
  }, [calcBoxRect])

  return { selectedCellRect, onCellClick, calcBoxRect }
}
