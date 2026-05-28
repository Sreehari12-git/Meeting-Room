
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import AdimDashboard from './pages/AdimDashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/admin' element={<AdimDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
