import { formatTime } from './formatTime'

export function getNow(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const hours = today.getHours()

  const minutes = today.getMinutes()
  const seconds = today.getSeconds()
  return `${year}/${month}/${date} ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
}
