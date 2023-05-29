import { EXAMPLE_TABLE_CELL_TEXT, TABLE_EXAMPLE_COL, TABLE_EXAMPLE_ROW } from './constants'
import { CellStyle } from './types'

export function ExampleTable({ header, body }: { header: CellStyle; body: CellStyle }) {
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
