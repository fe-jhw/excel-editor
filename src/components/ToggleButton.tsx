import { ICell } from 'editor'
// import { Button } from 'antd'
import { MemoizedButton as Button } from './MemoizedButton'
import { ReactNode, useCallback, useContext } from 'react'
import { useChangeCells } from '@/hooks/useChangeCells'

// TODO: any 대신 쓸 type찾기 -> value와 valueIfActive의 type이 같아야함
interface ToggleButtonProps {
  value: any
  valueIfActive: any
  propertyName: keyof ICell
  icon: ReactNode
}

export function ToggleButton({ value, valueIfActive, propertyName, icon }: ToggleButtonProps) {
  const { changeSelectedCells } = useChangeCells()
  const isActive = value === valueIfActive

  const toggle = useCallback(() => {
    const changes = {} as Partial<ICell>
    changes[propertyName] = isActive ? undefined : valueIfActive
    changeSelectedCells(changes)
  }, [changeSelectedCells, propertyName, valueIfActive, isActive])

  return <Button icon={icon} className={isActive ? 'button-active' : ''} onClick={toggle} />
}
