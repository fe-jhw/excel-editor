import { ICell } from '@/types'
import { useCallback, useEffect, useState } from 'react'

type History = ICell[][]

interface UseHistoryProps {
  cells: ICell[][]
  setCells: React.Dispatch<React.SetStateAction<ICell[][]>>
}

interface UseHistoryReturns {
  canRedo: boolean
  canUndo: boolean
  redo: () => void
  undo: () => void
}

export const useHistory = ({ cells, setCells }: UseHistoryProps): UseHistoryReturns => {
  const [histories, setHisotries] = useState<History[]>([])
  const [curIdx, setCurIdx] = useState<number>(0)
  // cells가 변경될때마다 addhistory한다. redo undo일때 제외하고

  useEffect(() => {
    console.log('hi~')
  }, [cells])

  const addHistory = useCallback(
    (history: History) => {
      setHisotries(prev => [...prev, history])
      setCurIdx(prev => prev + 1)
    },
    [setHisotries]
  )

  const canRedo = curIdx < histories.length - 1

  const canUndo = curIdx > 0

  const redo = () => {}
  const undo = () => {}
  return { canRedo, canUndo, redo, undo }
}
