import { CellAdjuster } from './CellAdjuster'
import { defaultCellHeight, defaultCellWidth } from '@/data/SheetConstants'
import { getCellRect, getColumnArr, isInRange } from '@/utils/SheetUtils'
import { Fragment, memo, useMemo } from 'react'
import { baseCellStyle } from '../data/constants'
import { CellAutoAdder } from './CellAutoAdder'
import { useEditorValues } from '@/context/EditorContext'
import { useHeader } from '@/features/Sheet/hooks/useHeader'

interface ColumnHeaderProps {
  lengthArr: number[]
}

export const ColumnHeader = memo(function ({ lengthArr }: ColumnHeaderProps) {
  const { activeColRange } = useHeader()
  const cellRects = useMemo(() => lengthArr.map(len => getCellRect(len, defaultCellHeight)), [lengthArr])
  const selectAllRect = useMemo(() => getCellRect(defaultCellWidth, defaultCellHeight), [])

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
