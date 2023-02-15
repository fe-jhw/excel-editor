import { Divider, Input } from 'antd'

// TODO: 배경색 상수로 관리
export default function Functionbar() {
  return (
    <div
      style={{
        padding: '4px 0',
        borderBottom: '1px solid rgb(218, 220, 224)',
        backgroundColor: '#F5F5F5',
      }}
    >
      <Input style={{ width: '10%', marginRight: '4px' }} />
      <Input style={{ width: 'calc(90% - 4px)' }} />
    </div>
  )
}
