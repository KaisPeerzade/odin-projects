const toInt = (v) => parseInt(v, 10) || 0

// Reusable: used on Shop cards and in the Cart.
// onChange receives the new value (string while typing, number from buttons).
export default function QuantityInput({ value, onChange, label = 'Quantity' }) {
  return (
    <div className="quantity">
      <button
        type="button"
        aria-label="decrease quantity"
        onClick={() => onChange(Math.max(1, toInt(value) - 1))}
      >
        −
      </button>
      <input
        type="number"
        min="1"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        aria-label="increase quantity"
        onClick={() => onChange(toInt(value) + 1)}
      >
        +
      </button>
    </div>
  )
}
