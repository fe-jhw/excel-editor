import { ICell } from 'editor'
import { memo } from 'react'
import { Cell } from './Cell'

interface RowProps {
  row: ICell[]
  i: number
}

export const Row = memo(function ({ row, i }: RowProps) {
  return (
    <tr>
      {row.map((cell: ICell, j: number) => (
        <Cell cell={cell} key={cell.uuid} i={i} j={j} />
      ))}
    </tr>
  )
})
