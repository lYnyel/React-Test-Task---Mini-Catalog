import { useMemo, useState } from "react";

export const useProductFilters = (products) => {
  const [search, setSearch] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const getMinPrice = (product) => {
    return Math.min(...product.colors.map((c) => parseFloat(c.price)));
  };

  const checkInStock = (product) => {
    return product.colors.some((color) => color.sizes.length > 0);
  };

  //логика фильтрации
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => !onlyInStock || checkInStock(p))
      .sort((a, b) => {
        const priceA = getMinPrice(a);
        const priceB = getMinPrice(b);
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      });
  }, [products, search, onlyInStock, sortOrder]);

  return {
    search,
    setSearch,
    onlyInStock,
    setOnlyInStock,
    sortOrder,
    setSortOrder,
    filteredProducts,
    getMinPrice,
  };
};
