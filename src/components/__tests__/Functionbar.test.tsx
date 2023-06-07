import { render, screen } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Functionbar } from '..'

describe('<Functionbar />', () => {
  test('선택셀 좌표 input 렌더링한다.', () => {
    render(<Functionbar />)
    const coordInput = screen.getByTestId('coordInput')
    expect(coordInput).toBeInTheDocument()
  })

  test('선택셀 좌표 input default값인 "A1"이 담겨있다', () => {
    render(<Functionbar />)
    const coordInput = screen.getByTestId('coordInput')
    expect(coordInput).toHaveValue('A1')
  })

  test('선택셀 값 input 렌더링한다', () => {
    render(<Functionbar />)
    const valueInput = screen.getByTestId('valueInput')
    expect(valueInput).toBeInTheDocument()
  })

  test('선택셀 값 input 변경 정상 작동', async () => {
    render(<Functionbar />)
    const valueInput = screen.getByTestId('valueInput')
    userEvent.clear(valueInput)
    await userEvent.type(valueInput, '변경해버리기~')
    expect(valueInput).toHaveValue('변경해버리기~')
  })
})
