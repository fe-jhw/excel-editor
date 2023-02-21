import { EditorContext } from '@/context'
import { Input } from 'antd'
import { useContext } from 'react'

export function SelectBox() {
  const { selectBoxInfo } = useContext(EditorContext)
  return (
    <div className="select-box" style={selectBoxInfo}>
      <Input bordered={false} style={{ position: 'relative', height: '100%', padding: 0 }} />
    </div>
  )
}
