import "./index.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PageLoader from './components/PageLoader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageLoader />
    <App />
  </StrictMode>,
)
