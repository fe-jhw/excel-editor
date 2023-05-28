import { EditorContext } from '@/context'
import produce from 'immer'
import { useCallback, useContext } from 'react'

interface CellStyle {
  border?: string
  backgroundColor?: string
  color?: string
}

const styles = {
  cell: [
    { name: '표준', border: '1px solid lightgray', backgroundColor: '#fff', color: '#000' },
    { name: '나쁨', border: 'none', backgroundColor: '#FFC7CE', color: '#BE5882' },
    { name: '보통', border: 'none', backgroundColor: '#FFEB9C', color: '#000' },
    { name: '좋음', border: 'none', backgroundColor: '#C6EFCE', color: '#000' },
  ],
  table: [
    {
      header: { border: 'none', backgroundColor: '#C6EFCE', color: '#000' },
      body: { border: 'none', backgroundColor: '#FFC7CE', color: '#BE5882' },
    },
    {
      header: { border: 'none', backgroundColor: 'blue', color: '#fff' },
      body: { border: 'none', backgroundColor: 'skyblue', color: 'black' },
    },
  ],
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
  const { selectedAreaSorted, changeCells, cells, setCells, setCellsWithHistory } = useContext(EditorContext)
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
      setCellsWithHistory(nextCells)
      // changeCells(si, sj, si, ej, header)
      // changeCells(si + 1, sj, ei, ej, body)
    },
    [selectedAreaSorted, cells, setCellsWithHistory]
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
