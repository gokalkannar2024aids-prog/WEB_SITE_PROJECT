import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "laptop-showroom-cart";

function loadCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    // ignore
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, { ...action.payload }];
    }
    case "update": {
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    }
    case "remove":
      return state.filter((item) => item.id !== action.payload.id);
    case "clear":
      return [];
    case "set":
      return action.payload;
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      totalItems,
      totalPrice,
      addToCart: (product, quantity = 1) =>
        dispatch({ type: "add", payload: { ...product, quantity } }),
      removeFromCart: (id) => dispatch({ type: "remove", payload: { id } }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: "update", payload: { id, quantity } }),
      clearCart: () => dispatch({ type: "clear" }),
    }),
    [cart, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
