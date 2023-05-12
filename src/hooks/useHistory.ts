import { useDebounce } from '@/hooks/useDebounce'
import { ICell, History, HistoryInfo } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import produce from 'immer'
import { getDefaultCell, getDefaultCells } from '@/utils/SheetUtils'

interface UseHistoryProps {
  setCells: React.Dispatch<React.SetStateAction<ICell[][]>>
}

export interface UseHistoryReturns {
  canRedo: boolean
  canUndo: boolean
  redo: () => void
  undo: () => void
  historyInfo: HistoryInfo
  setHistoryInfo: React.Dispatch<React.SetStateAction<HistoryInfo>>
  addHistory: (history: History) => void
  addHistoryWithDebounce: (history: History) => void
}

export const useHistory = ({ setCells }: UseHistoryProps): UseHistoryReturns => {
  const [historyInfo, setHistoryInfo] = useState<HistoryInfo>({ stack: [getDefaultCells(30, 30)], curIdx: 0 })
  // cells가 변경될때마다 addhistory한다. redo undo일때 제외하고

  useEffect(() => {
    console.log('---historyInfo---')
    console.log(historyInfo)
  }, [historyInfo])

  const addHistory = useCallback(
    (history: History) => {
      setHistoryInfo((prev: HistoryInfo) =>
        produce(prev, draft => {
          draft.stack.push(history)
          draft.curIdx += 1
        })
      )
    },
    [setHistoryInfo]
  )

  // FIX: curIdx랑 꼬여서 제대로 작동하지 않음....
  const addHistoryWithDebounce = useDebounce({
    callback: addHistory,
    timeout: 300,
  })

  const canRedo = historyInfo.curIdx < historyInfo.stack.length - 1

  const canUndo = historyInfo.curIdx > 0

  const redo = () => {
    // console.log('redo!', `setCells(histories[${curIdx + 1}]})`, histories[curIdx + 1][0][0])
    const { stack, curIdx } = historyInfo
    setCells(stack[curIdx + 1])
    setHistoryInfo((prev: HistoryInfo) =>
      produce(prev, draft => {
        draft.curIdx += 1
      })
    )
  }

  const undo = () => {
    const { stack, curIdx } = historyInfo
    setCells(stack[curIdx - 1])
    setHistoryInfo((prev: HistoryInfo) =>
      produce(prev, draft => {
        draft.curIdx -= 1
      })
    )
  }

  return { canRedo, canUndo, redo, undo, addHistory, historyInfo, setHistoryInfo, addHistoryWithDebounce }
}
