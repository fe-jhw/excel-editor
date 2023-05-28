import { EditorContext } from '@/context'
import { fileState } from '@/data/store'
import { useInterval } from '@/hooks/useInterval'
import { useToggle } from '@/hooks/useToggle'
import { SaveTwoTone } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Button, Divider, Dropdown, Switch } from 'antd'
import { useCallback, useContext } from 'react'
import { useRecoilState } from 'recoil'
import { docsBarItems, docsBarTitles } from '../data/constants'
import { getNow } from '../utils/getNow'

export function DocsBar() {
  const { renewRecoilState } = useContext(EditorContext)
  const [autoSave, toggleAutoSave] = useToggle(false)
  const [file, setFile] = useRecoilState(fileState)

  const { lastEditTime } = file
  const setLastEditTime = useCallback(
    (time: string) => {
      setFile(prev => ({ ...prev, lastEditTime: time }))
    },
    [setFile]
  )

  const save = useCallback(() => {
    renewRecoilState()
    setLastEditTime(getNow())
  }, [renewRecoilState, setLastEditTime])

  useInterval(() => {
    if (autoSave) {
      save()
    }
  }, 60000)

  return (
    <div css={wrapperCss}>
      <div css={saveCss}>
        <Button type="text" icon={<SaveTwoTone />} onClick={() => save()} />
        <span css={saveTextCss}>{lastEditTime != null ? `${lastEditTime} 저장됨` : `저장되지 않음`}</span>
        <Divider type="vertical" />
        <span css={saveTextCss}>자동저장</span>
        <Switch
          size="small"
          style={{ marginLeft: '4px', marginTop: '2px' }}
          checked={autoSave}
          onClick={() => {
            toggleAutoSave()
          }}
        />
      </div>
      {docsBarTitles.map(title => (
        <Dropdown key={title} menu={{ items: docsBarItems[title] }} placement="bottomLeft" trigger={['click']}>
          <Button type="text" style={{ fontSize: '14px', fontWeight: 400 }}>
            {title}
          </Button>
        </Dropdown>
      ))}
    </div>
  )
}

const wrapperCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: '8px',
})

const saveCss = css({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '8px',
})

const saveTextCss = css`
  margin-right: 4px;
  font-size: 14px;
`
