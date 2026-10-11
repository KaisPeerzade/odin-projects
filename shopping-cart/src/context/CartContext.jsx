import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

// initialItems is only used in tests
export function CartProvider({ children, initialItems = [] }) {
  const [items, setItems] = useState(initialItems)

  const addToCart = (product, quantity) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
