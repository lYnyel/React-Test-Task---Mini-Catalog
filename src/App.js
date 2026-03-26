import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";

import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

const Header = () => {
  const { totalCount, totalPrice } = useCart();
  return (
    <nav
      style={{
        padding: "20px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textDecoration: "none",
          color: "#000",
        }}
      >
        Store
      </Link>
      <Link to="/cart" style={{ textDecoration: "none", color: "#000" }}>
        🛒 Корзина: <strong>{totalCount} шт.</strong> ({totalPrice.toFixed(2)}{" "}
        руб.)
      </Link>
    </nav>
  );
};

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <div
          className="container"
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
        >
          <Routes>
            <Route path="/" element={<ProductsPage />} />

            <Route path="/product/:id" element={<ProductDetailsPage />} />

            <Route path="/cart" element={<CartPage />} />

            <Route path="*" element={<h2>Страница не найдена</h2>} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
