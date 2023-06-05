import { ExampleTable } from './ExampleTable'
import { CellStyle } from './types'
import { useCallback } from 'react'
import { styles } from './constants'
import { stylePickerCss } from './style'
import { useSelectArea } from '@/hooks/useSelectArea'
import { useEditorValues } from '@/context/EditorContext'
import { useChangeCells } from '@/hooks/useChangeCells'
import produce from 'immer'

export function TableStylePicker() {
  const { cells } = useEditorValues()
  const { changeCells, setCellsWithHistory } = useChangeCells()
  const { selectedAreaSorted } = useSelectArea()

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
    [cells, selectedAreaSorted, setCellsWithHistory]
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
