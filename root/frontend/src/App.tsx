import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import { LogInPage } from './pages/login-page'
import { RegisterPage } from './pages/register-page'
import { PublicRoute } from './routes/public-route'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: <LogInPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
