import { useEditorValues } from '@/context/EditorContext'
import { ICell } from 'editor'
import { useMemo } from 'react'

interface UseTargetCellReturns {
  targetCell: ICell
}

export const useTargetCell = (): UseTargetCellReturns => {
  const { cells, selectedCell } = useEditorValues()
  const targetCell = useMemo(() => cells[selectedCell.i][selectedCell.j], [cells, selectedCell.i, selectedCell.j])

  return { targetCell }
}
