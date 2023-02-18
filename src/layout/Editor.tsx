import { Toolbar, Functionbar, Sheet } from '@/components'
import { EditorProvider } from '@/context'

export function Editor() {
  return (
    <div>
      <EditorProvider>
        <Toolbar />
        <Functionbar />
        <Sheet />
      </EditorProvider>
    </div>
  )
}
