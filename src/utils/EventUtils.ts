import { ReactEventHandler } from 'react'

export const blockEvent: ReactEventHandler = e => {
  e.stopPropagation()
  e.preventDefault()
}

export const blockDragEvent = {
  onDrop: blockEvent,
  onDragOver: blockEvent,
  onDragStart: blockEvent,
  onDragEnd: blockEvent,
  onDragEnter: blockEvent,
}
