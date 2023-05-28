import { ToggleButton } from '@/components'
import { EditorContext } from '@/context'
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { useContext } from 'react'
import { ToolBox } from './ToolBox'

export function AlignBox() {
  // TODO: 각 Box별로 중복되는 애 처리하기
  // TODO: textAlign typing 한거 자세히 정리하기
  const { selectedCell, changeSelectedCells } = useContext(EditorContext)
  return (
    <ToolBox.Wrapper>
      <ToolBox.Layer>
        <ToggleButton
          value={selectedCell?.verticalAlign}
          valueIfActive="top"
          propertyName="verticalAlign"
          icon={<VerticalAlignTopOutlined />}
        />
        <ToggleButton
          value={selectedCell?.verticalAlign}
          valueIfActive="middle"
          propertyName="verticalAlign"
          icon={<VerticalAlignMiddleOutlined />}
        />
        <ToggleButton
          value={selectedCell?.verticalAlign}
          valueIfActive="bottom"
          propertyName="verticalAlign"
          icon={<VerticalAlignBottomOutlined />}
        />
      </ToolBox.Layer>
      <ToolBox.Layer>
        <ToggleButton
          value={selectedCell?.textAlign}
          valueIfActive="left"
          propertyName="textAlign"
          icon={<AlignLeftOutlined />}
        />
        <ToggleButton
          value={selectedCell?.textAlign}
          valueIfActive="center"
          propertyName="textAlign"
          icon={<AlignCenterOutlined />}
        />
        <ToggleButton
          value={selectedCell?.textAlign}
          valueIfActive="right"
          propertyName="textAlign"
          icon={<AlignRightOutlined />}
        />
      </ToolBox.Layer>
      <ToolBox.Title>정렬</ToolBox.Title>
    </ToolBox.Wrapper>
  )
}
