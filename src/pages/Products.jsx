import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { laptops } from "../data/laptops";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Gaming", "Student", "Business", "Budget"];

function getQueryParam(params, key, defaultValue = "") {
  return params.get(key) || defaultValue;
}

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const initialCategory = getQueryParam(searchParams, "category", "All");
  const initialSearch = getQueryParam(searchParams, "search", "");
  const initialPriceMax = parseInt(getQueryParam(searchParams, "maxPrice", "0"), 10) || 0;

  const [category, setCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState(initialPriceMax);

  const results = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const max = maxPrice > 0 ? maxPrice : Infinity;

    return laptops.filter((laptop) => {
      const matchesCategory = category === "All" || laptop.category === category;
      const matchesSearch =
        !term ||
        laptop.name.toLowerCase().includes(term) ||
        laptop.brand.toLowerCase().includes(term) ||
        laptop.processor.toLowerCase().includes(term);
      const matchesPrice = laptop.price <= max;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [category, searchTerm, maxPrice]);

  const updateQuery = (updates) => {
    const next = new URLSearchParams(location.search);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });
    navigate({ pathname: location.pathname, search: next.toString() }, { replace: true });
  };

  const handleReset = () => {
    setCategory("All");
    setSearchTerm("");
    setMaxPrice(0);
    navigate({ pathname: location.pathname }, { replace: true });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900">All Laptops</h1>
        <p className="mt-2 text-sm text-slate-600">
          Browse available laptops, filter by category, price range, or search by name.
        </p>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row">
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:w-72">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Search</h2>
            <input
              value={searchTerm}
              onChange={(event) => {
                const next = event.target.value;
                setSearchTerm(next);
                updateQuery({ search: next });
              }}
              placeholder="Search by name, brand, or processor"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Category</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((option) => {
                const active = option === category;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setCategory(option);
                      updateQuery({ category: option === "All" ? null : option });
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-brand-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Max price</h2>
              <span className="text-sm font-medium text-slate-600">
                {maxPrice > 0 ? `$${maxPrice.toLocaleString()}` : "Any"}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2500"
              step="50"
              value={maxPrice}
              onChange={(event) => {
                const next = Number(event.target.value);
                setMaxPrice(next);
                updateQuery({ maxPrice: next > 0 ? next : null });
              }}
              className="mt-3 w-full accent-brand-600"
            />
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Reset filters
          </button>
        </section>

        <section className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{results.length}</span> laptops
            </p>
            <p className="text-sm text-slate-500">Tip: adjust filters to refine results.</p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.length > 0 ? (
              results.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-lg font-semibold text-slate-900">No results</p>
                <p className="mt-2 text-sm text-slate-600">
                  Try changing your filters or search term to find more laptops.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
