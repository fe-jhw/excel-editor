import { useEditorValues, useEditorActions } from '@/context/EditorContext'
import { defaultCellWidth, defaultSelectedCellRect } from '@/data/SheetConstants'
import { ReactEventHandler, useState, useEffect, useCallback } from 'react'
import { SelectedCell, SelectedCellRect } from 'editor'
import { parseCellId } from '@/utils/SheetUtils'

export interface UseSelectCellReturns {
  selectedCellRect: SelectedCellRect
  onCellClick: ReactEventHandler
  calcSelectedCellRect: () => void
}

export const useSelectCell = (): UseSelectCellReturns => {
  const { selectedCell } = useEditorValues()
  const { setSelectedCell } = useEditorActions()
  const [selectedCellRect, setSelectedCellRect] = useState<SelectedCellRect>(defaultSelectedCellRect)

  const onCellClick: ReactEventHandler = useCallback(e => {
    const target = e.target as HTMLElement
    if (target.id) {
      setSelectedCell(parseCellId(target.id))
    }
  }, [])

  const calcSelectedCellRect = useCallback(() => {
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
    calcSelectedCellRect()
  }, [calcSelectedCellRect])

  return { selectedCellRect, onCellClick, calcSelectedCellRect }
}
