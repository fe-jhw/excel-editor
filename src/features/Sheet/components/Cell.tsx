import { ICell } from 'editor'
import { format, getCellRect } from '@/utils/SheetUtils'
import { memo } from 'react'
import { baseCellStyle } from '../data/constants'
import * as O from '@/utils/option'

interface CellProps {
  cell: ICell
  i: number
  j: number
}

export const Cell = memo(function ({ cell, i, j }: CellProps) {
  const { value, width, height, ...cellStyle } = cell
  const { border, ...baseDivStyle } = cellStyle
  const cellRect = getCellRect(width, height)

  return (
    <td style={{ ...baseCellStyle, ...cellStyle, ...cellRect }} id={`${i}-${j}`}>
      <div
        style={{
          ...baseDivStyle,
          height: `${O.getOrElseFromUndefined(cellStyle.fontSize, 11) + 4}px`,
          display: 'flex',
          justifyContent:
            cellStyle.textAlign === 'right' ? 'flex-end' : cellStyle.textAlign === 'left' ? 'flex-start' : 'center',
          alignItems: 'center',
        }}
        id={`${i}-${j}`}
        data-testid={`${i}-${j}`}
      >
        {format(cell.value, O.getOrElseFromUndefined(cell.format, 'general'))}
      </div>
    </td>
  )
})
