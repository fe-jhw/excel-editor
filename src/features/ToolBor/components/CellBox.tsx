import { EditorContext } from '@/context'
import {
  InsertRowAboveOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import { useCallback, useContext } from 'react'
import { ToolBox } from './ToolBox'

export function CellBox() {
  const { selectedArea, insertRowAbove, insertRowBelow, insertColLeft, insertColRight } = useContext(EditorContext)
  const insertRowAboveSelected = useCallback(() => {
    insertRowAbove(selectedArea.si)
  }, [selectedArea, insertRowAbove])

  const insertRowBelowSelected = useCallback(() => {
    insertRowBelow(selectedArea.ei)
  }, [selectedArea, insertRowBelow])

  const insertColLeftSelected = useCallback(() => {
    insertColLeft(selectedArea.sj)
  }, [selectedArea, insertColLeft])

  const insertColRightSelected = useCallback(() => {
    insertColRight(selectedArea.ej)
  }, [selectedArea, insertColRight])
  return (
    <ToolBox.Wrapper>
      <ToolBox.Layer>
        <Button icon={<InsertRowAboveOutlined />} onClick={insertRowAboveSelected} />
        <Button icon={<InsertRowBelowOutlined />} onClick={insertRowBelowSelected} />
      </ToolBox.Layer>
      <ToolBox.Layer>
        <Button icon={<InsertRowLeftOutlined />} onClick={insertColLeftSelected} />
        <Button icon={<InsertRowRightOutlined />} onClick={insertColRightSelected} />
      </ToolBox.Layer>
      <ToolBox.Title>셀</ToolBox.Title>
    </ToolBox.Wrapper>
  )
}
