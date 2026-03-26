import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    applyPromo,
    promo,
    subtotalPrice,
    discountAmount,
    totalPrice,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Корзина пуста</h2>
        <Link to="/">Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>Товар</th>
            <th>Параметры</th>
            <th>Цена</th>
            <th>Кол-во</th>
            <th>Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.cartId} style={{ borderBottom: "1px solid #eee" }}>
              <td
                style={{
                  padding: "15px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <img
                  src={item.color.images[0]}
                  alt={item.name}
                  style={{ width: "50px" }}
                />
                <strong>{item.name}</strong>
              </td>
              <td>
                {item.color.name}, {item.size.name}
              </td>
              <td>{item.price.toFixed(2)} ₽</td>
              <td>
                <button onClick={() => updateQuantity(item.cartId, -1)}>
                  -
                </button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.cartId, 1)}>
                  +
                </button>
              </td>
              <td>{(item.price * item.quantity).toFixed(2)} ₽</td>
              <td>
                <button
                  onClick={() => removeFromCart(item.cartId)}
                  style={{ color: "red" }}
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* промокод*/}
        <div
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h4>Промокод</h4>
          <input
            type="text"
            placeholder="Введите HELLO или FIX50"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            style={{ padding: "8px" }}
          />
          <button
            onClick={() => {
              if (!applyPromo(promoInput)) alert("Промокод не найден");
            }}
            style={{ marginLeft: "10px", padding: "8px" }}
          >
            Применить
          </button>
          {promo && (
            <p style={{ color: "green", margin: "10px 0 0" }}>
              Применен купон: {promo.code}
            </p>
          )}
        </div>

        <div style={{ textAlign: "right" }}>
          <p>Сумма: {subtotalPrice.toFixed(2)} ₽</p>
          {discountAmount > 0 && (
            <p style={{ color: "red" }}>
              Скидка: -{discountAmount.toFixed(2)} ₽
            </p>
          )}
          <h2 style={{ borderTop: "1px solid #eee", paddingTop: "10px" }}>
            Итого: {totalPrice.toFixed(2)} ₽
          </h2>
          <button
            style={{
              padding: "15px 40px",
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
