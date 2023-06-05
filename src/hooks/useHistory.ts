import { useEditorActions, useEditorValues } from '@/context/EditorContext'
import { HistoryInfo, History } from 'editor'
import produce from 'immer'
import { useCallback, useMemo } from 'react'

export interface UseHistoryReturns {
  canRedo: boolean
  canUndo: boolean
  redo: () => void
  undo: () => void
  historyInfo: HistoryInfo
  setHistoryInfo: React.Dispatch<React.SetStateAction<HistoryInfo>>
  addHistory: (history: History) => void
}

export const useHistory = (): UseHistoryReturns => {
  const { historyInfo } = useEditorValues()
  const { setHistoryInfo, setCells } = useEditorActions()

  const addHistory = useCallback(
    (history: History) => {
      setHistoryInfo((prev: HistoryInfo) =>
        produce(prev, draft => {
          draft.stack = [...draft.stack.slice(0, draft.curIdx + 1), history]
          draft.curIdx += 1
        })
      )
    },
    [setHistoryInfo]
  )

  const canRedo = useMemo(
    () => historyInfo.curIdx < historyInfo.stack.length - 1,
    [historyInfo.curIdx, historyInfo.stack.length]
  )

  const canUndo = useMemo(() => historyInfo.curIdx > 0, [historyInfo.curIdx])

  const redo = useCallback(() => {
    const { stack, curIdx } = historyInfo
    setCells(stack[curIdx + 1])
    setHistoryInfo((prev: HistoryInfo) =>
      produce(prev, draft => {
        draft.curIdx += 1
      })
    )
  }, [historyInfo, setCells, setHistoryInfo])

  const undo = useCallback(() => {
    const { stack, curIdx } = historyInfo
    setCells(stack[curIdx - 1])
    setHistoryInfo((prev: HistoryInfo) =>
      produce(prev, draft => {
        draft.curIdx -= 1
      })
    )
  }, [historyInfo, setCells, setHistoryInfo])

  return { canRedo, canUndo, redo, undo, addHistory, historyInfo, setHistoryInfo }
}
