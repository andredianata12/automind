import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <div className="text-8xl mb-4">🤖</div>
        <h1 className="text-6xl font-bold text-brand-400 mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    </div>
  );
}
