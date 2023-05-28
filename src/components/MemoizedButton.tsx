import { Button, ButtonProps } from 'antd'
import { memo } from 'react'

export const MemoizedButton = memo((buttonProps: ButtonProps) => {
  // console.log(buttonProps)
  return <Button {...buttonProps} />
})
