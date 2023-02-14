import { Divider, Space } from 'antd'
import { Fontbox, FormatBox, AlignBox, StyleBox, CellBox, EditBox } from './Toolbox'

// TODO: borderBottom 중복되게 입력하느데 상수로 선언해서 쓰자
export default function Toolbar() {
  return (
    <div
      style={{
        paddingTop: '4px',
        borderBottom: '1px solid rgb(218, 220, 224)',
      }}
    >
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
