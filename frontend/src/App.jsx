// CSS
import './App.css'

// Modules
import dbFetch from './axios/config'
import { useEffect } from 'react'

// Router
import Router from './utils/Router'

function App() {
  const tryAuth = async() => {
    await dbFetch.get("/user/tryauth")
  }

  useEffect(() => {
    tryAuth()
  }, [])

  return (
    <>
      <Router />
    </>
  )
}

export default App
