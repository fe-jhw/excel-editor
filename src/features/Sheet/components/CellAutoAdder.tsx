import { EditorContext } from '@/context'
import { useIntersectionObserverRef } from '@/hooks/useIntersectionObserver'
import { useCallback, useContext } from 'react'

interface CellAutoAdderProps {
  length: number
  type: 'col' | 'row'
}

export function CellAutoAdder({ length, type }: CellAutoAdderProps) {
  const { insertColRight, insertRowBelow } = useContext(EditorContext)
  const iOcallback = useCallback(() => {
    if (type === 'col') {
      insertColRight(length - 1)
    } else {
      insertRowBelow(length - 1)
    }
  }, [length, insertColRight, insertRowBelow, type])
  const adderRef = useIntersectionObserverRef<HTMLTableCellElement>({
    callback: iOcallback,
  })
  return <td style={{ visibility: 'hidden' }} ref={adderRef} />
}
