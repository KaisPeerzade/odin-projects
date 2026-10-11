import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="hero">
      <h1>Welcome to MiniStore</h1>
      <p>Discover great deals on clothing, jewelry and electronics.</p>
      <Link to="/shop" className="cta">
        Start Shopping
      </Link>
    </section>
  )
}
