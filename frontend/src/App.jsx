// CSS
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

// Modules
import dbFetch from './axios/config'
import { useLayoutEffect, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';

// Context
import { UserContext } from './context/UserContext'
import { AdminContext } from "./context/AdminContext"

// Router
import Router from './utils/Router'

function App() {
  const { setUserId } = useContext(UserContext)
  const { setAdmin } = useContext(AdminContext)

  const tryAuth = async() => {
    const res = await dbFetch.get("/user/tryauth")
    setUserId(res.data.id)

    const admin = await dbFetch.get(`/user/${res.data.id}`)
    setAdmin(admin.data.isAdmin)
  }

  useLayoutEffect(() => {
    tryAuth()
  }, [])

  return (
    <>
      <ToastContainer />
      <Router />
    </>
  )
}

export default App
