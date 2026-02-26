import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
// import App from './App'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    
    <App />
    </HashRouter>
  </StrictMode>,
)
