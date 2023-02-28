import { EditorContext } from '@/context'
import { SelectAreaInfo } from '@/types'
import { getAreaRect } from '@/utils/SheetUtils'
import { useContext, useEffect, useState } from 'react'

interface CopiedAreaInfo extends SelectAreaInfo {}

export function CopyArea() {
  const { copyInfo } = useContext(EditorContext)
  const [copiedAreaInfo, setCopiedAreaInfo] = useState<CopiedAreaInfo>({ width: 0, height: 0, top: 0, left: 0 })
  useEffect(() => {
    const { si, sj, ei, ej } = copyInfo
    const rect = getAreaRect(si, sj, ei, ej)
    if (rect) {
      setCopiedAreaInfo(rect)
    }
  }, [copyInfo])
  return <>{copyInfo.status !== 'empty' && <div className="copy-area" style={copiedAreaInfo} />}</>
}
