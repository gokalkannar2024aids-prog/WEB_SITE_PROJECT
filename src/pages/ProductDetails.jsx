import { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { laptops } from "../data/laptops";
import { useCart } from "../state/cartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => laptops.find((item) => item.id === id), [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Product not found</h1>
        <p className="mt-4 text-sm text-slate-600">The laptop you are looking for does not exist.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="lg:w-6/12">
          <img
            src={product.image}
            alt={product.name}
            className="h-[420px] w-full rounded-3xl object-cover shadow-xl"
          />
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">{product.category}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{product.brand}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{product.ram}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{product.storage}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{product.processor}</span>
          </div>
        </div>

        <div className="lg:w-6/12">
          <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
              <p className="mt-2 text-sm text-slate-600">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-slate-900">Price</p>
                <p className="text-2xl font-semibold text-brand-600">
                  ${product.price.toLocaleString()}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Processor</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">{product.processor}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Memory</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">{product.ram}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Storage</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">{product.storage}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">{product.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="rounded-full bg-white p-1 text-slate-600 shadow-sm hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="rounded-full bg-white p-1 text-slate-600 shadow-sm hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                >
                  Add to cart
                </button>
              </div>

              <p className="text-xs text-slate-500">
                This is a demo shopping experience. No payment required.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">You might also like</h2>
          <Link
            to="/laptops"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Browse all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {laptops
            .filter((item) => item.id !== product.id)
            .slice(0, 3)
            .map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <Link to={`/laptops/${item.id}`} className="block">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full rounded-2xl object-cover"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.brand}</p>
                    <p className="mt-2 font-semibold text-brand-600">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
