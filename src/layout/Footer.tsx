import { PlusCircleOutlined } from '@ant-design/icons'
import { Tabs, Button } from 'antd'

export function Footer() {
  return (
    <Tabs
      tabPosition="bottom"
      items={new Array(30).fill(null).map((_, i) => {
        const id = String(i + 1)
        return {
          label: `Sheet ${id}`,
          key: id,
        }
      })}
      tabBarExtraContent={{
        left: <Button type="text" icon={<PlusCircleOutlined />} size="large" style={{ marginRight: '4px' }} />,
      }}
      style={{ backgroundColor: '#F5F5F5' }}
    />
  )
}
