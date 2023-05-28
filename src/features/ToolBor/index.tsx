import { border, height } from '@/data/variables.style'
import { css } from '@emotion/react'
import { AlignBox, CellBox, FontBox, FormatBox, StyleBox } from './components'

export function Toolbar() {
  return (
    <div css={toolbarCss}>
      <FontBox />
      <AlignBox />
      <FormatBox />
      <StyleBox />
      <CellBox />
    </div>
  )
}

const toolbarCss = css`
  height: ${height.toolbar};
  padding-top: 4px;
  border-bottom: ${border.basic};
  background-color: #f5f5f5;
`
