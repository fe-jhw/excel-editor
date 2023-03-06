import { Ref, RefCallback, RefObject, useCallback, useEffect, useRef } from 'react'

interface UseIntersectionObserverRefProps {
  readonly callback: IntersectionObserverCallback
  readonly options?: IntersectionObserverInit
  readonly type?: 'callback' | 'ref'
}

export const useIntersectionObserverRef = <T extends HTMLElement>({
  callback,
  options = { root: null, rootMargin: '0px', threshold: 0 },
  type = 'ref',
}: UseIntersectionObserverRefProps): RefCallback<T> | RefObject<T> => {
  const callbackOnlyIntersecting: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      const isIntersecting = entries.map(entry => entry.isIntersecting).reduce((acc, cur) => acc && cur, true)
      if (isIntersecting) {
        callback(entries, observer)
      }
    },
    [callback]
  )
  const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(callbackOnlyIntersecting, options))
  // useEffect에서 observerRef가 제대로안먹는듯
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (type === 'callback' || !elementRef.current || !observerRef.current) {
      return
    }
    observerRef.current = new IntersectionObserver(callbackOnlyIntersecting, options)
    observerRef.current.observe(elementRef.current)
    return () => {
      observerRef.current.disconnect()
    }
  }, [elementRef, observerRef, callbackOnlyIntersecting, options, type])

  if (type === 'callback') {
    const refCallback = (element: T) => {
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    }
    return refCallback
  }

  return elementRef
}
