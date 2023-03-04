import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Avoids 'ReferenceError: document is not defined' issue when starting the express server
if (typeof window !== 'undefined') {
  const root = ReactDOM.createRoot(
    document.querySelector('div#root')
  )
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
