import { ICell } from '@/types'
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
          // width,
          height: `${O.getOrElseFromUndefined(cellStyle.fontSize, 11) + 4}px`,
          // height: '100%',
          display: 'flex',
          justifyContent:
            cellStyle.textAlign === 'right' ? 'flex-end' : cellStyle.textAlign === 'left' ? 'flex-start' : 'center',
          // alignItems: verticalAlign === 'top' ? 'flex-start' : verticalAlign === 'bottom' ? 'flex-end' : 'center',
          alignItems: 'center',
        }}
        id={`${i}-${j}`}
      >
        {format(cell.value, O.getOrElseFromUndefined(cell.format, 'general'))}
      </div>
    </td>
  )
})
