import { Divider, Space } from 'antd'
import { Fontbox, FormatBox, AlignBox, StyleBox, CellBox, EditBox } from './Toolbox'

export function Toolbar() {
  return (
    <div className="toolbar">
      <Fontbox />
      <Divider type="vertical" />
      <AlignBox />
      <Divider type="vertical" />
      <FormatBox />
      <Divider type="vertical" />
      <StyleBox />
      <Divider type="vertical" />
      <CellBox />
      <Divider type="vertical" />
      <EditBox />
    </div>
  )
}
