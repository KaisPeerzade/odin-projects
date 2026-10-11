import { useEffect, useState } from 'react'

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        const data = await res.json()
        if (!ignore) setProducts(data)
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [])

  return { products, loading, error }
}
