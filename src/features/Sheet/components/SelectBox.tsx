import { useEditorValues } from '@/context/_EditorContext'
import { useChangeCells } from '@/hooks/useChangeCells'
import { useSelectCell } from '@/hooks/useSelectCell'
import { Input } from 'antd'
import { ChangeEventHandler, useCallback } from 'react'

export function SelectBox() {
  const { cells, selectedCell } = useEditorValues()
  const { selectedCellRect } = useSelectCell()
  const { changeCells } = useChangeCells()

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => changeCells(i, j, i, j, { value: e.target.value }),
    []
  )

  const { i, j } = selectedCell
  const { value, ...cellStyle } = cells[i][j]

  return (
    <div
      className="select-box"
      style={{
        ...selectedCellRect,
        display: 'flex',
        justifyContent:
          cellStyle.textAlign === 'right' ? 'flex-end' : cellStyle.textAlign === 'left' ? 'flex-start' : 'center',
        alignItems:
          cellStyle.verticalAlign === 'top' ? 'start' : cellStyle.verticalAlign === 'bottom' ? 'end' : 'center',
        backgroundColor: cellStyle.backgroundColor,
      }}
    >
      <Input
        bordered={false}
        style={{
          position: 'relative',

          marginTop: '0px',
          borderRadius: 0,
          padding: 0,
          ...cellStyle,
          height: cellStyle.fontSize,
          border: 'none',
        }}
        key={`${i}-${j}}`}
        value={cells[i][j].value}
        onChange={e => changeCells(i, j, i, j, { value: e.target.value })}
        // onChange={e => onChangeValue(e)}
      />
    </div>
  )
}
