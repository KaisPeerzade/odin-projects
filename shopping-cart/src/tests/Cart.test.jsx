import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import Cart from '../pages/Cart'

const items = [{ id: 1, title: 'Test Shirt', price: 10, image: 'item.png', quantity: 2 }]

const renderCart = (initialItems = items) =>
  render(
    <MemoryRouter>
      <CartProvider initialItems={initialItems}>
        <Cart />
      </CartProvider>
    </MemoryRouter>
  )

describe('Cart page', () => {
  it('shows empty message when no items', () => {
    renderCart([])
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it('shows items and total', () => {
    renderCart()
    expect(screen.getByText('Test Shirt')).toBeInTheDocument()
    expect(screen.getByText('Total: $20.00')).toBeInTheDocument()
  })

  it('increases quantity and updates total', async () => {
    renderCart()
    await userEvent.click(screen.getByRole('button', { name: /increase/i }))
    expect(screen.getByText('Total: $30.00')).toBeInTheDocument()
  })

  it('removes an item', async () => {
    renderCart()
    await userEvent.click(screen.getByRole('button', { name: /remove/i }))
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })
})
