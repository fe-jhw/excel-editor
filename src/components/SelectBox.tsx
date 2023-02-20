import { EditorContext } from '@/context'
import { useContext } from 'react'

export function SelectBox() {
  const { selectBoxInfo } = useContext(EditorContext)
  return <div className="select-box" style={selectBoxInfo} />
}
