import { SelectArearect } from 'editor'
import { blockDragEvent } from '@/utils/EventUtils'
import { getAreaRect } from '@/utils/SheetUtils'
import { useContext, useEffect, useState } from 'react'
import { useEditorValues } from '@/context/_EditorContext'

interface CopiedAreaRect extends SelectAreaRect {}

export function CopyArea() {
  const { copiedArea } = useEditorValues()
  const [copiedAreaRect, setCopiedAreaRect] = useState<CopiedAreaRect>({ width: 0, height: 0, top: 0, left: 0 })
  useEffect(() => {
    const { si, sj, ei, ej } = copyrect
    const rect = getAreaRect(si, sj, ei, ej)
    if (rect) {
      setCopiedAreaRect(rect)
    }
  }, [copiedArea])
  return <>{copyiedArea.status !== 'empty' && <div className="copy-area" style={copiedAreaRect} />}</>
}
