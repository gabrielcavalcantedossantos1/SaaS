import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { Layout } from './components/layout/Layout'
import { Login } from './pages/login/Login'
import { ProtectedRoute } from './components/ProtectedRoute'

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  }, {
    element: <ProtectedRoute />,
    children: [{
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        }, {
          path: 'about',
          element: <AboutPage />,
        }
      ]
    }]
  }
])

export default routes
