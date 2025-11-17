import { Routes, Route } from 'react-router-dom'

import './App.css'

import NavBar from './commonPages/NavBar/NavBar'
import Begin from './differentPages/begin/Begin'
import RepositoriesList from './differentPages/repositoriesList/RepositoriesList'
import DontPlease from './differentPages/dontPlease/DontPlease'
import Chat from './commonPages/chat/Chat'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Begin />} />
        <Route path="/repositories" element={<RepositoriesList />} />
        <Route path="/dont" element={<DontPlease />} />
      </Routes>
      <Chat />
    </>
  )
}

export default App
