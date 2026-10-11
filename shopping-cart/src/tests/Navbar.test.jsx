import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'

const renderNavbar = (initialItems = []) =>
  render(
    <MemoryRouter>
      <CartProvider initialItems={initialItems}>
        <Navbar />
      </CartProvider>
    </MemoryRouter>
  )

describe('Navbar', () => {
  it('shows no badge when cart is empty', () => {
    renderNavbar()
    expect(screen.queryByTestId('cart-count')).not.toBeInTheDocument()
  })

  it('shows total number of items in the cart', () => {
    renderNavbar([
      { id: 1, title: 'A', price: 5, image: 'item.png', quantity: 2 },
      { id: 2, title: 'B', price: 7, image: 'item.png', quantity: 3 },
    ])
    expect(screen.getByTestId('cart-count')).toHaveTextContent('5')
  })
})
