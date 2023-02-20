import { ICell } from '@/types'
import { useContext, useMemo } from 'react'
import { EditorContext } from '@/context'
import { getColumnArr, getRowArr } from '@/utils/SheetUtils'
import { SelectBox } from '@/components'

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

const baseCellStyle = { border: '1px solid rgb(218, 220, 224)', height: '28px', minWidth: '50px' }

export function Sheet() {
  const { cells, onCellClick } = useContext(EditorContext)

  return (
    <div className="sheet">
      <ColumnHeader length={cells.length} />
      <div className="sheet-main">
        <RowHeader length={cells[0].length} />
        <SelectBox />
        <table onClick={onCellClick}>
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

function Row({ row, i }: RowProps) {
  return (
    <tr>
      {row.map((cell: ICell, j: number) => (
        <Cell cell={cell} key={j} i={i} j={j} />
      ))}
    </tr>
  )
}

// TODO: Memo 적용 , equalProps custom
function Cell({ cell, i, j }: CellProps) {
  return (
    <td style={baseCellStyle} id={`${i}-${j}`}>
      {cell.value}
    </td>
  )
}

function RowHeader({ length }: HeaderProps) {
  const rowArr = useMemo(() => getRowArr(length), [length])
  return (
    <table className="table-header row-header">
      <tbody>
        {rowArr.map(num => (
          <tr key={num}>
            <td style={baseCellStyle}>{num}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ColumnHeader({ length }: HeaderProps) {
  const columnArr = useMemo(() => getColumnArr(length), [length])
  return (
    <table className="table-header column-header">
      <thead>
        <tr>
          <td className="select-all-btn" style={baseCellStyle}></td>
          {columnArr.map(num => (
            <td key={num} style={baseCellStyle}>
              {num}
            </td>
          ))}
        </tr>
      </thead>
    </table>
  )
}
