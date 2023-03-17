import { useRef } from 'react'

interface UseDebounce {
  ({ callback, timeout }: { callback: (...args: any) => any; timeout: number }): void
}

export const useDebounce: UseDebounce = ({ callback, timeout }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  timerRef.current = setTimeout(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    callback()
  }, timeout)
}
