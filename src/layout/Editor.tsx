import { Toolbar, Functionbar, Sheet } from '@/components'
import { HistoryBox } from '@/components/HistoryBox'
import { EditorProvider } from '@/context'
import { useEffect } from 'react'

export function Editor() {
  //TODO: 커스텀훅으로 빼기
  useEffect(() => {
    window.addEventListener(
      'keydown',
      e => {
        // if you need to filter <input> elements
        switch (e.keyCode) {
          case 37: // left
          case 39: // right
            e.preventDefault()
            break
          case 38: // up
          case 40: // down
            e.preventDefault()
            break
          default:
            break
        }
      },
      {
        capture: true, // this disables arrow key scrolling in modern Chrome
        // passive: false, // this is optional, my code works without it
      }
    )
  }, [])

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
