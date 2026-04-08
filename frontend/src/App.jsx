import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TechProjects from './pages/TechProjects'
import DesignProjects from './pages/DesignProjects'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/tech"   element={<TechProjects />} />
        <Route path="/design" element={<DesignProjects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App