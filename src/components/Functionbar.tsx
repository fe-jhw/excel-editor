import { EditorContext } from '@/context'
import { useDebounce } from '@/hooks/useDebounce'
import { changeNumToAlphabet } from '@/utils/SheetUtils'
import { Divider, Input } from 'antd'
import { useContext } from 'react'
import * as O from '@/utils/option'
import { css } from '@emotion/react'
import { border, color, height } from '@/data/variables.style'

export function Functionbar() {
  const { selected, cells, changeCell } = useContext(EditorContext)
  const { i, j } = selected

  return (
    <div css={functionBarCss}>
      <Input
        style={{ width: '100px', marginRight: '4px' }}
        readOnly
        value={`${changeNumToAlphabet(selected.j + 1)}${selected.i + 1}`}
      />
      <Input
        style={{ width: 'calc(100% - 108px)' }}
        key={`${i}-${j}`}
        value={cells[i][j].value}
        onChange={e => changeCell(i, j, { value: e.target.value })}
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
