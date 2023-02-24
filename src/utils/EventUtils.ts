import { ReactEventHandler, MouseEvent } from 'react'

export const blockEvent: ReactEventHandler = e => {
  e.stopPropagation()
  e.preventDefault()
}

export const isMouseDownContextMenu = (e: MouseEvent): boolean => {
  return e.button === 2
}

export const blockDragEvent = {
  onDrop: blockEvent,
  onDragOver: blockEvent,
  onDragStart: blockEvent,
  onDragEnd: blockEvent,
  onDragEnter: blockEvent,
}
