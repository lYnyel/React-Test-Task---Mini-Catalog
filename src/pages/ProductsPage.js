import React, { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useProductFilters } from "../hooks/useProductFilters"; // Импортируем хук

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  //кастом хук
  const {
    search,
    setSearch,
    onlyInStock,
    setOnlyInStock,
    sortOrder,
    setSortOrder,
    filteredProducts,
    getMinPrice,
  } = useProductFilters(products);

  if (isLoading) return <div>Загрузка товаров...</div>;

  return (
    <div className="products-page">
      <section
        className="filters"
        style={{ marginBottom: "20px", display: "flex", gap: "15px" }}
      >
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
          />
          В наличии
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Дешевле</option>
          <option value="desc">Дороже</option>
        </select>
      </section>

      <div
        className="products-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            minPrice={getMinPrice(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
