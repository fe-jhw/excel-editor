import { Toolbar, Functionbar, Sheet } from '@/components'
import { HistoryBox } from '@/components/HistoryBox'
import { EditorContext } from '@/context'
import { useContext, useEffect } from 'react'

export function Editor() {
  const { renewRecoilState } = useContext(EditorContext)
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
