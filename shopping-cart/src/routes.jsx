import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
])

export default router
