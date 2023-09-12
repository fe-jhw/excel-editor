import { border, color, height } from '@/data/variables.style'
const DocsBar = lazy(() =>
  import('@/features/Header').then(({ DocsBar }) => ({
    default: DocsBar,
  }))
)
const TitleBar = lazy(() =>
  import('@/features/Header').then(({ TitleBar }) => ({
    default: TitleBar,
  }))
)

import { css } from '@emotion/react'
import { lazy } from 'react'

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
