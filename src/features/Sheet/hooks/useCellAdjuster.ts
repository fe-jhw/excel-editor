import { useSelectArea } from '../../../hooks/useSelectArea'
import { useEditorValues } from '@/context/EditorContext'
import { defaultCellHeight, defaultCellWidth, defaultHeights, defaultWidths } from '@/data/SheetConstants'
import { ICell } from 'editor'
import { setDragCursor } from '@/utils/EventUtils'
import { getLengthArr } from '@/utils/SheetUtils'
import produce from 'immer'
import { ReactEventHandler, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useChangeCells } from '../../../hooks/useChangeCells'
import { useSelectCell } from '../../../hooks/useSelectCell'

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

type SetWidth = (idx: number, width: number) => void
type SetHeight = (idx: number, height: number) => void

export interface LineInfo {
  active: boolean
  absPos: number
  type: 'col' | 'row'
}

type DivMouseEventHandler = React.MouseEventHandler<HTMLDivElement>

export const useCellAdjuster = ({ type }: UseCellAdjusterProps): UseCellAdjusterReturns => {
  // const { cells, changeCells, calcAreaInfo, calcBoxInfo } = useContext(EditorContext)
  const { cells } = useEditorValues()
  const { changeCells } = useChangeCells()
  const { calcSelectedAreaRect } = useSelectArea()
  const { calcSelectedCellRect } = useSelectCell()

  const isResizing = useRef(false)
  const adjustInfo = useRef({ originLen: 0, idx: -1, start: 0, end: 0 })

  const lengthArr = getLengthArr(type, cells)

  const totalLength =
    (type === 'col' ? defaultCellWidth : defaultCellHeight) +
    lengthArr.reduce((acc, cur) => {
      return acc + cur
    }, 0)

  const recalcRects = useCallback(() => {
    calcSelectedAreaRect()
    calcSelectedCellRect()
  }, [calcSelectedAreaRect, calcSelectedCellRect])

  const setWidth: SetWidth = useCallback(
    (col, width) => {
      changeCells(0, col, cells.length - 1, col, { width: width < 0 ? 0 : width })
      setTimeout(recalcRects, 100)
    },
    [cells.length, changeCells, recalcRects]
  )

  const setHeight: SetHeight = useCallback(
    (row, height) => {
      changeCells(row, 0, row, cells[0].length - 1, { height: height < 0 ? 0 : height })
      setTimeout(recalcRects, 100)
    },
    [cells, changeCells, recalcRects]
  )

  const adjustRect = useCallback(
    (e: React.MouseEvent): void => {
      const end = type === 'col' ? e.clientX : e.clientY
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
      adjustRect(e)
    },
    [adjustRect]
  )
  const onBorderDragEnd: DivMouseEventHandler = useCallback(
    e => {
      e.stopPropagation()
      if (isResizing.current === false) {
        return
      }
      setDragCursor('empty')
      isResizing.current = false
      adjustRect(e)
    },
    [adjustRect]
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
