import { EditorContext } from '@/context'
import { blockDragEvent } from '@/utils/EventUtils'
import { useContext } from 'react'

export function SelectArea() {
  const { selectedArea, selectAreaInfo } = useContext(EditorContext)
  return <>{selectedArea.active && <div className="select-area" style={selectAreaInfo} />}</>
}
