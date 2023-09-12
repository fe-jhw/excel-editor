const Header = lazy(() =>
  import('@/layout').then(({ Header }) => ({
    default: Header,
  }))
)
const Editor = lazy(() =>
  import('@/layout').then(({ Editor }) => ({
    default: Editor,
  }))
)
const Footer = lazy(() =>
  import('@/layout').then(({ Footer }) => ({
    default: Footer,
  }))
)
import { EditorProvider } from '@/context/EditorContext'
import { RecoilRoot } from 'recoil'
import { lazy, Suspense } from 'react'

function App() {
  return (
    <Suspense fallback="로딩중...">
      <RecoilRoot>
        <EditorProvider>
          <div className="App">
            <Header />
            <Editor />
            <Footer />
          </div>
        </EditorProvider>
      </RecoilRoot>
    </Suspense>
  )
}

export default App
