import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="navbar">
      <span className="logo">🛍️ MiniStore</span>
      <ul>
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/cart">
            Cart
            {totalItems > 0 && (
              <span className="badge" data-testid="cart-count">
                {totalItems}
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
