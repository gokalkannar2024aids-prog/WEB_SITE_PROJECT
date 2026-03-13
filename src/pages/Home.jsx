import { Link } from "react-router-dom";
import { laptops } from "../data/laptops";
import ProductCard from "../components/ProductCard";

const categories = [
  { key: "Gaming", label: "Gaming" },
  { key: "Student", label: "Student" },
  { key: "Business", label: "Business" },
  { key: "Budget", label: "Budget" },
];

export default function Home() {
  const featured = laptops.slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="bg-brand-600">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                New arrivals &amp; special offers
              </p>
              <h1 className="text-4xl font-semibold sm:text-5xl">
                Find your next laptop — fast.
              </h1>
              <p className="max-w-xl text-base text-white/80">
                Browse the latest laptops from top brands with curated recommendations for work, play, and study.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/laptops"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm shadow-brand-500/20 transition hover:bg-white/90"
                >
                  Browse all laptops
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Contact sales
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-emerald-400/40 via-brand-400/20 to-indigo-500/20 blur-xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80"
                  alt="Laptop showcase"
                  className="h-72 w-full object-cover shadow-xl shadow-slate-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Featured laptops</h2>
            <p className="mt-2 text-sm text-slate-600">
              Hand-picked laptops for every workflow. Tap into product details and add to your cart quickly.
            </p>
          </div>
          <Link
            to="/laptops"
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Explore all laptops
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-slate-900">Shop by category</h2>
          <p className="mt-2 text-sm text-slate-600">Quick links to browse laptop categories and find the right fit.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                to={`/laptops?category=${encodeURIComponent(cat.key)}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{cat.label}</h3>
                    <p className="mt-1 text-sm text-slate-500">Browse {cat.label.toLowerCase()} laptops</p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    {cat.label.charAt(0)}
                  </span>
                </div>
                <div className="mt-4 h-24 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
