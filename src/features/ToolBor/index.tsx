import { border, height } from '@/data/variables.style'
import { css } from '@emotion/react'
import { lazy } from 'react'

const AlignBox = lazy(() =>
  import('./components/AlignBox').then(({ AlignBox }) => ({
    default: AlignBox,
  }))
)
const CellBox = lazy(() =>
  import('./components/CellBox').then(({ CellBox }) => ({
    default: CellBox,
  }))
)
const FontBox = lazy(() =>
  import('./components/FontBox').then(({ FontBox }) => ({
    default: FontBox,
  }))
)
const FormatBox = lazy(() =>
  import('./components/FormatBox').then(({ FormatBox }) => ({
    default: FormatBox,
  }))
)
const StyleBox = lazy(() =>
  import('./components/StyleBox').then(({ StyleBox }) => ({
    default: StyleBox,
  }))
)
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
