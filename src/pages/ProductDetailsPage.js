import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct, getSizes } from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [allSizes, setAllSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    Promise.all([getProduct(id), getSizes()])
      .then(([productData, sizesData]) => {
        setProduct(productData);
        setAllSizes(sizesData);
        setSelectedColor(productData.colors[0]);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error || !product)
    return (
      <div>
        <h2>Товар не найден</h2>
        <Link to="/">Назад в каталог</Link>
      </div>
    );

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setCurrentImgIndex(0);
    if (selectedSizeId && !color.sizes.includes(selectedSizeId)) {
      setSelectedSizeId(null);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSizeId) {
      alert("Пожалуйста, выберите размер");
      return;
    }
    const size = allSizes.find((s) => s.id === selectedSizeId);
    addToCart(product, selectedColor, size);
  };

  return (
    <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
      {/* Слайдер*/}
      <div style={{ flex: 1 }}>
        <div style={{ position: "relative", textAlign: "center" }}>
          <img
            src={selectedColor.images[currentImgIndex]}
            alt={product.name}
            style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
          />
          {selectedColor.images.length > 1 && (
            <div style={{ marginTop: "10px" }}>
              {selectedColor.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  style={{
                    fontWeight: currentImgIndex === idx ? "bold" : "normal",
                    margin: "0 5px",
                  }}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Инфо и выбор*/}
      <div style={{ flex: 1 }}>
        <h1>{product.name}</h1>
        <p style={{ fontSize: "20px", color: "#666" }}>
          {selectedColor.price} руб.
        </p>
        <p>{selectedColor.description}</p>

        {/*Выбор цвета*/}
        <div style={{ marginBottom: "20px" }}>
          <h4>Цвет: {selectedColor.name}</h4>
          <div style={{ display: "flex", gap: "10px" }}>
            {product.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorChange(color)}
                style={{
                  padding: "10px",
                  border:
                    selectedColor.id === color.id
                      ? "2px solid black"
                      : "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>

        {/*Выбор размера*/}
        <div style={{ marginBottom: "20px" }}>
          <h4>Размер:</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {allSizes.map((size) => {
              const isAvailable = selectedColor.sizes.includes(size.id);
              return (
                <button
                  key={size.id}
                  disabled={!isAvailable}
                  onClick={() => setSelectedSizeId(size.id)}
                  style={{
                    padding: "10px 15px",
                    backgroundColor:
                      selectedSizeId === size.id ? "#000" : "#fff",
                    color: selectedSizeId === size.id ? "#fff" : "#000",
                    opacity: isAvailable ? 1 : 0.3,
                    cursor: isAvailable ? "pointer" : "not-allowed",
                    border: "1px solid #000",
                  }}
                >
                  {size.name}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          style={{
            padding: "15px 30px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
