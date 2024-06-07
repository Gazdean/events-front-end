import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MyEventsProvider } from './Contexts/MyEventsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <MyEventsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </MyEventsProvider>
    </BrowserRouter>
  // </React.StrictMode>
)
