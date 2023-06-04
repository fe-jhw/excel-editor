import { ToggleButton } from '@/components'
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { useTargetCell } from '../hooks/useTargetCell'
import { ToolBox } from './ToolBox'

export function AlignBox() {
  // TODO: 각 Box별로 중복되는 애 처리하기
  // TODO: textAlign typing 한거 자세히 정리하기
  const targetCell = useTargetCell()

  return (
    <ToolBox.Wrapper>
      <ToolBox.Layer>
        <ToggleButton
          value={targetCell?.verticalAlign}
          valueIfActive="top"
          propertyName="verticalAlign"
          icon={<VerticalAlignTopOutlined />}
        />
        <ToggleButton
          value={targetCell?.verticalAlign}
          valueIfActive="middle"
          propertyName="verticalAlign"
          icon={<VerticalAlignMiddleOutlined />}
        />
        <ToggleButton
          value={targetCell?.verticalAlign}
          valueIfActive="bottom"
          propertyName="verticalAlign"
          icon={<VerticalAlignBottomOutlined />}
        />
      </ToolBox.Layer>
      <ToolBox.Layer>
        <ToggleButton
          value={targetCell?.textAlign}
          valueIfActive="left"
          propertyName="textAlign"
          icon={<AlignLeftOutlined />}
        />
        <ToggleButton
          value={targetCell?.textAlign}
          valueIfActive="center"
          propertyName="textAlign"
          icon={<AlignCenterOutlined />}
        />
        <ToggleButton
          value={targetCell?.textAlign}
          valueIfActive="right"
          propertyName="textAlign"
          icon={<AlignRightOutlined />}
        />
      </ToolBox.Layer>
      <ToolBox.Title>정렬</ToolBox.Title>
    </ToolBox.Wrapper>
  )
}
