import { ICell } from '@/types'
import { useCallback, useEffect, useState } from 'react'

type History = ICell[][]

interface UseHistoryProps {
  cells: ICell[][]
  setCells: React.Dispatch<React.SetStateAction<ICell[][]>>
}

export const useHistory = ({ cells, setCells }: UseHistoryProps) => {
  const [histories, setHisotries] = useState<History[]>([])
  const [curIdx, setCurIdx] = useState<number>(0)

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
}
