import { useState } from 'react'
import { useCart } from '../context/CartContext'
import QuantityInput from './QuantityInput'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    const qty = parseInt(quantity, 10)
    if (!qty || qty < 1) return
    addToCart(
      { id: product.id, title: product.title, price: product.price, image: product.image },
      qty
    )
    setQuantity(1)
  }

  return (
    <article className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <QuantityInput value={quantity} onChange={setQuantity} />
      <button className="primary" onClick={handleAdd}>
        Add To Cart
      </button>
    </article>
  )
}
