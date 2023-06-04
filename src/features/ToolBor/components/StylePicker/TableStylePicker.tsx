import { ExampleTable } from './ExampleTable'
import { CellStyle } from './types'
import { useCallback } from 'react'
import { styles } from './constants'
import { stylePickerCss } from './style'
import { useSelectArea } from '@/hooks/useSelectArea'
import { useEditorValues } from '@/context/_EditorContext'
import { useChangeCells } from '@/hooks/useChangeCells'

export function TableStylePicker() {
  const { cells } = useEditorValues()
  const { changeCells } = useChangeCells()
  const { selectedAreaSorted } = useSelectArea()

  //TODO: changeCells 2개 setCells로 변경하기~
  const onStyleChange = useCallback(
    (header: CellStyle, body: CellStyle) => {
      const { si, sj, ei, ej } = selectedAreaSorted
      changeCells(si, sj, sj, ej, header)
      changeCells(si + 1, sj, sj, ej, body)
    },
    [changeCells, selectedAreaSorted]
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
