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

    if (res.status == 200) {
      setUserId(res.data.id)
      const admin = await dbFetch.get(`/user/${res.data.id}`)
      setAdmin(admin.data.isAdmin)

      toast.success("Logado com sucesso!")
    }
  }

  useLayoutEffect(() => {
    tryAuth()
  }, [])

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={1500} pauseOnHover={false} />
      <Router />
    </>
  )
}

export default App
