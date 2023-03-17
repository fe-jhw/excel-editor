import { Toolbar, Functionbar, Sheet } from '@/components'
import { HistoryBox } from '@/components/HistoryBox'
import { EditorProvider } from '@/context'

export function Editor() {
  return (
    <div>
      <EditorProvider>
        <HistoryBox />
        <Toolbar />
        <Functionbar />
        <Sheet />
      </EditorProvider>
    </div>
  )
}
