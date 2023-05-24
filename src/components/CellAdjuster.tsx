import { EditorContext } from '@/context'
import { defaultAdjusterBorderThickness, defaultCellHeight, defaultCellWidth } from '@/data/SheetConstants'
import { LineInfo, useCellAdjuster } from '@/hooks/useCellAdjuster'
import { setDragCursor } from '@/utils/EventUtils'
import { useContext, useRef } from 'react'

interface CellAdjusterProps {
  type: 'col' | 'row'
}

interface CellAdjusterBorderProps {
  absPos: number
  idx: number
  type: 'col' | 'row'
}

export function CellAdjuster({ type }: CellAdjusterProps) {
  const {
    lineInfo,
    setWidth,
    setHeight,
    onBorderDragStart,
    onBorderDragging,
    onBorderDragEnd,
    lengthArr,
    totalLength,
  } = useCellAdjuster({ type })
  const style = type === 'col' ? { width: totalLength } : { height: totalLength }
  const absPosArr = getAbsPosArr(type, lengthArr)
  return (
    <div onMouseDown={onBorderDragStart} onMouseMove={onBorderDragging} onMouseUp={onBorderDragEnd}>
      <CellAdjusterLine lineInfo={lineInfo} />
      <div className={`cell-adjuster ${type}`} style={style}>
        {absPosArr.map((absPos, idx) => (
          <CellAdjusterBorder key={idx} absPos={absPos} idx={idx} type={type} />
        ))}
      </div>
    </div>
  )
}

// TODO: memo 활용
function CellAdjusterBorder({ absPos, idx, type }: CellAdjusterBorderProps) {
  const borderStyle =
    type === 'col'
      ? {
          left: absPos,
        }
      : {
          top: absPos,
        }
  return <div data-id={`${idx}`} className={`border ${type}`} style={borderStyle} draggable="true" />
}

const topAreaLen = 239

function CellAdjusterLine({ lineInfo }: { lineInfo: LineInfo }) {
  const { type, active, absPos } = lineInfo
  const lineStyle =
    type === 'col'
      ? {
          left: absPos,
        }
      : {
          top: absPos - topAreaLen,
        }
  return <>{active ? <div className={`cell-adjuster-line ${type}`} style={lineStyle} /> : <></>}</>
}

function getAbsPosArr(type: 'col' | 'row', lengthArr: number[]): number[] {
  const res = []
  let absPos = type === 'col' ? defaultCellWidth : 0

  for (const len of lengthArr) {
    absPos += len
    res.push(absPos - defaultAdjusterBorderThickness / 2)
  }
  return res
}
