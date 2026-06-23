import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import ShortsGallery from './pages/ShortsGallery'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:step" element={<Quiz />} />
        <Route path="/result/:type" element={<Result />} />
        <Route path="/shorts" element={<ShortsGallery />} />
      </Routes>
    </HashRouter>
  )
}

export default App
