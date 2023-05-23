import { EditorContext } from '@/context'
import { defaultCellHeight, defaultCellWidth, defaultHeights, defaultWidths } from '@/data/SheetConstants'
import { Height, ICell, Width } from '@/types'
import { setDragCursor } from '@/utils/EventUtils'
import produce from 'immer'
import { ReactEventHandler, useCallback, useContext, useRef, useState } from 'react'
import { ChangeCells } from './useCells'

type SetWidth = (idx: number, width: Width) => void
type SetHeight = (idx: number, height: Height) => void

export interface UseCellAdjusterProps {
  type: 'col' | 'row'
}

export interface UseCellAdjusterReturns {
  setWidth: SetWidth
  setHeight: SetHeight
  onBorderDragStart: DivMouseEventHandler
  onBorderDragging: DivMouseEventHandler
  onBorderDragEnd: DivMouseEventHandler
  lengthArr: number[]
  totalLength: number
}

type DivMouseEventHandler = React.MouseEventHandler<HTMLDivElement>

export const useCellAdjuster = ({ type }: UseCellAdjusterProps): UseCellAdjusterReturns => {
  const { cells, changeCells } = useContext(EditorContext)
  const isResizing = useRef(false)
  const adjustInfo = useRef({ originLen: 0, idx: -1, start: 0, end: 0 })
  // length 대신 각 row,col 너비,높이 담긴 배열이 온다.
  const lengthArr = type === 'col' ? cells[0].map(({ width }) => width) : cells.map(row => row[0]?.height)
  const totalLength =
    (type === 'col' ? defaultCellWidth : defaultCellHeight) +
    lengthArr.reduce((acc, cur) => {
      return acc + cur
    }, 0)

  const setWidth: SetWidth = useCallback(
    (col, width) => {
      changeCells(0, col, cells.length - 1, col, { width: width < 0 ? 0 : width })
    },
    [cells.length, changeCells]
  )

  const setHeight: SetHeight = useCallback(
    (row, height) => {
      changeCells(row, 0, row, cells[0].length - 1, { height: height < 0 ? 0 : height })
    },
    [cells, changeCells]
  )

  const onBorderDragStart: DivMouseEventHandler = useCallback(
    e => {
      const target = e.target as HTMLElement
      if (target.classList.contains('border')) {
        e.stopPropagation()
        setDragCursor(type)
        isResizing.current = true
        // console.log(target.getClientRects()[0])
        const { left, top, width, height } = target.getClientRects()[0]
        // const start = type === 'col' ? e.screenX : e.screenY
        const start = type === 'col' ? left + width / 2 : top + height / 2
        adjustInfo.current.start = start
        adjustInfo.current.idx = parseInt(target.dataset['id'] ?? '-1')
        adjustInfo.current.originLen = lengthArr[adjustInfo.current.idx]
      }
    },
    [lengthArr, type]
  )
  const onBorderDragging: DivMouseEventHandler = useCallback(e => {
    if (!isResizing.current) {
      return
    }
    e.stopPropagation()
    console.log('드래그 중!')
  }, [])
  const onBorderDragEnd: DivMouseEventHandler = useCallback(
    e => {
      e.stopPropagation()
      setDragCursor('empty')
      isResizing.current = false
      console.log('드래그 끝!')
      const end = type === 'col' ? e.screenX : e.screenY
      adjustInfo.current.end = end

      const diff = adjustInfo.current.end - adjustInfo.current.start
      // console.log(adjustInfo.current.originLen, diff)
      if (type === 'col') {
        setWidth(adjustInfo.current.idx, adjustInfo.current.originLen + diff)
      } else {
        setHeight(adjustInfo.current.idx, adjustInfo.current.originLen + diff)
      }
    },
    [setHeight, setWidth, type]
  )

  return {
    setWidth,
    setHeight,
    onBorderDragStart,
    onBorderDragging,
    onBorderDragEnd,
    lengthArr,
    totalLength,
  }
}
