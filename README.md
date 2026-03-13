# Laptop Showroom

A modern frontend-only laptop showroom web app built with **React**, **Vite**, **Tailwind CSS**, and **React Router**.

## Features

- Browse laptops with filtering by category, price, and search.
- View detailed product pages with full specs.
- Shopping cart persisted in **LocalStorage**.
- Responsive mobile-first UI with modern design patterns.

## Project Structure

```
/src
  /components
    CartItem.jsx
    Navbar.jsx
    ProductCard.jsx
  /data
    laptops.js
  /pages
    Cart.jsx
    Contact.jsx
    Home.jsx
    ProductDetails.jsx
    Products.jsx
  /state
    cartContext.jsx
  App.jsx
  main.jsx
  index.css

tailwind.config.js
vite.config.js
package.json
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the app in your browser (by default at http://localhost:5173).

## Notes

- This is a frontend demo; checkout and contact actions are simulated and display a demo message.
- Cart data is stored in localStorage, so it persists between page refreshes.
