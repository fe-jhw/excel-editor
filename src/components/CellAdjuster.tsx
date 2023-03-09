import { setDragCursor } from '@/utils/EventUtils'
import { useRef } from 'react'

interface CellAdjusterProps {
  length: number
  type: 'col' | 'row'
}

interface CellAdjusterBorderProps {
  idx: number
  type: 'col' | 'row'
}

export function CellAdjuster({ length, type }: CellAdjusterProps) {
  const isResizing = useRef(false)
  // length 대신 각 row,col 너비,높이 담긴 배열이 온다.
  return (
    <div
      className={`cell-adjuster ${type}`}
      // TODO: 전부다 sheet전체에 넣는다
      onMouseDown={e => {
        const target = e.target as HTMLElement
        if (target.classList.contains('border')) {
          e.stopPropagation()
          setDragCursor(type)
          isResizing.current = true
          console.log('드래그 시작!')
        }
      }}
      onMouseOver={e => {
        if (!isResizing.current) {
          return
        }
        e.stopPropagation()
        console.log('드래그 중!')
      }}
      onMouseUp={e => {
        e.stopPropagation()
        setDragCursor('empty')
        isResizing.current = false
        console.log('드래그 끝!')
      }}
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
  return <div className={`border ${type}`} style={{ left: `${(idx + 1) * 30 + 10 + 50}px` }} draggable="true" />
}
