import { border, color, height } from '@/data/variables.style'
import { DocsBar, TitleBar } from '@/features/Header'
import { css } from '@emotion/react'

export function Header() {
  return (
    <div css={headerCss}>
      <TitleBar />
      <DocsBar />
    </div>
  )
}

const headerCss = css`
  border-bottom: ${border.basic};
  background-color: ${color['main-bg']};
  height: ${height.header};
`
