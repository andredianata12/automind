import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Integrations", href: "#platforms" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand-400">🤖 AutoMind</Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-gray-400 hover:text-white transition-colors">{l.label}</a>
          ))}
          <Link to="/login" className="btn-secondary text-sm py-2 px-4">Sign In</Link>
          <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
        </div>
        <button className="md:hidden text-gray-400" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 p-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block text-gray-300 hover:text-white py-2">{l.label}</a>
          ))}
          <Link to="/login" className="block text-brand-400 py-2">Sign In</Link>
          <Link to="/register" className="block btn-primary text-center text-sm">Get Started</Link>
        </div>
      )}
    </nav>
  );
}
