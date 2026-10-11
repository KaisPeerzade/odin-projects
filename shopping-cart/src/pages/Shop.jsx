import useProducts from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const { products, loading, error } = useProducts()

  if (loading) return <p className="status">Loading products...</p>
  if (error) return <p className="status error">Something went wrong: {error}</p>

  return (
    <section>
      <h1>Shop</h1>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
