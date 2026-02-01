// src/components/Products/ProductSelectModal.jsx
import { useEffect, useState } from "react";
import { ProductsService } from "../../services/products"; // match export name exactly
import debounce from "lodash.debounce";

export default function ProductSelectModal({ open, onClose, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // fetch products
  const fetchProducts = async (q = "") => {
    setLoading(true);
    try {
      const res = await ProductsAPI.list({ search: q }); // fixed here
      const list = Array.isArray(res.data) ? res.data : res.data.items ?? [];
      setProducts(list);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // fetch on modal open
  useEffect(() => {
    if (open) fetchProducts();
  }, [open]);

  // debounced search
  const debouncedSearch = debounce((val) => fetchProducts(val), 300);

  useEffect(() => {
    if (!open) return;
    if (search.trim() === "") {
      fetchProducts("");
    } else {
      debouncedSearch(search);
    }
    return () => debouncedSearch.cancel();
  }, [search, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white w-full max-w-3xl rounded-md shadow-lg p-4 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium">Add Product</h3>
          <button onClick={onClose} className="text-gray-600">✕</button>
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name or SKU..."
          className="w-full border px-3 py-2 rounded mb-3"
        />

        {/* Product List */}
        <div className="max-h-80 overflow-y-auto space-y-2">
          {loading ? (
            <div className="text-center py-6 text-gray-500">Loading…</div>
          ) : products.length === 0 ? (
            <div className="text-center py-6 text-gray-500">No products found</div>
          ) : (
            products.map((p) => (
              <div
                key={p._id ?? p.id}
                onClick={() => {
                  onSelect(p);
                  onClose();
                }}
                className="flex items-center justify-between gap-4 p-3 border rounded hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.imageUrl ?? p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded object-cover border"
                  />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{p.name}</div>
                    <div className="text-xs text-gray-500 truncate">SKU: {p.sku}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${p.price ?? p.unitPrice ?? 0}</div>
                  <div className={`text-xs ${p.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    Stock: {p.stock ?? 0}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
