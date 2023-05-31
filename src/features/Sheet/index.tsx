import { SelectBox } from './components/SelectBox'
import { SelectArea } from './components/SelectArea'
import { ContextMenu } from './components/ContextMenu'
import { CopyArea } from './components/CopyArea'
import { EditorContext } from '@/context'
import { useContextMenu } from '@/hooks/useContextMenu'
import { useKeyHandler } from '@/hooks/useKeyHandler'
import { ICell } from 'editor'
import { blockDragEvent, isMouseDownContextMenu } from '@/utils/EventUtils'
import { getLengthArr, isInRange, parseCellId } from '@/utils/SheetUtils'
import { useCallback, MouseEvent, useContext } from 'react'
import { ColumnHeader } from './components/ColumnHeader'
import { Row } from './components/Row'
import { RowHeader } from './components/RowHeader'
import '@/asset/sheet.scss'

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
        <table className="sheet-table">
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
