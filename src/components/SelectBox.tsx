import { useEffect } from 'react'

interface SelectBoxProps {
  i: number
  j: number
}

export function SelectBox({ i, j }: SelectBoxProps) {
  useEffect(() => {}, [])
  return <div className="select-box"></div>
}
