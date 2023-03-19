import { useDebounce } from '@/hooks/useDebounce'
import { defaultCells } from '@/constants/SheetConstants'
import { ICell } from '@/types'
import { useCallback, useEffect, useState } from 'react'

type History = ICell[][]

interface UseHistoryProps {
  setCells: React.Dispatch<React.SetStateAction<ICell[][]>>
}

export interface UseHistoryReturns {
  canRedo: boolean
  canUndo: boolean
  redo: () => void
  undo: () => void
  addHistory: (history: History) => void
  addHistoryWithDebounce: (history: History) => void
}

export const useHistory = ({ setCells }: UseHistoryProps): UseHistoryReturns => {
  const [histories, setHisotries] = useState<History[]>([defaultCells])
  const [curIdx, setCurIdx] = useState<number>(0)
  // cells가 변경될때마다 addhistory한다. redo undo일때 제외하고

  // useEffect(() => {
  //   console.log(histories)
  // }, [histories])

  const addHistory = useCallback(
    (history: History) => {
      setHisotries(prev => [...prev.slice(0, curIdx + 1), history])
      setCurIdx(prev => prev + 1)
    },
    [setHisotries, setCurIdx, curIdx]
  )

  // FIX: curIdx랑 꼬여서 제대로 작동하지 않음....
  const addHistoryWithDebounce = useDebounce({
    callback: addHistory,
    timeout: 300,
  })

  const canRedo = curIdx < histories.length - 1

  const canUndo = curIdx > 0

  const redo = () => {
    // console.log('redo!', `setCells(histories[${curIdx + 1}]})`, histories[curIdx + 1][0][0])
    setCells(histories[curIdx + 1])
    setCurIdx(prev => prev + 1)
  }

  const undo = () => {
    setCells(histories[curIdx - 1])
    setCurIdx(prev => prev - 1)
  }

  return { canRedo, canUndo, redo, undo, addHistory, addHistoryWithDebounce }
}
