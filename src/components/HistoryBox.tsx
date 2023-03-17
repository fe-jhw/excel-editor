import { EditorContext } from '@/context'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useContext } from 'react'

export function HistoryBox() {
  const { redo, undo, canRedo, canUndo } = useContext(EditorContext)
  return (
    <div className="historybox">
      <Button icon={<ArrowLeftOutlined />} onClick={undo} disabled={!canUndo} type="text" />
      <Button icon={<ArrowRightOutlined />} onClick={redo} disabled={!canRedo} type="text" />
    </div>
  )
}
