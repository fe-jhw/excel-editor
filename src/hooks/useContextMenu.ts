import { MouseEventHandler, useCallback, useState, useEffect } from 'react'

export interface UseContextMenuReturns {
  onContextMenu: MouseEventHandler
  contextMenu: IContextMenu
}

export interface IContextMenu {
  open: boolean
  x: number
  y: number
}

export type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

export const MENU_WIDTH = 132
export const MENU_HEIGHT = 224

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
      // 위치계산해서 placement 줌
      const x = e.pageX + MENU_WIDTH >= window.innerWidth ? e.pageX - MENU_WIDTH : e.pageX
      const y = e.pageY + MENU_HEIGHT >= window.innerHeight ? e.pageY - MENU_HEIGHT : e.pageY

      setContextMenu({ open: true, x, y })
    },
    [setContextMenu]
  )
  return { contextMenu, onContextMenu }
}
