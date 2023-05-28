import { EditorContext } from '@/context'
import { ICell } from '@/types'
// import { Button } from 'antd'
import { MemoizedButton as Button } from './MemoizedButton'
import { ReactNode, useCallback, useContext } from 'react'

// TODO: any 대신 쓸 type찾기 -> value와 valueIfActive의 type이 같아야함
interface ToggleButtonProps {
  value: any
  valueIfActive: any
  propertyName: keyof ICell
  icon: ReactNode
}

export function ToggleButton({ value, valueIfActive, propertyName, icon }: ToggleButtonProps) {
  const { changeSelectedCells } = useContext(EditorContext)
  const isActive = value === valueIfActive

  // TODO: 함수형태가 좀 이상함, builder(얘만 useCallback)패턴 쓰던가 하자
  const toggle = useCallback(() => {
    const changes = {} as Partial<ICell>
    changes[propertyName] = isActive ? undefined : valueIfActive
    changeSelectedCells(changes)
  }, [changeSelectedCells, propertyName, valueIfActive, isActive])

  // const onClick = useCallback(() => toggle(isActive), [toggle, isActive])

  return <Button icon={icon} className={isActive ? 'button-active' : ''} onClick={toggle} />
}
