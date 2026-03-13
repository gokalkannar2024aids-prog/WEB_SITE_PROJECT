import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "../state/cartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleChange = (delta) => {
    const next = item.quantity + delta;
    if (next <= 0) {
      removeFromCart(item.id);
      return;
    }
    updateQuantity(item.id, next);
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <img
        src={item.image}
        alt={item.name}
        className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-28"
      />

      <div className="flex flex-1 flex-col justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
          <p className="text-sm text-slate-500">{item.brand}</p>
          <p className="mt-2 text-sm text-slate-600">{item.ram} • {item.storage} • {item.processor}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
            <button
              type="button"
              onClick={() => handleChange(-1)}
              className="rounded-full p-1 text-slate-600 hover:bg-slate-200"
              aria-label="Decrease quantity"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="min-w-[2rem] text-center text-sm font-semibold">{item.quantity}</span>
            <button
              type="button"
              onClick={() => handleChange(1)}
              className="rounded-full p-1 text-slate-600 hover:bg-slate-200"
              aria-label="Increase quantity"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <p className="text-lg font-semibold text-slate-900">
              ${(item.price * item.quantity).toLocaleString()}
            </p>
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <TrashIcon className="h-4 w-4" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
