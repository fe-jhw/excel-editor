import { CellAdjuster } from './CellAdjuster'
import { EditorContext } from '@/context'
import { defaultCellHeight, defaultCellWidth } from '@/data/SheetConstants'
import { getCellRect, getColumnArr, isInRange } from '@/utils/SheetUtils'
import { Fragment, memo, useContext, useMemo } from 'react'
import { baseCellStyle } from '../data/constants'
import { CellAutoAdder } from './CellAutoAdder'

interface ColumnHeaderProps {
  lengthArr: number[]
}

export const ColumnHeader = memo(function ({ lengthArr }: ColumnHeaderProps) {
  const { activeColRange } = useContext(EditorContext)
  const cellRects = lengthArr.map(len => getCellRect(len, defaultCellHeight))
  const selectAllRect = getCellRect(defaultCellWidth, defaultCellHeight)

  const columnAlphabets = useMemo(() => getColumnArr(cellRects.length), [cellRects.length])

  return (
    <div className="table-header-wrapper col">
      <table className="table-header column-header">
        <thead>
          <tr>
            <td className="select-all-btn" style={{ ...baseCellStyle, ...selectAllRect }}></td>
            {cellRects.map((rect, idx) => (
              <Fragment key={idx}>
                <td style={{ ...baseCellStyle, ...rect }} className={isInRange(idx, activeColRange) ? 'active' : ''}>
                  {columnAlphabets[idx]}
                </td>
              </Fragment>
            ))}
            <CellAutoAdder length={lengthArr.length} type="col" />
          </tr>
        </thead>
      </table>
      <CellAdjuster type="col" />
    </div>
  )
})
