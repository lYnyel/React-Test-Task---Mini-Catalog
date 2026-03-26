import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // состояние промокод
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, color, size) => {
    setCartItems((prev) => {
      const cartId = `${product.id}-${color.id}-${size.id}`;
      const existingItem = prev.find((item) => item.cartId === cartId);

      if (existingItem) {
        return prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          cartId,
          productId: product.id,
          name: product.name,
          color: color,
          size: size,
          price: parseFloat(color.price),
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      }),
    );
  };

  const applyPromo = (code) => {
    const validPromos = {
      HELLO: { code: "HELLO", type: "percent", value: 10 },
      FIX50: { code: "FIX50", type: "fixed", value: 50 },
    };

    const found = validPromos[code.toUpperCase()];
    if (found) {
      setPromo(found);
      return true;
    }
    return false;
  };

  //Расчеты
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discountAmount = promo
    ? promo.type === "percent"
      ? (subtotalPrice * promo.value) / 100
      : promo.value
    : 0;

  const totalPrice = Math.max(0, subtotalPrice - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyPromo,
        promo,
        totalCount,
        subtotalPrice,
        discountAmount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
