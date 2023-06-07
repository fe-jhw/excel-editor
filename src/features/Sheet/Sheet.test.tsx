import { render, screen } from '@/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Sheet } from '.'

describe('<Sheet />', () => {
  test('cell 클릭시 해당 cell 선택, 편집용 input 상자 표시, col, row 헤더 강조 표시', async () => {
    render(<Sheet />)
    const cell = screen.getByTestId('3-3')
    await userEvent.click(cell)
    const editInput = screen.getByRole('')
  })

  test('cell 드래그시 해당 영역 선택, 선택된 영역 회색으로 표시, 드래그 시작한 부분 선택 상태 col, row 헤더 강조 표시', () => {})

  test('cell 값 편집하기', () => {})

  test('가로 맨 오른쪽 끝으로 스크롤시 자동 열 추가', () => {})

  test('세로 맨 아래쪽 끝으로 스크롤시 자동 행 추가', () => {})

  test('시트 오른쪽 클릭 시 contextMenu 표시', () => {})

  test('contextMenu 내 잘라내기, 복사, 붙여넣기, 삭제, 내용 지우기 메뉴 렌더링', () => {})

  test('contextMenu 내 삭제 메뉴 hover시 셀을 왼쪽으로 밀기, 셀을 위로 밀기, 행 전체, 열 전체 메뉴 렌더링', () => {})

  test('contextMenu 잘라내기 클릭 시 잘라내기된 영역 정보 저장, 영역 강조표시', () => {})

  test('contextMenu 잘라내기 후 붙여넣기 시 잘라내기된 영역 내용 삭제, 선택영역을 시작포인트로 해서 내용 붙여넣기', () => {})

  test('contextMenu 복사 클릭 시, 복사된 영역 정보 저장, 영역 강조표시', () => {})

  test('contextMenu 복사 후 붙여넣기 시 선택영역을 시작포인트로 해서 내용 붙여넣기', () => {})

  test('contextMenu 삭제 > 셀을 왼쪽으로 밀기 클릭시 선택된 영역 삭제후 셀을 왼쪽으로 밈', () => {})

  test('contextMenu 삭제 > 셀을 위로 밀기 클릭시 선택된 영역 삭제후 셀을 위쪽으로 밈', () => {})

  test('contextMenu 삭제 > 행 전체 클릭시 선택된 영역 포함된 행 전체 삭제', () => {})

  test('contextMenu 삭제 > 열 전체 클릭시 선택된 영역 포함된 열 전체 삭제', () => {})

  test('contextMenu 내용 지우기 클릭시 선택된 영역 내용 삭제', () => {})

  test('column 헤더 각 cell 오른쪽 보더 드래그시 해당 cell이 속한 열의 모든 cell 너비 조절', () => {})

  test('row 헤더 각 cell 아래쪽 보더 드래그시 해당 cell이 속한 행의 모든 cell 높이 조절', () => {})
})
