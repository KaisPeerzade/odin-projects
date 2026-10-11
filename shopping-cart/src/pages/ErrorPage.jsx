import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className="status">
      <h1>Oops! Page not found</h1>
      <Link to="/" className="cta">Back to Home</Link>
    </div>
  )
}
