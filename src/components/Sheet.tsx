import { ICell } from '@/types'
import { useContext, useMemo, useState, useCallback, MouseEvent, memo } from 'react'
import { EditorContext } from '@/context'
import { getColumnArr, getRowArr, isInRange, parseCellId } from '@/utils/SheetUtils'
import { isMouseDownContextMenu, blockDragEvent } from '@/utils/EventUtils'
import { SelectBox, SelectArea, ContextMenu, CopyArea } from '@/components'
import { useContextMenu } from '@/hooks/useContextMenu'
import { useIntersectionObserverRef } from '@/hooks/useIntersectionObserver'

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
  length: number
}

interface CellAutoAdderProps {
  length: number
  type: 'col' | 'row'
}

const baseCellStyle = {
  border: '1px solid rgb(218, 220, 224)',
  height: '28px',
  minHeight: '28px',
  maxHeight: '28px',
  minWidth: '50px',
  width: '50px',
  maxWidth: '50px',
  overflow: 'hidden',
}

export function Sheet() {
  const { selectedArea, cells, onCellClick, onCellDragStart, onCellDragging, onCellDragEnd } = useContext(EditorContext)
  const { contextMenu, onContextMenu } = useContextMenu()
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

  return (
    <div
      className="sheet"
      onMouseDown={onSheetMouseDown}
      onMouseOver={onCellDragging}
      onMouseUp={onCellDragEnd}
      {...blockDragEvent}
    >
      <ColumnHeader length={cells[0].length} />
      <div className="sheet-main" onContextMenu={onContextMenu}>
        <RowHeader length={cells.length} />
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
        <Cell cell={cell} key={j} i={i} j={j} />
      ))}
    </tr>
  )
})

// TODO: Memo 적용 , equalProps custom
const Cell = memo(function ({ cell, i, j }: CellProps) {
  const { value, ...cellStyle } = cell
  return (
    <td style={{ ...baseCellStyle, ...cellStyle }} id={`${i}-${j}`}>
      {cell.value}
    </td>
  )
})

const RowHeader = memo(function ({ length }: HeaderProps) {
  const rowArr = useMemo(() => getRowArr(length), [length])
  const { activeRowRange } = useContext(EditorContext)
  return (
    <table
      className="table-header row-header"
      onContextMenu={e => {
        e.stopPropagation()
      }}
    >
      <tbody>
        {rowArr.map((num, idx) => (
          <tr key={num}>
            <td style={baseCellStyle} className={isInRange(idx, activeRowRange) ? 'active' : ''}>
              {num}
            </td>
          </tr>
        ))}
        <tr>
          <CellAutoAdder length={length} type="row" />
        </tr>
      </tbody>
    </table>
  )
})

const ColumnHeader = memo(function ({ length }: HeaderProps) {
  const columnArr = useMemo(() => getColumnArr(length), [length])
  const { activeColRange } = useContext(EditorContext)
  return (
    <>
      <table className="table-header column-header">
        <thead>
          <tr>
            <td className="select-all-btn" style={baseCellStyle}></td>
            {columnArr.map((num, idx) => (
              <td key={num} style={baseCellStyle} className={isInRange(idx, activeColRange) ? 'active' : ''}>
                {num}
              </td>
            ))}
            <CellAutoAdder length={length} type="col" />
          </tr>
        </thead>
      </table>
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
  const adderRef = useIntersectionObserverRef<HTMLTableDataCellElement>({
    callback: iOcallback,
  })
  return <td style={{ visibility: 'hidden' }} ref={adderRef} />
}
