import { Divider, Input } from 'antd'

// TODO: 배경색 상수로 관리
export default function Functionbar() {
  return (
    <div className="functionbar">
      <Input style={{ width: '100px', marginRight: '4px' }} />
      <Input style={{ width: 'calc(100% - 108px)' }} />
    </div>
  )
}
