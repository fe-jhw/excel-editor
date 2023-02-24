import { MouseEventHandler, useCallback, useState, useEffect } from 'react'

export interface UseContextMenuReturns {
  onContextMenu: MouseEventHandler
  contextMenu: IContextMenu
}

interface IContextMenu {
  open: boolean
  x: number
  y: number
}

export const useContextMenu = (): UseContextMenuReturns => {
  const [contextMenu, setContextMenu] = useState<IContextMenu>({ open: false, x: 0, y: 0 })

  useEffect(() => {
    if (contextMenu.open) {
      document.addEventListener('click', function onClickOutside() {
        setContextMenu(prev => ({ ...prev, open: false }))
        document.removeEventListener('click', onClickOutside)
      })
    }
  }, [contextMenu.open])

  const onContextMenu: MouseEventHandler = useCallback(
    e => {
      e.preventDefault()
      setContextMenu({ open: true, x: e.pageX, y: e.pageY })
    },
    [setContextMenu]
  )
  return { contextMenu, onContextMenu }
}
