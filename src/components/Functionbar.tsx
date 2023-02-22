import { EditorContext } from '@/context'
import { changeNumToAlphabet } from '@/utils/SheetUtils'
import { Divider, Input } from 'antd'
import { useContext } from 'react'

export function Functionbar() {
  const { selected, cells, changeCell } = useContext(EditorContext)
  const { i, j } = selected
  return (
    <div className="functionbar">
      <Input
        style={{ width: '100px', marginRight: '4px' }}
        readOnly
        value={`${changeNumToAlphabet(selected.j + 1)}${selected.i + 1}`}
      />
      <Input
        style={{ width: 'calc(100% - 108px)' }}
        value={cells[i][j].value}
        onChange={e => changeCell(i, j, { value: e.target.value })}
      />
    </div>
  )
}
