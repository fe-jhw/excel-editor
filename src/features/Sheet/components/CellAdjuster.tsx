import { defaultAdjusterBorderThickness, defaultCellHeight, defaultCellWidth } from '@/data/SheetConstants'
import { LineInfo, useCellAdjuster } from '@/hooks/useCellAdjuster'
import { setDragCursor } from '@/utils/EventUtils'
import { memo, useContext, useRef } from 'react'

interface CellAdjusterProps {
  type: 'col' | 'row'
}

interface CellAdjusterBorderProps {
  absPos: number
  idx: number
  type: 'col' | 'row'
}

export function CellAdjuster({ type }: CellAdjusterProps) {
  const { setWidth, setHeight, onBorderDragStart, onBorderDragging, onBorderDragEnd, lengthArr, totalLength } =
    useCellAdjuster({ type })
  const style = type === 'col' ? { width: totalLength } : { height: totalLength }
  const absPosArr = getAbsPosArr(type, lengthArr)
  return (
    <div
      className={`cell-adjuster-wrapper ${type}`}
      onMouseDown={onBorderDragStart}
      onMouseMove={onBorderDragging}
      onMouseUp={onBorderDragEnd}
      onMouseLeave={onBorderDragEnd}
    >
      <div className={`cell-adjuster ${type}`} style={style}>
        {absPosArr.map((absPos, idx) => (
          <CellAdjusterBorder key={idx} absPos={absPos} idx={idx} type={type} />
        ))}
      </div>
    </div>
  )
}

// TODO: memo 활용
const CellAdjusterBorder = memo(function ({ absPos, idx, type }: CellAdjusterBorderProps) {
  const borderStyle =
    type === 'col'
      ? {
          left: absPos,
        }
      : {
          top: absPos,
        }
  return <div data-id={`${idx}`} className={`border ${type}`} style={borderStyle} draggable="true" />
})

function getAbsPosArr(type: 'col' | 'row', lengthArr: number[]): number[] {
  const res = []
  let absPos = type === 'col' ? defaultCellWidth : 0

  for (const len of lengthArr) {
    absPos += len
    res.push(absPos - defaultAdjusterBorderThickness / 2)
  }
  return res
}
