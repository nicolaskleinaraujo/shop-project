import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Context
import { UserProvider } from './context/UserContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import { SearchContext } from './context/SearchContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
    <UserProvider>
    <SearchContext>
      <App />
    </SearchContext>
    </UserProvider>
    </AdminProvider>
  </React.StrictMode>,
)
