import { useMemo } from 'react'
import { useEditorValues } from '@/context/_EditorContext'
import { getActiveColumnRange, getActiveRowRange } from '@/utils/SheetUtils'

interface UseHeaderReturns {
  activeColRange: [number, number]
  activeRowRange: [number, number]
}

export const useHeader = (): UseHeaderReturns => {
  const { selectedCell, selectedArea } = useEditorValues()
  const activeColRange = useMemo(() => getActiveColumnRange(selectedCell, selectedArea), [selectedArea, selectedCell])
  const activeRowRange = useMemo(() => getActiveRowRange(selectedCell, selectedArea), [selectedArea, selectedCell])
  return {
    activeColRange,
    activeRowRange,
  }
}
