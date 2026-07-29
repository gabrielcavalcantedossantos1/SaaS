import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { AppProvider as AppContextProvider } from './context/AppContext'
import { AppProvider as AuthProvider } from './context/AuthContent'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </AppContextProvider>
  </StrictMode>,
)
