
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import AdimDashboard from './pages/Admin/AdminDashboard'
import MeetingRoom from './pages/Admin/MeetingRoom'
import { AdminLayout } from './layout/Layout'
import AddUser from './pages/Admin/AddUser'
import { ProtectedRoute } from './components/ProtectedRoute'
// import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
          <Route path='/admin' element={<AdimDashboard/>}/>
          <Route path='/create-room' element={<MeetingRoom/>}/>
          <Route path='/create-user' element={<AddUser/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
