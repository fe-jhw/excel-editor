import { Divider, Space } from 'antd'
import { Fontbox, FormatBox, AlignBox, StyleBox, CellBox, EditBox } from './Toolbox'

export function Toolbar() {
  return (
    <div className="toolbar">
      <Fontbox />
      <AlignBox />
      <FormatBox />
      <StyleBox />
      <CellBox />
      <EditBox />
    </div>
  )
}
