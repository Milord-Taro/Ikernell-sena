import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AccesibilidadProvider } from './context/AccesibilidadContext'
import { AuthProvider } from './context/AuthContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AccesibilidadProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </AccesibilidadProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
