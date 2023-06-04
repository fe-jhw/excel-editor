import { useHistory } from '@/hooks/useHistory'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button } from 'antd'

export function HistoryBox() {
  const { redo, undo, canRedo, canUndo } = useHistory()
  return (
    <div css={historyBoxCss}>
      <Button icon={<ArrowLeftOutlined />} onClick={undo} disabled={!canUndo} type="text" />
      <Button icon={<ArrowRightOutlined />} onClick={redo} disabled={!canRedo} type="text" />
    </div>
  )
}

const historyBoxCss = css`
  position: absolute;
  top: 2px;
  right: 0px;
`
