import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", username: "", password: "", fullName: "", businessName: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement register
    console.log("Register:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-400">🤖 AutoMind</h1>
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input type="email" className="input w-full" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input className="input w-full" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input type="password" className="input w-full" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
            <input className="input w-full" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Business Name</label>
            <input className="input w-full" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
          </div>
          <button type="submit" className="btn-primary w-full">Create Account</button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-brand-400 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
