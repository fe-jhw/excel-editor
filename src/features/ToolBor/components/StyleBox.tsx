import { CellStylePicker, TableStylePicker } from './StylePicker'
import { FormOutlined, TableOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { ToolBox } from './ToolBox'

export function StyleBox() {
  return (
    <ToolBox.Wrapper>
      <ToolBox.Layer>
        <Dropdown trigger={['click']} dropdownRender={() => <CellStylePicker />}>
          <Button icon={<FormOutlined />}>셀 스타일</Button>
        </Dropdown>
      </ToolBox.Layer>
      <ToolBox.Layer>
        <Dropdown trigger={['click']} dropdownRender={() => <TableStylePicker />}>
          <Button icon={<TableOutlined />}>표 스타일</Button>
        </Dropdown>
      </ToolBox.Layer>
      <ToolBox.Title>스타일</ToolBox.Title>
    </ToolBox.Wrapper>
  )
}
