import { Outlet } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </CartProvider>
  )
}
