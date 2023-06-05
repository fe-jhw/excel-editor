import { CellAdjuster } from './CellAdjuster'
import { defaultCellWidth } from '@/data/SheetConstants'
import { getCellRect, isInRange } from '@/utils/SheetUtils'
import { memo, useContext } from 'react'
import { baseCellStyle } from '../data/constants'
import { CellAutoAdder } from './CellAutoAdder'
import { useHeader } from '@/features/Sheet/hooks/useHeader'

interface RowHeaderProps {
  lengthArr: number[]
}

export const RowHeader = memo(function ({ lengthArr }: RowHeaderProps) {
  const { activeRowRange } = useHeader()
  const cellRects = lengthArr.map(len => getCellRect(defaultCellWidth, len))
  return (
    <div className="table-header-wrapper row">
      <table
        className="table-header row-header"
        onContextMenu={e => {
          e.stopPropagation()
        }}
      >
        <tbody>
          {cellRects.map((rect, idx) => (
            <tr key={idx}>
              <td style={{ ...baseCellStyle, ...rect }} className={isInRange(idx, activeRowRange) ? 'active' : ''}>
                {idx + 1}
              </td>
            </tr>
          ))}
          <tr>
            <CellAutoAdder length={lengthArr.length} type="row" />
          </tr>
        </tbody>
      </table>
      <CellAdjuster type="row" />
    </div>
  )
})
