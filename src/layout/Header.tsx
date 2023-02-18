import { Input, Dropdown, Button, Divider } from 'antd'
import type { MenuProps } from 'antd'
import { useState } from 'react'
export default function Header() {
  return (
    <div className="header">
      <TitleBar />
      <DocsBar />
    </div>
  )
}

function TitleBar() {
  const [title, setTitle] = useState('')
  return (
    <div>
      <Input
        value={title}
        onChange={e => setTitle(e.target.value)}
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

const docsBarTitles = ['파일', '편집', '보기', '삽입', '형식', '데이터'] as const

type DocsBarTitles = (typeof docsBarTitles)[number]

const docsBarItems: { [key in DocsBarTitles]: MenuProps['items'] } = {
  파일: [
    {
      key: '1',
      label: '새로 만들기',
    },
    {
      key: '2',
      label: '열기',
    },
    {
      key: '3',
      label: '다운로드',
    },
  ],
  편집: [
    {
      key: '1',
      label: '새로 만들기',
    },
    {
      key: '2',
      label: '열기',
    },
    {
      key: '3',
      label: '다운로드',
    },
  ],
  보기: [],
  삽입: [],
  형식: [],
  데이터: [],
}

function DocsBar() {
  return (
    <div>
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
