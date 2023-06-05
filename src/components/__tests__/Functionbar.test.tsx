import { cleanup, render, screen } from '@/utils/test-utils'
import { Functionbar } from '..'

afterEach(() => {
  cleanup()
})

describe('<Functionbar />', () => {
  render(<Functionbar />)
  const coordInput = screen.getByTestId('coordInput')
  const valueInput = screen.getByTestId('valueInput')

  test('선택셀 좌표 input 렌더링한다.', () => {
    expect(coordInput).toBeInTheDocument()
  })

  test('선택셀 값 input 렌더링한다', () => {
    expect(valueInput).toBeInTheDocument()
  })
})
