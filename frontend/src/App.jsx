// CSS
import './App.css'

// Modules
import dbFetch from './axios/config'
import { useLayoutEffect, useContext } from 'react'

// Context
import { UserContext } from './context/UserContext'

// Router
import Router from './utils/Router'

function App() {
  const { setUserId } = useContext(UserContext)

  const tryAuth = async() => {
    const res = await dbFetch.get("/user/tryauth")
    setUserId(res.data.id)
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
