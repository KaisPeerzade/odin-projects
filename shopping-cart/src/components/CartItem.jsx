import { useCart } from '../context/CartContext'
import QuantityInput from './QuantityInput'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleChange = (value) => {
    const qty = parseInt(value, 10)
    if (qty >= 1) updateQuantity(item.id, qty)
  }

  return (
    <li className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="info">
        <h3>{item.title}</h3>
        <p>${item.price.toFixed(2)} each</p>
      </div>
      <QuantityInput value={item.quantity} onChange={handleChange} />
      <p className="line-total">${(item.price * item.quantity).toFixed(2)}</p>
      <button className="danger" onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </li>
  )
}
