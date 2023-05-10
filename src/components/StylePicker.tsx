import { styles } from '@/data/ToolBoxConstants'
import { EditorContext } from '@/context'
import produce from 'immer'
import { useCallback, useContext } from 'react'

interface CellStyle {
  border?: string
  backgroundColor?: string
  color?: string
}

// TODO: Cell, Table 컴포넌트 하나로 합쳐보기
export function CellStylePicker() {
  const { changeSelectedCells } = useContext(EditorContext)
  const onStyleChange = useCallback(
    (style: CellStyle & { name: string }) => {
      const { name, ...menuStyle } = style
      changeSelectedCells(menuStyle)
    },
    [changeSelectedCells]
  )
  return (
    <div className="style-picker">
      {styles.cell.map(style => {
        const { name, ...menuStyle } = style
        return (
          <div className="example-cell" key={name} style={menuStyle} onClick={() => onStyleChange(style)}>
            {style.name}
          </div>
        )
      })}
    </div>
  )
}

const TABLE_EXAMPLE_COL = 5
const TABLE_EXAMPLE_ROW = 3

export function TableStylePicker() {
  const { selectedAreaSorted, changeCells, cells, setCells, addHistory } = useContext(EditorContext)
  //TODO: changeCells 2개 setCells로 변경하기~
  const onStyleChange = useCallback(
    (header: CellStyle, body: CellStyle) => {
      const { si, sj, ei, ej } = selectedAreaSorted
      const nextCells = produce(cells, draft => {
        for (let i = si; i <= si; i++) {
          for (let j = sj; j <= ej; j++) {
            draft[i][j] = { ...draft[i][j], ...header }
          }
        }
        for (let i = si + 1; i <= ei; i++) {
          for (let j = sj; j <= ej; j++) {
            draft[i][j] = { ...draft[i][j], ...body }
          }
        }
      })
      setCells(nextCells)
      addHistory(nextCells)
      // changeCells(si, sj, si, ej, header)
      // changeCells(si + 1, sj, ei, ej, body)
    },
    [selectedAreaSorted, cells, setCells, addHistory]
  )
  return (
    <div className="style-picker">
      {styles.table.map((style, idx) => {
        const { header, body } = style
        return (
          <div className="example-table" key={idx} onClick={() => onStyleChange(header, body)}>
            <ExampleTable header={header} body={body} />
          </div>
        )
      })}
    </div>
  )
}

const EXAMPLE_TABLE_CELL_TEXT = '~'

function ExampleTable({ header, body }: { header: CellStyle; body: CellStyle }) {
  return (
    <>
      <div className="example-table-row">
        {new Array(TABLE_EXAMPLE_COL).fill(0).map((_, idx) => (
          <div className="example-table-cell" style={header} key={idx}>
            {EXAMPLE_TABLE_CELL_TEXT}
          </div>
        ))}
      </div>
      {new Array(TABLE_EXAMPLE_ROW).fill(0).map((_, idx) => (
        <div className="example-table-row" key={idx}>
          {new Array(TABLE_EXAMPLE_COL).fill(0).map((_, idx) => (
            <div className="example-table-cell" style={body} key={idx}>
              {EXAMPLE_TABLE_CELL_TEXT}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
