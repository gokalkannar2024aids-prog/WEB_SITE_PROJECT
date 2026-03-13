import { Link } from "react-router-dom";
import { useCart } from "../state/cartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart, totalPrice, clearCart } = useCart();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Shopping cart</h1>
        <p className="mt-2 text-sm text-slate-600">
          Review your items, adjust quantities, and proceed to checkout.
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-slate-900">Your cart is empty</p>
          <p className="mt-2 text-sm text-slate-600">
            Browse our selection of laptops and add items to your cart.
          </p>
          <Link
            to="/laptops"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Subtotal</span>
                <span className="text-sm font-semibold text-slate-900">${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Shipping</span>
                <span className="text-sm font-semibold text-slate-900">Free</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-base font-semibold text-slate-900">Total</span>
                <span className="text-base font-semibold text-brand-600">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Checkout demo: this is a frontend-only demo.\nThank you for trying it out!")}
              className="mt-6 w-full rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Checkout
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
