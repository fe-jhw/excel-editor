import { Functionbar } from '@/components'
import { Sheet } from '@/features/Sheet'
import { Toolbar } from '@/features/ToolBor'
import { HistoryBox } from '@/components/HistoryBox'
import { useEffect } from 'react'

export function Editor() {
  //TODO: 커스텀훅으로 빼기
  useEffect(() => {
    window.addEventListener(
      'keydown',
      e => {
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
        capture: true,
      }
    )
  }, [])

  return (
    <div>
      <HistoryBox />
      <Toolbar />
      <Functionbar />
      <Sheet />
    </div>
  )
}
