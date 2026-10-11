import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

export default function Cart() {
  const { items, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <section className="status">
        <h1>Your cart is empty</h1>
        <Link to="/shop" className="cta">Go to Shop</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <h2 className="total">Total: ${totalPrice.toFixed(2)}</h2>
    </section>
  )
}
