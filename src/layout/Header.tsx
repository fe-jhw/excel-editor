import { Input, Dropdown, Button, Divider } from 'antd'
import type { MenuProps } from 'antd'
import { ChangeEvent, ReactEventHandler, useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import { fileState } from '@/data/store'
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

const docsBarTitles = ['제작자 정보'] as const

type DocsBarTitles = (typeof docsBarTitles)[number]

function openNewTab(url: string) {
  window.open(url)
}

const docsBarItems: { [key in DocsBarTitles]: MenuProps['items'] } = {
  '제작자 정보': [
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
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '8px' }}>
      {docsBarTitles.map(title => (
        <Dropdown key={title} menu={{ items: docsBarItems[title] }} placement="bottomLeft" trigger={['click']}>
          <Button type="text" style={{ fontSize: '14px', fontWeight: 400 }}>
            {title}
          </Button>
        </Dropdown>
      ))}
      <span style={{ fontSize: '14px' }}>
        제작: <span style={{ fontWeight: 'bold', color: '#1677ff' }}>정현우</span>
      </span>
    </div>
  )
}
