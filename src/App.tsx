import { Header, Editor, Footer } from '@/layout'
import { atom, RecoilRoot, selector } from 'recoil'
import { getDefaultCells } from './constants/SheetConstants'
import { CFile } from './utils/FileUtils'

const fileState = atom({
  key: 'file',
  default: new CFile('제목을 입력해주세요.', [{ title: 'Sheet1', cells: getDefaultCells(30, 30) }], 0),
})

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Header />
        <Editor />
        <Footer />
      </div>
    </RecoilRoot>
  )
}

export default App
