// CSS
import './App.css'

// Modules
import dbFetch from './axios/config'
import { useLayoutEffect, useContext } from 'react'

// Context
import { UserContext } from './context/UserContext'
import { AdminContext } from "./context/AdminContext"

// Router
import Router from './utils/Router'

function App() {
  const { userId, setUserId } = useContext(UserContext)
  const { setAdmin } = useContext(AdminContext)

  const tryAuth = async() => {
    const res = await dbFetch.get("/user/tryauth")
    setUserId(res.data.id)
    const admin = await dbFetch.get(`/user/${userId}`)
    setAdmin(admin.data.isAdmin)
  }

  useLayoutEffect(() => {
    tryAuth()
  }, [])

  return (
    <>
      <Router />
    </>
  )
}

export default App
