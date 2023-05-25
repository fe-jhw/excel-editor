import { Input, Dropdown, Button, Divider, Switch } from 'antd'
import type { MenuProps } from 'antd'
import { ChangeEvent, ReactEventHandler, useCallback, useContext, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { fileState } from '@/data/store'
import { useToggle } from '@/hooks/useToggle'
import { useInterval } from '@/hooks/useInterval'
import { EditorContext } from '@/context'
import { SaveOutlined, SaveTwoTone } from '@ant-design/icons'
export function Header() {
  return (
    <div className="header">
      <TitleBar />
      <DocsBar />
    </div>
  )
}

function TitleBar() {
  const [file, setFile] = useRecoilState(fileState)

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFile(prev => ({ ...prev, title: e.target.value }))
    },
    [setFile]
  )

  return (
    <div className="titlebar">
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

const docsBarTitles = ['제작자: 정현우'] as const

type DocsBarTitles = (typeof docsBarTitles)[number]

function openNewTab(url: string) {
  window.open(url)
}

const docsBarItems: { [key in DocsBarTitles]: MenuProps['items'] } = {
  '제작자: 정현우': [
    {
      key: '1',
      label: '블로그',
      onClick: () => {
        openNewTab('https://hyunwoo12.tistory.com/')
      },
    },
    {
      key: '2',
      label: '깃허브',
      onClick: () => {
        openNewTab('https://github.com/fe-jhw')
      },
    },
    {
      key: '3',
      label: '포트폴리오',
      onClick: () => {
        openNewTab('https://www.notion.so/a26d72ab9f4041e38897117d3612ad0c')
      },
    },
  ],
}

function DocsBar() {
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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
        <Button type="text" icon={<SaveTwoTone />} onClick={() => save()} />
        <span className="edit-config-text" style={{ marginRight: '4px', fontSize: '14px' }}>
          {lastEditTime != null ? `${lastEditTime} 저장됨` : `저장되지 않음`}
        </span>
        <Divider type="vertical" />
        <span className="edit-config-text">자동저장</span>
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

function getNow(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const hours = today.getHours()

  const minutes = today.getMinutes()
  const seconds = today.getSeconds()
  return `${year}/${month}/${date} ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
}

function formatTime(time: number): string {
  if (time < 10) {
    return `0${time}`
  }
  return `${time}`
}
