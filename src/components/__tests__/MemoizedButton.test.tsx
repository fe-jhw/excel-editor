import { render, screen } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { MemoizedButton } from '..'

describe('<MemoizedButton />', () => {
  test('title이 잘 보인다', () => {
    render(<MemoizedButton title="메모버튼" />)
    const button = screen.getByRole('button', { name: /메모버튼/i })
    expect(button).toBeInTheDocument()
  })

  test('클릭시 onClick함수가 호출된다', async () => {
    const onClick = jest.fn()
    render(<MemoizedButton title="메모버튼" onClick={onClick} />)
    const button = screen.getByRole('button', { name: /메모버튼/i })
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })
})
