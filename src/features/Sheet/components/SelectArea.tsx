import { useSelectArea } from '@/hooks/useSelectArea'

export function SelectArea() {
  const { selectedArea, selectAreaRect } = useSelectArea()
  return <>{selectedArea.active && <div className="select-area" style={selectAreaRect} />}</>
}
