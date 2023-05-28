import { fileState } from '@/data/store'
import { border } from '@/data/variables.style'
import { css } from '@emotion/react'
import { Input } from 'antd'
import { ChangeEvent, useCallback } from 'react'
import { useRecoilState } from 'recoil'

export function TitleBar() {
  const [file, setFile] = useRecoilState(fileState)

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFile(prev => ({ ...prev, title: e.target.value }))
    },
    [setFile]
  )

  return (
    <div css={titleBarCss}>
      <Input
        value={file.title}
        onChange={onChangeTitle}
        placeholder="제목을 입력해주세요."
        bordered={false}
        style={{
          fontSize: '18px',
          fontWeight: 400,
        }}
      />
    </div>
  )
}

const titleBarCss = css`
  border-bottom: ${border.basic};
`
