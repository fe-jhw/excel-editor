import { useSelectArea } from '@/hooks/useSelectArea'

export function SelectArea() {
  const { selectedArea, selectedAreaRect } = useSelectArea()
  return (
    <>{selectedArea.active && <div className="select-area" data-testid="select-area" style={selectedAreaRect} />}</>
  )
}
