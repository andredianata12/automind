const products = [
  { id: 1, name: "Sepatu Running Pro", price: "Rp 349.000", stock: 45, category: "Footwear", tags: "sepatu, running, sport" },
  { id: 2, name: "Tas Ransel Premium", price: "Rp 249.000", stock: 120, category: "Bags", tags: "tas, ransel, laptop" },
  { id: 3, name: "Kaos Polos Cotton", price: "Rp 89.000", stock: 300, category: "Apparel", tags: "kaos, cotton, polos" },
];

const faqs = [
  { q: "Berapa lama pengiriman?", a: "2-3 hari Jabodetabek, 3-7 hari luar kota" },
  { q: "Bisa return?", a: "Bisa dalam 7 hari dengan syarat barang masih utuh" },
  { q: "Ada garansi?", a: "Ya, garansi 30 hari untuk cacat produksi" },
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
