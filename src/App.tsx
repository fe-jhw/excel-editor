import { Header, Editor, Footer } from '@/layout'
import { EditorProvider } from '@/context/_EditorContext'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <EditorProvider>
        <div className="App">
          <Header />
          <Editor />
          <Footer />
        </div>
      </EditorProvider>
    </RecoilRoot>
  )
}

export default App
