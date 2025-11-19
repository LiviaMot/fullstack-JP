import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'
import Login from './pages/Login'
import CreateUser from './pages/Users/create'
import UpdateUser from './pages/Users/update'
import { AuthProvider } from './auth/Context'

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/users' element={<Users/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/create/user' element={<CreateUser/>} />
          <Route path='/update/user' element={<UpdateUser />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
