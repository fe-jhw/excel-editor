import { SelectedAreaRect } from 'editor'
import { getAreaRect } from '@/utils/SheetUtils'
import { useEffect, useState } from 'react'
import { useEditorValues } from '@/context/EditorContext'

interface CopiedAreaRect extends SelectedAreaRect {}

export function CopyArea() {
  const { copiedArea } = useEditorValues()
  const [copiedAreaRect, setCopiedAreaRect] = useState<CopiedAreaRect>({ width: 0, height: 0, top: 0, left: 0 })
  useEffect(() => {
    const { si, sj, ei, ej } = copiedArea
    const rect = getAreaRect(si, sj, ei, ej)
    if (rect) {
      setCopiedAreaRect(rect)
    }
  }, [copiedArea])
  return <>{copiedArea.status !== 'empty' && <div className="copy-area" style={copiedAreaRect} />}</>
}
