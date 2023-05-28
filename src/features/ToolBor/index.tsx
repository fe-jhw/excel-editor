import { AlignBox, CellBox, FontBox, FormatBox, StyleBox } from './components'

export function Toolbar() {
  return (
    <div className="toolbar">
      <FontBox />
      <AlignBox />
      <FormatBox />
      <StyleBox />
      <CellBox />
    </div>
  )
}
