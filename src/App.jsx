import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import { CartProvider } from "./state/cartContext";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/laptops" element={<Products />} />
            <Route path="/laptops/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="bg-slate-900 text-slate-200 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Laptop Showroom. Built with React + Tailwind.
            </p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
