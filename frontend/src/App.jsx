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
import PrivateRoute from './router/PrivateRoute'

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path='/users' element={<Users/>} />
            <Route path='/create/user' element={<CreateUser/>} />
            <Route path='/update/user' element={<UpdateUser />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
