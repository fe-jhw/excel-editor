import { Divider, Input } from 'antd'

export default function Functionbar() {
  return (
    <div
      style={{
        padding: '4px 0',
        borderBottom: '1px solid rgb(218, 220, 224)',
      }}
    >
      <Input style={{ width: '10%', marginRight: '4px' }} />
      <Input style={{ width: 'calc(90% - 4px)' }} />
    </div>
  )
}
