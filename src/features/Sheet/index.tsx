import { useCallback, MouseEvent, lazy } from 'react'
const SelectBox = lazy(() =>
  import('./components/SelectBox').then(({ SelectBox }) => ({
    default: SelectBox,
  }))
)
const SelectArea = lazy(() =>
  import('./components/SelectArea').then(({ SelectArea }) => ({
    default: SelectArea,
  }))
)
const ContextMenu = lazy(() =>
  import('./components/ContextMenu').then(({ ContextMenu }) => ({
    default: ContextMenu,
  }))
)
const CopyArea = lazy(() =>
  import('./components/CopyArea').then(({ CopyArea }) => ({
    default: CopyArea,
  }))
)
import { useContextMenu } from '@/features/Sheet/hooks/useContextMenu'
import { useKeyHandler } from '@/features/Sheet/hooks/useKeyHandler'
import { ICell } from 'editor'
import { blockDragEvent, isMouseDownContextMenu } from '@/utils/EventUtils'
import { getLengthArr, isInRange, parseCellId } from '@/utils/SheetUtils'

const ColumnHeader = lazy(() =>
  import('./components/ColumnHeader').then(({ ColumnHeader }) => ({
    default: ColumnHeader,
  }))
)
const Row = lazy(() =>
  import('./components/Row').then(({ Row }) => ({
    default: Row,
  }))
)
const RowHeader = lazy(() =>
  import('./components/RowHeader').then(({ RowHeader }) => ({
    default: RowHeader,
  }))
)
import '@/asset/sheet.scss'
import { useEditorValues } from '@/context/EditorContext'
import { useSelectCell } from '@/hooks/useSelectCell'
import { useSelectArea } from '@/hooks/useSelectArea'

export function Sheet() {
  const { selectedArea, cells } = useEditorValues()
  const { onCellClick } = useSelectCell()
  const { onCellDragStart, onCellDragging, onCellDragEnd } = useSelectArea()
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
