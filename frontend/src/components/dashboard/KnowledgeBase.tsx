const products = [
  { id: 1, name: "Running Pro Shoes", price: "Rp 349,000", stock: 45, category: "Footwear", tags: "shoes, running, sport" },
  { id: 2, name: "Premium Backpack", price: "Rp 249,000", stock: 120, category: "Bags", tags: "bag, backpack, laptop" },
  { id: 3, name: "Plain Cotton T-Shirt", price: "Rp 89,000", stock: 300, category: "Apparel", tags: "t-shirt, cotton, plain" },
];

const faqs = [
  { q: "How long is the delivery?", a: "2-3 days Jabodetabek, 3-7 days other cities" },
  { q: "Can I return items?", a: "Yes, within 7 days as long as the item is still intact" },
  { q: "Is there a warranty?", a: "Yes, 30-day warranty for manufacturing defects" },
];

export default function KnowledgeBase() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📚 Knowledge Base</h1>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">+ Add Product</button>
          <button className="btn-secondary text-sm">+ Add FAQ</button>
          <button className="btn-primary text-sm">🤖 Auto-generate</button>
        </div>
      </div>

      {/* Products */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">📦 Products ({products.length})</h2>
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-2xl">👟</div>
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-400">Stock: {p.stock} | {p.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-brand-400">{p.price}</div>
                <div className="text-xs text-gray-500">{p.tags}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">❓ FAQ ({faqs.length})</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="p-4 bg-gray-800 rounded-xl">
              <div className="font-medium text-sm mb-1">Q: {f.q}</div>
              <div className="text-sm text-gray-400">A: {f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
