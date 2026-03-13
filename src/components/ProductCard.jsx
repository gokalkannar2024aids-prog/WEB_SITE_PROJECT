import { Link } from "react-router-dom";
import { useCart } from "../state/cartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/laptops/${product.id}`} className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent px-4 py-3">
          <p className="text-sm font-semibold text-white">{product.brand}</p>
          <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2">
            {product.name}
          </h3>
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between space-y-3 p-5">
        <div className="space-y-2">
          <p className="text-sm text-slate-500">{product.category} laptop</p>
          <ul className="flex flex-wrap gap-2 text-xs text-slate-600">
            <li className="rounded-full bg-slate-100 px-2 py-1">{product.ram}</li>
            <li className="rounded-full bg-slate-100 px-2 py-1">{product.storage}</li>
            <li className="rounded-full bg-slate-100 px-2 py-1">{product.processor}</li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-slate-900">${product.price.toLocaleString()}</p>
            <p className="text-xs text-slate-500">Free delivery</p>
          </div>
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
