import { useDebounce } from '@/hooks/useDebounce'
import { changeNumToAlphabet } from '@/utils/SheetUtils'
import { Divider, Input } from 'antd'
import { css } from '@emotion/react'
import { border, color, height } from '@/data/variables.style'
import { useEditorValues } from '@/context/EditorContext'
import { useChangeCells } from '@/hooks/useChangeCells'

export function Functionbar() {
  const { selectedCell, cells } = useEditorValues()
  const { i, j } = selectedCell
  const { changeCells } = useChangeCells()

  return (
    <div css={functionBarCss}>
      <Input
        style={{ width: '100px', marginRight: '4px' }}
        readOnly
        value={`${changeNumToAlphabet(j + 1)}${i + 1}`}
        data-testid="coordInput"
      />
      <Input
        style={{ width: 'calc(100% - 108px)' }}
        key={`${i}-${j}`}
        value={cells[i][j].value}
        onChange={e => changeCells(i, j, i, j, { value: e.target.value })}
        data-testid="valueInput"
      />
    </div>
  )
}

const functionBarCss = css`
  padding: 4px 0;
  border-bottom: ${border.basic};
  background-color: ${color['main-bg']};
  height: ${height.functionbar};
`
