import { useCallback } from 'react'
import { CellStyle } from './types'
import { styles } from './constants'
import { stylePickerCss } from './style'
import { useChangeCells } from '@/hooks/useChangeCells'

// TODO: Cell, Table 컴포넌트 하나로 합쳐보기
export function CellStylePicker() {
  const { changeSelectedCells } = useChangeCells()
  const onStyleChange = useCallback(
    (style: CellStyle & { name: string }) => {
      const { name, ...menuStyle } = style
      changeSelectedCells(menuStyle)
    },
    [changeSelectedCells]
  )
  return (
    <div css={stylePickerCss}>
      {styles.cell.map(style => {
        const { name, ...menuStyle } = style
        return (
          <div className="example-cell" key={name} style={menuStyle} onClick={() => onStyleChange(style)}>
            {style.name}
          </div>
        )
      })}
    </div>
  )
}
