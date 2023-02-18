import { Divider, Input } from 'antd'

export function Functionbar() {
  return (
    <div className="functionbar">
      <Input style={{ width: '100px', marginRight: '4px' }} />
      <Input style={{ width: 'calc(100% - 108px)' }} />
    </div>
  )
}
