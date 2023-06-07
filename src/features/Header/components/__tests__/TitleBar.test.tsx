import { cleanup, render, screen } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { TitleBar } from '../TitleBar'

describe('<TitleBar />', () => {
  test('파일 제목 input 렌더링', () => {
    render(<TitleBar />)
    const titleInput = screen.getByTestId('titleInput')
    expect(titleInput).toBeInTheDocument()
  })

  test('파일 제목 input 변경 정상 작동', async () => {
    render(<TitleBar />)
    const titleInput = screen.getByTestId('titleInput')
    userEvent.clear(titleInput)
    await userEvent.type(titleInput, '제목~')
    expect(titleInput).toHaveValue('제목~')
  })
})
