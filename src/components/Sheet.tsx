import { ICell } from '@/types'
import { useContext, useMemo, useState, useCallback, MouseEvent, memo, Fragment } from 'react'
import { EditorContext } from '@/context'
import { format, getCellRect, getColumnArr, getLengthArr, getRowArr, isInRange, parseCellId } from '@/utils/SheetUtils'
import { isMouseDownContextMenu, blockDragEvent } from '@/utils/EventUtils'
import { SelectBox, SelectArea, ContextMenu, CopyArea, CellAdjuster } from '@/components'
import { useContextMenu } from '@/hooks/useContextMenu'
import { useIntersectionObserverRef } from '@/hooks/useIntersectionObserver'
import * as O from '@/utils/option'
import { useKeyHandler } from '@/hooks/useKeyHandler'
import { AnimatePresence, motion } from 'framer-motion'
import { defaultCellHeight, defaultCellWidth } from '@/data/SheetConstants'

interface RowProps {
  row: ICell[]
  i: number
}

interface CellProps {
  cell: ICell
  i: number
  j: number
}

interface HeaderProps {
  lengthArr: number[]
}

interface CellAutoAdderProps {
  length: number
  type: 'col' | 'row'
}

const baseCellStyle = {
  border: '1px solid rgb(218, 220, 224)',
  height: '28px',
  // minHeight: '28px',
  // maxHeight: '28px',
  // minWidth: '50px',
  width: '50px',
  // maxWidth: '50px',
  overflow: 'hidden',
}

export function Sheet() {
  const { selectedArea, cells, onCellClick, onCellDragStart, onCellDragging, onCellDragEnd } = useContext(EditorContext)
  const { contextMenu, onContextMenu } = useContextMenu()
  const { onArrowKey, onRedo, onUndo, onCopy, onCut, onPaste } = useKeyHandler()
  const onSheetMouseDown = useCallback(
    (e: MouseEvent) => {
      if (isMouseDownContextMenu(e)) {
        const target = e.target as HTMLElement
        if (target.id) {
          const { i, j } = parseCellId(target.id)
          const { si, sj, ei, ej } = selectedArea
          if (isInRange(i, [si, ei]) && isInRange(j, [sj, ej])) {
            return
          }
        }
      }
      onCellClick(e)
      onCellDragStart(e)
    },
    [onCellClick, onCellDragStart, selectedArea]
  )

  const colLengthArr = getLengthArr('col', cells)
  const rowLengthArr = getLengthArr('row', cells)

  return (
    <div
      className="sheet"
      onMouseDown={onSheetMouseDown}
      onMouseOver={onCellDragging}
      onMouseUp={onCellDragEnd}
      onKeyDown={e => {
        onArrowKey(e)
        onRedo(e)
        onUndo(e)
        onCopy(e)
        onCut(e)
        onPaste(e)
      }}
      {...blockDragEvent}
      tabIndex={-1}
    >
      <ColumnHeader lengthArr={colLengthArr} />
      <div className="sheet-main" onContextMenu={onContextMenu}>
        <RowHeader lengthArr={rowLengthArr} />
        <ContextMenu {...contextMenu} />
        <SelectBox />
        <SelectArea />
        <CopyArea />
        <table>
          <tbody>
            {cells.map((row: ICell[], i: number) => (
              <Row row={row} key={i} i={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Row = memo(function ({ row, i }: RowProps) {
  return (
    <tr>
      {row.map((cell: ICell, j: number) => (
        <Cell cell={cell} key={cell.uuid} i={i} j={j} />
      ))}
    </tr>
  )
})

const Cell = memo(function ({ cell, i, j }: CellProps) {
  const { value, width, height, ...cellStyle } = cell
  const { border, ...baseDivStyle } = cellStyle
  const cellRect = getCellRect(width, height)

  return (
    <td style={{ ...baseCellStyle, ...cellStyle, ...cellRect }} id={`${i}-${j}`}>
      <div
        style={{
          ...baseDivStyle,
          // width,
          height: `${O.getOrElseFromUndefined(cellStyle.fontSize, 11) + 4}px`,
          display: 'flex',
          justifyContent:
            cellStyle.textAlign === 'right' ? 'flex-end' : cellStyle.textAlign === 'left' ? 'flex-start' : 'center',
          // alignItems: verticalAlign === 'top' ? 'flex-start' : verticalAlign === 'bottom' ? 'flex-end' : 'center',
          alignItems: 'center',
        }}
        id={`${i}-${j}`}
      >
        {format(cell.value, O.getOrElseFromUndefined(cell.format, 'general'))}
      </div>
    </td>
  )
})

const RowHeader = memo(function ({ lengthArr }: HeaderProps) {
  const { activeRowRange } = useContext(EditorContext)
  const cellRects = lengthArr.map(len => getCellRect(defaultCellWidth, len))
  return (
    <>
      <table
        className="table-header row-header"
        onContextMenu={e => {
          e.stopPropagation()
        }}
      >
        <tbody>
          {cellRects.map((rect, idx) => (
            <tr key={idx}>
              <td style={{ ...baseCellStyle, ...rect }} className={isInRange(idx, activeRowRange) ? 'active' : ''}>
                {idx + 1}
              </td>
            </tr>
          ))}
          <tr>
            <CellAutoAdder length={lengthArr.length} type="row" />
          </tr>
        </tbody>
      </table>
      <CellAdjuster type="row" />
    </>
  )
})

const ColumnHeader = memo(function ({ lengthArr }: HeaderProps) {
  const { activeColRange } = useContext(EditorContext)
  const cellRects = lengthArr.map(len => getCellRect(len, defaultCellHeight))
  const selectAllRect = getCellRect(defaultCellWidth, defaultCellHeight)
  return (
    <>
      <table className="table-header column-header">
        <thead>
          <tr>
            <td className="select-all-btn" style={{ ...baseCellStyle, ...selectAllRect }}></td>
            {cellRects.map((rect, idx) => (
              <Fragment key={idx}>
                <td style={{ ...baseCellStyle, ...rect }} className={isInRange(idx, activeColRange) ? 'active' : ''}>
                  {idx + 1}
                </td>
              </Fragment>
            ))}
            <CellAutoAdder length={lengthArr.length} type="col" />
          </tr>
        </thead>
      </table>
      <CellAdjuster type="col" />
    </>
  )
})

function CellAutoAdder({ length, type }: CellAutoAdderProps) {
  const { insertColRight, insertRowBelow } = useContext(EditorContext)
  const iOcallback = useCallback(() => {
    if (type === 'col') {
      insertColRight(length - 1)
    } else {
      insertRowBelow(length - 1)
    }
  }, [length, insertColRight, insertRowBelow, type])
  const adderRef = useIntersectionObserverRef<HTMLTableCellElement>({
    callback: iOcallback,
  })
  return <td style={{ visibility: 'hidden' }} ref={adderRef} />
}
