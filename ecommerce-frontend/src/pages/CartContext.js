import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => { 
    // Asegúrate de que `quantity` sea un número.
    const parsedQuantity = typeof quantity === 'number' ? quantity : 0;

    console.log('Cantidad recibida:', parsedQuantity, 'Tipo:', typeof parsedQuantity);
    console.log('Producto recibido:', product);

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
        // Si el producto ya existe en el carrito, actualiza la cantidad.
        setCart(
            cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + parsedQuantity }
                    : item
            )
        );
    } else {
        // Si el producto no existe en el carrito, agrégalo con la cantidad inicial.
        setCart([...cart, { ...product, quantity: parsedQuantity +1 }]);
    }
};
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};