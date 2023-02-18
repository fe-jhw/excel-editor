import { ICell } from '@/types'
import { useContext } from 'react'
import { EditorContext } from '@/context'

export function Sheet() {
  const { cells } = useContext(EditorContext)
  return (
    <div className="sheet">
      <table>
        <tbody>
          {cells.map((row: ICell[], idx: number) => (
            <Row row={row} key={idx} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface RowProps {
  row: ICell[]
}

function Row({ row }: RowProps) {
  return (
    <tr>
      {row.map((cell: ICell, idx: number) => (
        <Cell cell={cell} key={idx} />
      ))}
    </tr>
  )
}

interface CellProps {
  cell: ICell
}

// TODO: useMemo 적용 , equalProps custom
function Cell({ cell }: CellProps) {
  return <td style={{ border: '1px solid rgb(218, 220, 224)', height: '28px', minWidth: '50px' }}>{cell.value}</td>
}
