import React from 'react'
import ReactDOM from 'react-dom/client'
import flagsmith from '@flagsmith/flagsmith'
import { FlagsmithProvider } from '@flagsmith/flagsmith/react'
import App from './App.jsx'
import './index.css'

// Same random ID every time this browser visits, so Flagsmith
// always gives this person the same version.
function getVisitorId() {
  try {
    let id = localStorage.getItem('visitor_id')
    if (!id) {
      id = 'visitor_' + crypto.randomUUID()
      localStorage.setItem('visitor_id', id)
    }
    return id
  } catch {
    return 'visitor_' + Math.random().toString(36).slice(2)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <FlagsmithProvider
    flagsmith={flagsmith}
    options={{
      environmentID: import.meta.env.VITE_FLAGSMITH_ENV_KEY,
      identity: getVisitorId(),
      enableEvents: true,
    }}
  >
    <App />
  </FlagsmithProvider>
)
