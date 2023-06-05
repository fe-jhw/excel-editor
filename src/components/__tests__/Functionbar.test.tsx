import { render, screen } from '@/utils/test-utils'
import { Functionbar } from '..'

test('sample', () => {
  render(<Functionbar />)
  const coordInput = screen.getByTestId('coordInput')
  const valueInput = screen.getByTestId('valueInput')
  expect(coordInput).toHaveTextContent('A1')
  expect(valueInput).toHaveTextContent('')
})
