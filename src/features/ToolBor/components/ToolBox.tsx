import { css } from '@emotion/react'
import { Space, Typography } from 'antd'
import { ReactNode } from 'react'

interface IToolBox {
  Wrapper: React.FC<{ children: ReactNode }>
  Layer: React.FC<{ children: ReactNode }>
  Title: React.FC<{ children: ReactNode }>
}

const SPACE_GAP = 4

const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Space direction="vertical" size={SPACE_GAP} align="center" className="toolbox">
      {children}
    </Space>
  )
}

const Layer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Space size={SPACE_GAP}>{children}</Space>
}

const Title: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Typography.Text>{children}</Typography.Text>
}

export const ToolBox: IToolBox = {
  Wrapper: Wrapper,
  Layer: Layer,
  Title: Title,
}
