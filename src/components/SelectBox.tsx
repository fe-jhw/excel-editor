import { EditorContext } from '@/context'
import { Input } from 'antd'
import { useContext } from 'react'

export function SelectBox() {
  const { cells, changeCell, selected, selectBoxInfo } = useContext(EditorContext)
  const { i, j } = selected
  const { value, ...cellStyle } = cells[i][j]
  return (
    <div
      className="select-box"
      style={{
        ...selectBoxInfo,
        display: 'flex',
        alignItems:
          cellStyle.verticalAlign === 'top' ? 'start' : cellStyle.verticalAlign === 'bottom' ? 'end' : 'center',
        backgroundColor: cellStyle.backgroundColor,
        padding: '3px 0',
      }}
    >
      <Input
        bordered={false}
        style={{
          position: 'relative',
          height: cellStyle.fontSize,
          marginTop: '0px',
          borderRadius: 0,
          padding: 0,
          ...cellStyle,
          border: 'none',
        }}
        value={cells[i][j].value}
        onChange={e => changeCell(i, j, { value: e.target.value })}
      />
    </div>
  )
}
