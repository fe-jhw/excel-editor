import { EditorContext } from '@/context'
import { defaultCellHeight, defaultCellWidth } from '@/data/SheetConstants'
import { useCellAdjuster } from '@/hooks/useCellAdjuster'
import { setDragCursor } from '@/utils/EventUtils'
import { useContext, useRef } from 'react'

interface CellAdjusterProps {
  length: number
  type: 'col' | 'row'
}

interface CellAdjusterBorderProps {
  idx: number
  type: 'col' | 'row'
}

export function CellAdjuster({ length, type }: CellAdjusterProps) {
  const { setWidth, setHeight, onBorderDragStart, onBorderDragging, onBorderDragEnd, lengthArr, totalLength } =
    useCellAdjuster({ type })
  const style = type === 'col' ? { width: totalLength } : { height: totalLength }
  return (
    <div
      className={`cell-adjuster ${type}`}
      style={style}
      onMouseDown={onBorderDragStart}
      onMouseOver={onBorderDragging}
      onMouseUp={onBorderDragEnd}
    >
      {new Array(length).fill(false).map((_, idx) => (
        <CellAdjusterBorder key={idx} idx={idx} type="col" />
      ))}
    </div>
  )
}

// TODO: memo 활용
// TODO: cell의 width,height 관리 방안
// 1) cell의 width와 height은 row, col별로 따로 관리 (각 row, col만 바꾸면댐 대신 history cells + (width,height) 2개 봐야함)
// 2) 각 cell별로 관리 -> width 바꿀떄마다 너무 많이 바뀜 (대신 history관리 cells로만 해서 편함)
function CellAdjusterBorder({ idx, type }: CellAdjusterBorderProps) {
  return (
    <div
      data-id={`${idx}`}
      className={`border ${type}`}
      style={{ left: `${(idx + 1) * 30 + 10 + 50}px` }}
      draggable="true"
    />
  )
}
