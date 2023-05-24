import { EditorContext } from '@/context'
import { defaultCellHeight, defaultCellWidth, defaultHeights, defaultWidths } from '@/data/SheetConstants'
import { Height, ICell, Width } from '@/types'
import { setDragCursor } from '@/utils/EventUtils'
import { getLengthArr } from '@/utils/SheetUtils'
import produce from 'immer'
import { ReactEventHandler, useCallback, useContext, useEffect, useRef, useState } from 'react'
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
  lineInfo: LineInfo
}

export interface LineInfo {
  active: boolean
  absPos: number
  type: 'col' | 'row'
}

type DivMouseEventHandler = React.MouseEventHandler<HTMLDivElement>

export const useCellAdjuster = ({ type }: UseCellAdjusterProps): UseCellAdjusterReturns => {
  const { cells, changeCells } = useContext(EditorContext)
  const isResizing = useRef(false)
  const adjustInfo = useRef({ originLen: 0, idx: -1, start: 0, end: 0 })

  const [lineInfo, setLineInfo] = useState<LineInfo>({ active: false, absPos: 0, type })
  const lengthArr = getLengthArr(type, cells)

  // const lengthArr = getLengthArr(type, cells)
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
        const { left, top, width, height } = target.getClientRects()[0]
        console.log(left, top, width, height)
        const start = type === 'col' ? left + width / 2 : top + height / 2
        adjustInfo.current.start = start
        setLineInfo(prev => ({ ...prev, active: true, absPos: start }))
        adjustInfo.current.idx = parseInt(target.dataset['id'] ?? '-1')
        adjustInfo.current.originLen = lengthArr[adjustInfo.current.idx]
      }
    },
    [lengthArr, type]
  )
  const onBorderDragging: DivMouseEventHandler = useCallback(
    e => {
      if (!isResizing.current) {
        return
      }
      e.stopPropagation()
      // console.dir(e)
      const absPos = type === 'col' ? e.clientX : e.clientY
      console.dir(e.nativeEvent)
      setLineInfo(prev => ({ ...prev, absPos }))
    },
    [type]
  )
  const onBorderDragEnd: DivMouseEventHandler = useCallback(
    e => {
      e.stopPropagation()
      if (isResizing.current === false) {
        return
      }
      setDragCursor('empty')
      isResizing.current = false
      console.log('드래그 끝!')
      const end = type === 'col' ? e.clientX : e.clientY
      setLineInfo(prev => ({ ...prev, active: false, absPos: end }))
      adjustInfo.current.end = end

      const diff = adjustInfo.current.end - adjustInfo.current.start
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
    lineInfo,
  }
}
