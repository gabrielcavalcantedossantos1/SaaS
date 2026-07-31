import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { AppProvider as AppContextProvider } from './context/AppContext'
import { AppProvider as AuthProvider } from './context/AuthContent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        <RouterProvider router={routes} />
      </AuthProvider>
    </AppContextProvider>
  </StrictMode>,
)
