import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const product = { id: 1, title: 'Test Shirt', price: 10, image: 'shirt.png' }

function CartTotal() {
  const { totalItems } = useCart()
  return <p data-testid="total">{totalItems}</p>
}

function setup() {
  render(
    <CartProvider>
      <ProductCard product={product} />
      <CartTotal />
    </CartProvider>
  )
}

describe('ProductCard', () => {
  it('renders title and price', () => {
    setup()
    expect(screen.getByText('Test Shirt')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
  })

  it('adds 1 item by default', async () => {
    setup()
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(screen.getByTestId('total')).toHaveTextContent('1')
  })

  it('adds the quantity set with the + button', async () => {
    setup()
    await userEvent.click(screen.getByRole('button', { name: /increase/i }))
    await userEvent.click(screen.getByRole('button', { name: /increase/i }))
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(screen.getByTestId('total')).toHaveTextContent('3')
  })

  it('adds the quantity typed manually', async () => {
    setup()
    const input = screen.getByRole('spinbutton')
    await userEvent.clear(input)
    await userEvent.type(input, '4')
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(screen.getByTestId('total')).toHaveTextContent('4')
  })
})
