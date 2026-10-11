import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import QuantityInput from '../components/QuantityInput'

describe('QuantityInput', () => {
  it('increments the value', async () => {
    const onChange = vi.fn()
    render(<QuantityInput value={2} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: /increase/i }))
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('decrements the value', async () => {
    const onChange = vi.fn()
    render(<QuantityInput value={2} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: /decrease/i }))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('never goes below 1', async () => {
    const onChange = vi.fn()
    render(<QuantityInput value={1} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: /decrease/i }))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('reports typed input', async () => {
    const onChange = vi.fn()
    render(<QuantityInput value="" onChange={onChange} />)
    await userEvent.type(screen.getByRole('spinbutton'), '5')
    expect(onChange).toHaveBeenCalledWith('5')
  })
})
