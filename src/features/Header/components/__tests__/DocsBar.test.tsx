import { cleanup, render, screen } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { DocsBar } from '../DocsBar'

let mockWindowOpen: jest.SpyInstance

beforeEach(() => {
  mockWindowOpen = jest.spyOn(window, 'open')
})

describe('<DocsBar />', () => {
  test('저장 버튼 렌더링', () => {
    render(<DocsBar />)
    const saveButton = screen.getByRole('button', { name: /save/i })
    expect(saveButton).toBeInTheDocument()
  })

  test('저장 일시 default인 "저장되지 않음" 표시', () => {
    render(<DocsBar />)
    const saveText = screen.getByText('저장되지 않음')
    expect(saveText).toBeInTheDocument()
  })

  test('자동저장 스위치 렌더링', () => {
    render(<DocsBar />)
    const autosaveLabel = screen.getByText('자동저장')
    const autosaveSwitch = screen.getByRole('switch')

    expect(autosaveLabel).toBeInTheDocument()
    expect(autosaveSwitch).toBeInTheDocument()
  })

  test('제작자 정보 드롭다운 버튼 렌더링', () => {
    render(<DocsBar />)
    const producerInfoButton = screen.getByRole('button', { name: /제작자: 정현우/i })
    expect(producerInfoButton).toBeInTheDocument()
  })

  test('저장 버튼 클릭시 저장일시 업데이트', async () => {
    render(<DocsBar />)
    const saveButton = screen.getByRole('button', { name: /save/i })
    await userEvent.click(saveButton)

    const saveText = screen.getByText(/저장됨/i)
    expect(saveText).toBeInTheDocument()
  })

  test('자동저장 스위치 on시 1분후 자동으로 저장일시 업데이트', async () => {
    render(<DocsBar />)
    const autosaveSwitch = screen.getByRole('switch')
    await userEvent.click(autosaveSwitch)

    const saveText = await screen.findByText(/저장됨/i, {}, { timeout: 65000 })
    expect(saveText).toBeInTheDocument()
  })

  test('제작자 정보 드롭다운 버튼 클릭시 블로그, 깃허브, 포트폴리오 메뉴 노출', async () => {
    render(<DocsBar />)
    const producerInfoButton = screen.getByRole('button', { name: /제작자: 정현우/i })
    await userEvent.click(producerInfoButton)
    const blogButton = screen.getByText('블로그')
    const githubButton = screen.getByText('깃허브')
    const portfolioButton = screen.getByText('포트폴리오')

    expect(blogButton).toBeInTheDocument()
    expect(githubButton).toBeInTheDocument()
    expect(portfolioButton).toBeInTheDocument()
  })

  test('제작자 정보 드롭다운 블로그 버튼 클릭시 블로그 이동', async () => {
    render(<DocsBar />)
    const producerInfoButton = screen.getByRole('button', { name: /제작자: 정현우/i })
    await userEvent.click(producerInfoButton)
    const blogButton = screen.getByText('블로그')
    await userEvent.click(blogButton)
    expect(mockWindowOpen).toHaveBeenCalledWith('https://hyunwoo12.tistory.com/')
  })

  test('제작자 정보 드롭다운 깃허브 버튼 클릭시 깃허브 이동', async () => {
    render(<DocsBar />)
    const producerInfoButton = screen.getByRole('button', { name: /제작자: 정현우/i })
    await userEvent.click(producerInfoButton)
    const githubButton = screen.getByText('깃허브')
    await userEvent.click(githubButton)
    expect(mockWindowOpen).toHaveBeenCalledWith('https://github.com/fe-jhw')
  })

  test('제작자 정보 드롭다운 포트폴리오 버튼 클릭시 포트폴리오 이동', async () => {
    render(<DocsBar />)
    const producerInfoButton = screen.getByRole('button', { name: /제작자: 정현우/i })
    await userEvent.click(producerInfoButton)
    const portfolioButton = screen.getByText('포트폴리오')
    await userEvent.click(portfolioButton)
    expect(mockWindowOpen).toHaveBeenCalledWith('https://www.notion.so/a26d72ab9f4041e38897117d3612ad0c')
  })
})
