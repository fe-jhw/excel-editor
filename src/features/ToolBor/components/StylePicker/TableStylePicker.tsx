import { ExampleTable } from './ExampleTable'
import { CellStyle } from './types'
import { useCallback, useContext } from 'react'
import produce from 'immer'
import { EditorContext } from '@/context'
import { styles } from './constants'
import { stylePickerCss } from './style'

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
    },
    [selectedAreaSorted, cells, setCellsWithHistory]
  )
  return (
    <div css={stylePickerCss}>
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
