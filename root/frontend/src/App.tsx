import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import { BookshelfPage } from './pages/bookshelf-page'
import { LogInPage } from './pages/login-page'
import { RegisterPage } from './pages/register-page'
import { PrivateRoute } from './routes/private-route'
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
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="/bookshelf" replace />,
      },
      {
        path: 'bookshelf',
        element: <BookshelfPage />,
      },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
