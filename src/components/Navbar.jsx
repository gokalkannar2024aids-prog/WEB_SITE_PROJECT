import { Link, NavLink } from "react-router-dom";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useCart } from "../state/cartContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Laptops", to: "/laptops" },
  { label: "Cart", to: "/cart" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-brand-600 text-white font-bold">
              LS
            </span>
            <div className="hidden sm:block">
              <p className="text-lg font-semibold">Laptop Showroom</p>
              <p className="text-xs text-slate-500">Modern laptops, modern shopping</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.slice(0, 3).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-brand-600" : "text-slate-600 hover:text-slate-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Cart</span>
              {totalItems > 0 ? (
                <span className="absolute -right-2 -top-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-brand-600 text-xs text-white">
                  {totalItems}
                </span>
              ) : null}
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/cart"
              className="relative inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-brand-600 text-xs text-white">
                  {totalItems}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setShowMenu((prev) => !prev)}
              aria-label="Menu"
            >
              {showMenu ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {showMenu ? (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm rounded-lg px-3 py-2 font-medium ${
                    isActive ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"
                  }`
                }
                onClick={() => setShowMenu(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
